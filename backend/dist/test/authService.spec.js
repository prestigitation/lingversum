"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let server = require("../index");
const mocha_1 = require("mocha");
const supertest_1 = __importDefault(require("supertest"));
const http_1 = __importDefault(require("http"));
const authService_1 = __importDefault(require("../src/services/authService"));
const supertestInstance = (0, supertest_1.default)(http_1.default.createServer(server));
describe("AuthService", () => {
    let service = new authService_1.default();
    before(() => {
        process.env.NODE_ENV = "test";
    });
    describe("works correctly with token", () => {
        (0, mocha_1.test)("should invalidate token after expire date", () => {
        });
        (0, mocha_1.test)("should access user to private routes when valid", () => {
        });
    });
});
