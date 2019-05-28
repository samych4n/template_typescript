import fetch from 'node-fetch'
import endpoints from '../Config/endpoint.json'
import { User } from './_Interfaces/user.js';
import { CacheApiCall } from '../CacheApiCall/index.js';

export module Jsonplaceholder{   
    export const getUsers = async() => {
        console.log("getUser");
        let response = await fetch(endpoints.jsonplaceholder.url + "/users/");
        let json:User[] = await response.json();
        return json;
    }
    
    export const getCachedUsers = async(cache:CacheApiCall) => {        
        return cache.makeRequest(getUsers)
    }
}