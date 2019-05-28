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
const sendResponse_1 = require("../../Express/sendResponse");
class DefaultEndpoint {
    constructor(req, res, next, localCache, globalCache) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.localCache = localCache;
        this.globalCache = globalCache;
        this.response = { code: 400, body: {} };
        this.body = req.body,
            this.params = req.params,
            this.query = req.query;
    }
    execute(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.validacaoDeDadosDeEntrada(...args);
            }
            catch (error) {
                console.log({ error });
                this.response = { code: 400, body: "Bad Request" };
                yield this.sendResponse();
                return;
            }
            try {
                let executeResponse = yield this.executeEndpoint(...args);
                this.response = { code: 200, body: executeResponse };
            }
            catch (error) {
                console.log({ error });
                this.response = { code: 500, body: "Internal Server Error" };
                yield this.sendResponse(...args);
                return;
            }
            yield this.sendResponse();
        });
    }
    ;
    sendResponse(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sendResponse_1.sendResponse(this.res, this.response.code, this.response.body);
        });
    }
    ;
}
exports.DefaultEndpoint = DefaultEndpoint;
