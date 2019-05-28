import express from 'express'
import moment from 'moment';
import 'moment-timezone';
import bodyParser = require('body-parser');

import {PORT} from './Config/express.json'
import { createHandlers } from './Endpoints/index.js';
import { ExpireCacheApiCall } from './CacheApiCall/index.js';

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
const globalCache = new ExpireCacheApiCall(60000);
const now = moment().tz("UTC").format('YYYY-MM-DD HH:mm:ss');

createHandlers(app,globalCache);

app.listen(PORT, () => console.log('Programa de teste iniciado as ' + now + ' - escutando porta ' + PORT + ' !'));