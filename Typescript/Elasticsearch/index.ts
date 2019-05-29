import elasticsearch from 'elasticsearch'
import config from '../Config/elasticsearch.json'
import { startPing } from './ping.js';


const client = new elasticsearch.Client(config.client);
startPing(client);

export function insertLog(body:any,id?:string){
    return client.index({  
        index: config.log.index,
        type: config.log.type,
        id,
        body: body
    });
}

export function search(index = config.log.index,body = {size: 10,from: 0,query: {match_all: {}}}){
    return client.search({index,body},(error,response) =>console.log(response.hits.hits));
}
