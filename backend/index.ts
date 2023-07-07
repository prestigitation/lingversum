import 'reflect-metadata';

import express , {Express, Router} from "express";
import authController from "./src/controllers/authController";
import RouteGroup from 'express-route-grouping';
import Container from 'typedi';
const cors = require("cors");

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userController from './src/controllers/userController';

require("dotenv").config();

const app: Express = express();
const root = new RouteGroup('/', Router());

const AuthController = Container.get(authController);
const UserController = Container.get(userController);

root.group('api/v1', (api) => {
    api.post("login", AuthController.login.bind(AuthController) as any);
    api.post("register", AuthController.register.bind(AuthController) as any);

    api.group("users", (router: Router) => {
        router.get("profile", UserController.getProfile.bind(AuthController));
    });
});

app.use(cors())
app.use(cookieParser());
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use('/', root.export());

if(!module.parent) {
    app.listen(port)
}

export default app;