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
const JsonPlaceholder_1 = require("../../JsonPlaceholder");
const endpoint_1 = require("../_interfaces/endpoint");
class getWebsites extends endpoint_1.LogEndpoint {
    validacaoDeDadosDeEntrada(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    executeEndpoint(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield JsonPlaceholder_1.Jsonplaceholder.getCachedUsers(this.localCache);
            let websites = users.reduce((acc, val) => {
                if (val.website)
                    acc.push(val.website);
                return acc;
            }, new Array());
            return websites;
        });
    }
}
exports.getWebsites = getWebsites;
