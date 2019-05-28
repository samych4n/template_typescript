import { Request,Response,NextFunction } from "express";
import { ResponseParameters } from "../../Express/_interfaces/ResponseParameters";
import { CacheApiCall } from "../../CacheApiCall";
import { sendResponse } from "../../Express/sendResponse";

export interface Endpoint{
    execute():void;
}

export abstract class DefaultEndpoint implements Endpoint {
    private response:ResponseParameters = {code:400,body:{}}
    protected body:any;
    protected params:any;
    protected query:any;
    constructor(private req:Request,private res:Response,private next:NextFunction,protected localCache:CacheApiCall,protected globalCache:CacheApiCall){
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