
import elasticsearch from 'elasticsearch'
export function startPing(client:elasticsearch.Client){
    client.ping({ requestTimeout: 30000 }, function (error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        }
        else {
            console.log('Everything is ok');
        }
    });
}
