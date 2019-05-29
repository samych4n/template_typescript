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
class getSearch extends endpoint_1.LogEndpoint {
    validacaoDeDadosDeEntrada(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    executeEndpoint(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield JsonPlaceholder_1.Jsonplaceholder.getCachedUsers(this.localCache);
            users = users.filter((user) => this.findWordsInObject(user, this.query));
            return users;
        });
    }
    findWordsInObject(user, searchWords) {
        for (let searchFields in searchWords) {
            if (!searchWords[searchFields])
                continue;
            if (!user[searchFields])
                return false;
            if (typeof searchWords[searchFields] === "object") {
                this.findWordsInObject(user[searchFields], searchWords[searchFields]);
            }
            else {
                console.log(user[searchFields]);
                if (!this.findWordInObject(user[searchFields], searchWords[searchFields]))
                    return false;
            }
        }
        return true;
    }
    findWordInObject(field, word) {
        if (!field)
            return false;
        if (typeof field === "object") {
            for (let key of Object.keys(field))
                if (this.findWordInObject(field[key], word))
                    return true;
        }
        else {
            if (String(field).toLowerCase().includes(word))
                return true;
        }
        return false;
    }
}
exports.getSearch = getSearch;
class mockGetSearch extends getSearch {
    executeEndpoint(searchWords) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield JsonPlaceholder_1.Jsonplaceholder.getCachedUsers(this.localCache);
            users = users.filter((user) => this.findWordsInObject(user, searchWords));
            return users;
        });
    }
}
exports.mockGetSearch = mockGetSearch;
