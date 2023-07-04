import 'reflect-metadata';

import express , {Express, Request, Response, Router} from "express";
import RouteGroup from 'express-route-grouping';
const cors = require("cors");

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authenticateJwt from '../../src/middleware/authenticateJwt';
import { requestData } from '../../src/types/requestData';

require("dotenv").config();

const app: Express = express();
const root = new RouteGroup('/', Router());

app.post("/authorized", authenticateJwt as any, (request: any, response: any) => {
    return response.send(200);
});

app.use(cors())
app.use(cookieParser());
const port = 5892;

app.use(bodyParser.json());
app.use('/', root.export());

if(!module.parent) {
    app.listen(port)
}

export default app;