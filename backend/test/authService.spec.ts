let server = require("./mocks/authTestServer");

import { test } from "mocha"
import express, { Request, Response } from "express";
import authenticateJwt from "../src/middleware/authenticateJwt";
import { randEmail, randNumber, randPassword, randUserName } from "@ngneat/falso";
import Container from "typedi";
import authRepository from "../src/repositories/authRepository";
import authService from "../src/services/authService";
import supertest from "supertest";
import { expect } from "chai";
import User from "../models/user.model";
import sequelizeConnectionAdapter from "../src/repositories/adapters/sequelizeConnectionAdapter";

const app = express();

app.post("/authorized", authenticateJwt as any, (request: any, response: any) => {
    return response.sendStatus(200);
})

app.listen(5982);


describe("AuthService", () => {
    before(() => {
        process.env.NODE_ENV = "test";
        process.env.TOKEN_SECRET="test";
    })
    beforeEach(() => {
        Container.get(sequelizeConnectionAdapter).connect()?.truncate();
    })
    describe("works correctly with token", () => {
        test("route should be protected by the auth token", (done) => {
            supertest(app)
                .post("/authorized")
                .expect(401, done);
        })
       test("should invalidate token after expire date", function (done) {
                let user = User.build({
                    email: randEmail(),
                    password: randPassword(),
                    name: randUserName()
                });
                let token: string = Container.get(authService).generateToken(user.get(), "2s");
                this.timeout(2100);
                supertest(app)
                    .post("/authorized")
                    .set("Authorization", token)
                    .expect(401, done);
        })
        
        test("should access user to private routes when valid", async () => {
                let user = await Container.get(authRepository).createUser({
                    email: randEmail(),
                    password: randPassword(),
                    name: randUserName(),
                    profileId: randNumber()
                })
                let token: string = Container.get(authService).generateToken(user.get());
                supertest(app).post("/authorized").set("authorization", "Bearer " + token).end((error: Error, response: supertest.Response) => {
                    expect(response.statusCode).to.be.eq(200);
                });
        })
        test("should not access user to private routes when invalid", (done) => {
            supertest(app).post("/authorized").set("authorization", "invalid_token").expect(401, done);
        })
    })
})