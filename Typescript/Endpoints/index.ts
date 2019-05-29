
import {Express} from 'express'
import { getInfo } from './info/GET';
import { getWebsites } from './website/GET';
import { CacheApiCall } from '../CacheApiCall';
import { getSearch, mockGetSearch } from './search/GET';

export function createHandlers(app:Express,globalCache:CacheApiCall){
    app.get('/info',    async (req, res, next) => await(new getInfo(req, res, next,new CacheApiCall(),globalCache,"get","info")).execute());
    app.get('/website', async (req, res, next) => await(new getWebsites(req, res, next,new CacheApiCall(),globalCache,"get","website")).execute());
    app.get('/search',  async (req, res, next) => await(new mockGetSearch(req, res, next,new CacheApiCall(),globalCache,"get","search")).execute({address:"suite"}));
}