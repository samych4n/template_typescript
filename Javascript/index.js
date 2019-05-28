"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
require("moment-timezone");
const bodyParser = require("body-parser");
const express_json_1 = require("./Config/express.json");
const index_js_1 = require("./Endpoints/index.js");
const index_js_2 = require("./CacheApiCall/index.js");
const app = express_1.default();
app.use(bodyParser.json({ limit: '50mb' }));
const globalCache = new index_js_2.ExpireCacheApiCall(60000);
const now = moment_1.default().tz("UTC").format('YYYY-MM-DD HH:mm:ss');
index_js_1.createHandlers(app, globalCache);
app.listen(express_json_1.PORT, () => console.log('Programa de teste iniciado as ' + now + ' - escutando porta ' + express_json_1.PORT + ' !'));
