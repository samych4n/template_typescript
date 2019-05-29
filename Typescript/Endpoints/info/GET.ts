import { Jsonplaceholder } from "../../JsonPlaceholder";
import { info } from "../_interfaces/info";
import { LogEndpoint } from "../_interfaces/endpoint";



export class getInfo extends LogEndpoint{
    protected async validacaoDeDadosDeEntrada(...args:any): Promise<void> {
        return;
    }    
    protected async executeEndpoint(...args:any): Promise<any> {
        let users = await Jsonplaceholder.getCachedUsers(this.localCache);
        let infos:info[] = users.map((user)=> ({nome:user.name,email:user.email,empresa:user.company.name}))
                                .sort( (a,b) => (a.nome.toLowerCase() > b.nome.toLowerCase()) ? 1 : -1 );
        return infos;    
    }
}