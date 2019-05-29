"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function startPing(client) {
    client.ping({ requestTimeout: 30000 }, function (error) {
        if (error) {
            console.error('elasticsearch cluster is down!');
        }
        else {
            console.log('Everything is ok');
        }
    });
}
exports.startPing = startPing;
