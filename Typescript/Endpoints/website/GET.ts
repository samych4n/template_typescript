import { Jsonplaceholder } from "../../JsonPlaceholder";
import { websites } from "../_interfaces/website";
import { LogEndpoint } from "../_interfaces/endpoint";



export class getWebsites extends LogEndpoint{
    protected async validacaoDeDadosDeEntrada(...args:any): Promise<void> {
        return;    
    }    
    protected async executeEndpoint(...args:any): Promise<any> {        
        let users = await Jsonplaceholder.getCachedUsers(this.localCache);
        let websites:websites = 
        users.reduce((acc,val) => { 
            if(val.website) acc.push(val.website);
                return acc;
        },new Array());
        return websites;
    }
}