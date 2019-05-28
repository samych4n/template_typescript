"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const endpoint_json_1 = __importDefault(require("../Config/endpoint.json"));
var Jsonplaceholder;
(function (Jsonplaceholder) {
    Jsonplaceholder.getUsers = () => __awaiter(this, void 0, void 0, function* () {
        console.log("getUser");
        let response = yield node_fetch_1.default(endpoint_json_1.default.jsonplaceholder.url + "/users/");
        let json = yield response.json();
        return json;
    });
    Jsonplaceholder.getCachedUsers = (cache) => __awaiter(this, void 0, void 0, function* () {
        return cache.makeRequest(Jsonplaceholder.getUsers);
    });
})(Jsonplaceholder = exports.Jsonplaceholder || (exports.Jsonplaceholder = {}));
