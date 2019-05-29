"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = __importDefault(require("elasticsearch"));
const elasticsearch_json_1 = __importDefault(require("../Config/elasticsearch.json"));
const ping_js_1 = require("./ping.js");
const client = new elasticsearch_1.default.Client(elasticsearch_json_1.default.client);
ping_js_1.startPing(client);
function insertLog(body, id) {
    return client.index({
        index: elasticsearch_json_1.default.log.index,
        type: elasticsearch_json_1.default.log.type,
        id,
        body: body
    });
}
exports.insertLog = insertLog;
function search(index = elasticsearch_json_1.default.log.index, body = { size: 10, from: 0, query: { match_all: {} } }) {
    return client.search({ index, body }, (error, response) => console.log(response.hits.hits));
}
exports.search = search;
