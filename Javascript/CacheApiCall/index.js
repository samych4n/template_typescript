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
const symbolValor = Symbol('valor');
class CacheApiCall {
    constructor() {
        this.calls = new Map();
    }
    makeRequest(func, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let cachedValor = this.getCachedRequest(func, ...args);
            if (cachedValor.found)
                return cachedValor.valor;
            let result = yield func(...args);
            this.saveResult(result, func, ...args);
            return result;
        });
    }
    clearAllCache() {
        this.calls.clear();
    }
    clearCallCache(func) {
        this.calls.delete(func);
    }
    clearRequestCache(func, ...args) {
        if (!this.calls.has(func))
            return;
        let valors = this.calls.get(func);
        let valorPos = valors;
        for (let arg of args) {
            if (!valorPos[arg])
                return;
            valorPos = valorPos[arg];
        }
        delete valorPos[symbolValor];
    }
    getCachedRequest(func, ...args) {
        if (!this.calls.has(func)) {
            return { valor: undefined, found: false };
        }
        let call = this.calls.get(func);
        for (let arg of args) {
            if (call[arg])
                call = call[arg];
            else
                return { valor: undefined, found: false };
        }
        if (call.hasOwnProperty(symbolValor))
            return { valor: call[symbolValor], found: true };
        else
            return { valor: undefined, found: false };
    }
    saveResult(result, func, ...args) {
        if (!this.calls.has(func)) {
            this.calls.set(func, {});
        }
        let valors = this.calls.get(func);
        let valorPos = valors;
        for (let arg of args) {
            if (!valorPos[arg])
                valorPos[arg] = {};
            valorPos = valorPos[arg];
        }
        valorPos[symbolValor] = result;
    }
}
exports.CacheApiCall = CacheApiCall;
class ExpireCacheApiCall extends CacheApiCall {
    constructor(milisecondsToExpire) {
        super();
        this.milisecondsToExpire = milisecondsToExpire;
        this.autoExpire();
    }
    autoExpire() {
        setTimeout(() => {
            console.log("clear");
            this.clearAllCache();
            this.autoExpire();
        }, this.milisecondsToExpire);
    }
}
exports.ExpireCacheApiCall = ExpireCacheApiCall;
