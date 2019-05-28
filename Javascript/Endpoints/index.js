"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GET_1 = require("./info/GET");
const GET_2 = require("./website/GET");
const CacheApiCall_1 = require("../CacheApiCall");
const GET_3 = require("./search/GET");
function createHandlers(app, globalCache) {
    app.get('/info', (req, res, next) => __awaiter(this, void 0, void 0, function* () { return yield (new GET_1.getInfo(req, res, next, new CacheApiCall_1.CacheApiCall(), globalCache)).execute(); }));
    app.get('/website', (req, res, next) => __awaiter(this, void 0, void 0, function* () { return yield (new GET_2.getWebsites(req, res, next, new CacheApiCall_1.CacheApiCall(), globalCache)).execute(); }));
    app.get('/search', (req, res, next) => __awaiter(this, void 0, void 0, function* () { return yield (new GET_3.mockGetSearch(req, res, next, new CacheApiCall_1.CacheApiCall(), globalCache)).execute({ address: "suite" }); }));
}
exports.createHandlers = createHandlers;
