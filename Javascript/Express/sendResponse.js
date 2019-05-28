"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendResponse(res, code, body) {
    res.setHeader('Content-Type', 'application/json');
    res.status(code);
    res.send(body);
    return;
}
exports.sendResponse = sendResponse;
