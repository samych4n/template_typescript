import { cachedValor } from "./_interfaces";

const symbolValor = Symbol('valor')
export class CacheApiCall{
    private calls = new Map();
    public async makeRequest<T>(func:(...args:any[]) => T,...args:any[]):Promise<T>{
        let cachedValor = this.getCachedRequest(func,...args);
        if(cachedValor.found) return <T>cachedValor.valor;
        let result = await func(...args);
        this.saveResult(result,func,...args);
        return result;
    }

    public clearAllCache(){
        this.calls.clear();
    }

    public clearCallCache(func:(...args:any[]) => any){
        this.calls.delete(func);
    }
    
    public clearRequestCache<T>(func:(...args:any[]) => T,...args:any[]){
        if(!this.calls.has(func)) return;
        let valors = this.calls.get(func);
        let valorPos = valors;
        for(let arg of args){
            if(!valorPos[arg]) return
            valorPos = valorPos[arg];
        }
        delete valorPos[symbolValor];
    }

    private getCachedRequest<T>(func:(...args:any[]) => T,...args:any[]):cachedValor<T>{
        if(!this.calls.has(func)) {
            return {valor:undefined,found:false};
        }
        let call = this.calls.get(func);
        for(let arg of args){
            if(call[arg]) call = call[arg]
            else return {valor:undefined,found:false};
        }
        if(call.hasOwnProperty(symbolValor))
            return {valor:call[symbolValor],found:true};
        else return {valor:undefined,found:false}
    }

    private saveResult<T>(result:T,func:(...args:any[]) => T,...args:any[]){
        if(!this.calls.has(func)) {
            this.calls.set(func,{});
        }
        let valors = this.calls.get(func);
        let valorPos = valors;
        for(let arg of args){
            if(!valorPos[arg]) valorPos[arg] = {};
            valorPos = valorPos[arg];
        }
        valorPos[symbolValor] = result;
    }
}

export class ExpireCacheApiCall extends CacheApiCall{
    constructor(private milisecondsToExpire:number){
        super();
        this.autoExpire();
    }

    private autoExpire(){
        setTimeout(() => {
            console.log("clear")
            this.clearAllCache();
            this.autoExpire();
        }, this.milisecondsToExpire);
    }
}