import { Jsonplaceholder } from "../../JsonPlaceholder";
import { DefaultEndpoint } from "../_interfaces/endpoint";

interface searchWords{
    [index:string]:string|searchWords;
}

export class getSearch extends DefaultEndpoint{
    protected async validacaoDeDadosDeEntrada(...args:any): Promise<void> {
        return;
    }    
    protected async executeEndpoint(...args:any): Promise<any> {
        let users = await Jsonplaceholder.getCachedUsers(this.localCache);
        users = users.filter((user) => this.findWordsInObject(user,this.query))
        return users;
    }

    protected findWordsInObject(user:any,searchWords:searchWords){
        for(let searchFields in searchWords){
            if(!searchWords[searchFields]) continue;    
            if(!user[searchFields]) return false;
            if( typeof searchWords[searchFields] === "object"){
                this.findWordsInObject(user[searchFields],<searchWords>searchWords[searchFields]);
            }else{
                console.log(user[searchFields])
                if(!this.findWordInObject(user[searchFields],<string>searchWords[searchFields])) return false;    
            }
        }
        return true;
    }

    protected findWordInObject(field:any,word:string):boolean{
        if(!field) return false;
        if( typeof field === "object"){
            for(let key of Object.keys(field))
                if(this.findWordInObject(field[key],word)) return true;
        }else{
            if(String(field).toLowerCase().includes(word)) return true;
        }
        return false;
    }
}

export class mockGetSearch extends getSearch{
    protected async executeEndpoint(searchWords: searchWords): Promise<any> {
        let users = await Jsonplaceholder.getCachedUsers(this.localCache);
        users = users.filter((user) => this.findWordsInObject(user,searchWords))
        return users;
    }
}