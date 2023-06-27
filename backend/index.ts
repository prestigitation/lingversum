import 'reflect-metadata';

import express , {Express, Router} from "express";
import authController from "./src/controllers/authController";
import RouteGroup from 'express-route-grouping';
import Container from 'typedi';

import bodyParser from "body-parser";

require("dotenv").config();

import i18next from "i18next";
import Backend from "i18next-node-fs-backend";
import i18nextMiddleware from 'i18next-express-middleware';

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'en',
        preload: ['en']
    });

const root = new RouteGroup('/', Router());

root.group('/api/v1', (router: Router) => {
    router.post("/login", Container.get(authController).login as any);
    router.post("/register", Container.get(authController).register as any);
});

const app: Express = express();

const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());

app.use('/', root.export());
app.use(i18nextMiddleware.handle(i18next));

if(!module.parent) {
    app.listen(port)
}

export default app;