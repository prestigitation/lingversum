"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let server = require("./mocks/authTestServer");
const mocha_1 = require("mocha");
const express_1 = __importDefault(require("express"));
const authenticateJwt_1 = __importDefault(require("../src/middleware/authenticateJwt"));
const falso_1 = require("@ngneat/falso");
const typedi_1 = __importDefault(require("typedi"));
const authRepository_1 = __importDefault(require("../src/repositories/authRepository"));
const authService_1 = __importDefault(require("../src/services/authService"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const user_model_1 = __importDefault(require("../models/user.model"));
const sequelizeConnectionAdapter_1 = __importDefault(require("../src/repositories/adapters/sequelizeConnectionAdapter"));
const app = (0, express_1.default)();
app.post("/authorized", authenticateJwt_1.default, (request, response) => {
    return response.sendStatus(200);
});
app.listen(5982);
describe("AuthService", () => {
    before(() => {
        process.env.NODE_ENV = "test";
        process.env.TOKEN_SECRET = "test";
    });
    beforeEach(() => {
        var _a;
        (_a = typedi_1.default.get(sequelizeConnectionAdapter_1.default).connect()) === null || _a === void 0 ? void 0 : _a.truncate();
    });
    describe("works correctly with token", () => {
        (0, mocha_1.test)("route should be protected by the auth token", (done) => {
            (0, supertest_1.default)(app)
                .post("/authorized")
                .expect(401, done);
        });
        (0, mocha_1.test)("should invalidate token after expire date", function (done) {
            let user = user_model_1.default.build({
                email: (0, falso_1.randEmail)(),
                password: (0, falso_1.randPassword)(),
                name: (0, falso_1.randUserName)()
            });
            let token = typedi_1.default.get(authService_1.default).generateToken(user.get(), "2s");
            this.timeout(2100);
            (0, supertest_1.default)(app)
                .post("/authorized")
                .set("Authorization", token)
                .expect(401, done);
        });
        (0, mocha_1.test)("should access user to private routes when valid", () => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield typedi_1.default.get(authRepository_1.default).createUser({
                email: (0, falso_1.randEmail)(),
                password: (0, falso_1.randPassword)(),
                name: (0, falso_1.randUserName)()
            });
            let token = typedi_1.default.get(authService_1.default).generateToken(user.get());
            (0, supertest_1.default)(app).post("/authorized").set("authorization", "Bearer " + token).end((error, response) => {
                (0, chai_1.expect)(response.statusCode).to.be.eq(200);
            });
        }));
        (0, mocha_1.test)("should not access user to private routes when invalid", (done) => {
            (0, supertest_1.default)(app).post("/authorized").set("authorization", "invalid_token").expect(401, done);
        });
    });
});
