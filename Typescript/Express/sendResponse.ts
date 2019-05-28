import { Response } from "express";

export function sendResponse(res:Response,code:number,body:any)
{
    res.setHeader('Content-Type', 'application/json');
    res.status(code);
    res.send(body);
    return;
}