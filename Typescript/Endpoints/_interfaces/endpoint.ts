import { Request,Response,NextFunction } from "express";
import { ResponseParameters } from "../../Express/_interfaces/ResponseParameters";
import { CacheApiCall } from "../../CacheApiCall";
import { sendResponse } from "../../Express/sendResponse";
import { insertLog, search } from "../../Elasticsearch";
import moment from 'moment';
import 'moment-timezone';

export interface Endpoint{
    execute():void;
}

export abstract class DefaultEndpoint implements Endpoint {
    protected response:ResponseParameters = {code:400,body:{}}
    protected body:any;
    protected params:any;
    protected query:any;
    constructor(protected req:Request,protected res:Response,protected next:NextFunction,protected localCache:CacheApiCall,protected globalCache:CacheApiCall){
        this.body = req.body,
        this.params = req.params,
        this.query = req.query
    }

    
    public async execute(...args:any):Promise<void>{
        try{
            await this.validacaoDeDadosDeEntrada(...args);
        }catch(error){
            console.log({error});
            this.response = {code:400 ,body:"Bad Request"}
            await this.sendResponse();
            return;
        }
        try{
            let executeResponse = await this.executeEndpoint(...args);
            this.response = {code:200 ,body:executeResponse}
        }catch(error){
            console.log({error});
            this.response = {code:500 ,body:"Internal Server Error"}
            await this.sendResponse(...args);
            return;
        }
        await this.sendResponse();
    };
    
    
    protected async abstract validacaoDeDadosDeEntrada(...args:any):Promise<void>;
    protected async abstract executeEndpoint(...args:any):Promise<any>;
    protected async sendResponse(...args:any):Promise<void>{
        await sendResponse(this.res,this.response.code,this.response.body);
    };
}
export abstract class LogEndpoint extends DefaultEndpoint{
    logInsert:any = undefined;
    startTime:string = "";
    constructor(
        protected req:Request,
        protected res:Response,
        protected next:NextFunction,
        protected localCache:CacheApiCall,
        protected globalCache:CacheApiCall,
        protected method:string,
        protected endpointName:string){
        
        super(req,res,next,localCache,globalCache);
        let {body,params,query} = req;
        this.startTime = moment().tz("UTC").format('YYYY-MM-DD HH:mm:ss');
        this.Log({method,endpointName,body,params,query,startTime:this.startTime});
        
    }
    async Log(saveInfo:any){
        let logInsert = await this.logInsert;
        let logId = logInsert && typeof logInsert._id === "string"?logInsert._id:undefined;
        this.logInsert = await insertLog(saveInfo,logId);
        await search();
    }
    protected async sendResponse(...args:any):Promise<void>{
        let {body,params,query} = this.req;
        this.method,
        this.endpointName
        let endTime = moment().tz("UTC").format('YYYY-MM-DD HH:mm:ss');
        await this.Log({
            method:this.method,
            endpointName:this.endpointName,
            body,
            params,
            query,
            startTime:this.startTime,
            endTime,
            responseCode:this.response.code,
            response:this.response.body
        });
        await sendResponse(this.res,this.response.code,this.response.body);
    };
}
