let server = require("../index");

import { test } from "mocha"
import supertest from "supertest";
import http from "http";

import authService from "../src/services/authService";
import { randUserName } from "@ngneat/falso";

const supertestInstance = supertest(http.createServer(server));

describe("AuthService", () => {
    let service = new authService();
    before(() => {
        process.env.NODE_ENV = "test";
    })
    describe("works correctly with token", () => {
        test("should invalidate token after expire date", () => {
            
        })
        test("should access user to private routes when valid", () => {
            
        })
    })
})