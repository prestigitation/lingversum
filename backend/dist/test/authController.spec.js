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
let server = require("../index");
const falso_1 = require("@ngneat/falso");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const typedi_1 = __importDefault(require("typedi"));
const supertest_1 = __importDefault(require("supertest"));
const http_1 = __importDefault(require("http"));
const sequelizeConnectionAdapter_1 = __importDefault(require("../src/repositories/adapters/sequelizeConnectionAdapter"));
const authRepository_1 = __importDefault(require("../src/repositories/authRepository"));
const userConstants_1 = require("../src/constants/userConstants");
const supertestInstance = (0, supertest_1.default)(http_1.default.createServer(server));
describe("AuthController", () => {
    beforeEach(() => {
        var _a;
        (_a = typedi_1.default.get(sequelizeConnectionAdapter_1.default).connect()) === null || _a === void 0 ? void 0 : _a.truncate();
    });
    describe("register method", () => {
        (0, mocha_1.test)("should register user with valid data", () => {
            supertestInstance.post("/register").send({
                email: (0, falso_1.randEmail)(),
                name: (0, falso_1.randUserName)(),
                password: (0, falso_1.randPassword)()
            }).expect(201);
        });
        describe("should not pass validation with invalid data", () => {
            (0, mocha_1.test)("doesn`t pass the password without the remaining count of symbols", () => {
                supertestInstance.post("/register").send({
                    email: (0, falso_1.randEmail)(),
                    name: (0, falso_1.randUserName)(),
                    password: (0, falso_1.randPassword)({ length: userConstants_1.PASSWORD_MIN_LENGTH - 1 })
                }).expect(409);
            });
            (0, mocha_1.test)("doesn`t pass the password with the extra count of symbols", () => {
                supertestInstance.post("/register").send({
                    email: (0, falso_1.randEmail)(),
                    name: (0, falso_1.randUserName)(),
                    password: (0, falso_1.randPassword)({ length: userConstants_1.PASSWORD_MAX_LENGTH + 1 })
                }).expect(409);
            });
            (0, mocha_1.test)("doesn`t pass the email without the remaining count of symbols", () => {
                supertestInstance.post("/register").send({
                    email: (0, falso_1.randEmail)({ length: userConstants_1.EMAIL_MIN_LENGTH - 1 }),
                    name: (0, falso_1.randUserName)(),
                    password: (0, falso_1.randPassword)()
                }).expect(409);
            });
            (0, mocha_1.test)("doesn`t pass the email with the extra count of symbols", () => {
                supertestInstance.post("/register").send({
                    email: (0, falso_1.randEmail)({ length: userConstants_1.EMAIL_MAX_LENGTH + 1 }),
                    name: (0, falso_1.randUserName)(),
                    password: (0, falso_1.randPassword)()
                }).expect(409);
            });
            (0, mocha_1.test)("doesn`t pass the name without the remaining count of symbols", () => {
                supertestInstance.post("/register").send({
                    email: (0, falso_1.randEmail)(),
                    name: (0, falso_1.randUserName)({ length: userConstants_1.NAME_MIN_LENGTH - 1 }),
                    password: (0, falso_1.randPassword)()
                }).expect(409);
            });
            (0, mocha_1.test)("doesn`t pass when the extra field is provided", () => {
                supertestInstance.post("/register").send({
                    email: (0, falso_1.randEmail)(),
                    name: (0, falso_1.randUserName)(),
                    password: (0, falso_1.randPassword)(),
                    someRandomField: (0, falso_1.randPassword)()
                }).expect(409);
            });
        });
        (0, mocha_1.test)("should not pass if user with given email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            let existingEmail = (0, falso_1.randEmail)();
            (yield typedi_1.default.get(authRepository_1.default).createUser({ email: existingEmail, name: (0, falso_1.randUserName)(), password: (0, falso_1.randPassword)() }));
            supertestInstance.post("/register").send({
                email: existingEmail,
                name: (0, falso_1.randUserName)(),
                password: (0, falso_1.randPassword)()
            }).expect(422);
        }));
    });
    describe("login method", () => {
        (0, mocha_1.test)("should return token when a given credentials are valid", () => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield typedi_1.default.get(authRepository_1.default).createUser({
                email: (0, falso_1.randEmail)(),
                name: (0, falso_1.randUserName)(),
                password: (0, falso_1.randPassword)()
            });
            supertestInstance.post("/login").send({
                email: user.get("email"),
                password: user.get("password")
            }).then((response) => {
                (0, chai_1.expect)(response.body).not.to.be.undefined;
                (0, chai_1.expect)(response.body).to.be.string;
            });
        }));
        (0, mocha_1.test)("should return 409 status code when a given credentials are invalid", () => {
            supertestInstance.post("/login").send({
                email: (0, falso_1.randEmail)(),
                password: (0, falso_1.randPassword)({ length: userConstants_1.PASSWORD_MIN_LENGTH - 1 })
            }).expect(422);
        });
        (0, mocha_1.test)("should return 403 status when password in input is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield typedi_1.default.get(authRepository_1.default).createUser({
                email: (0, falso_1.randEmail)(),
                name: (0, falso_1.randUserName)(),
                password: (0, falso_1.randPassword)()
            });
            supertestInstance.post("/login").send({
                email: user.get("email"),
                password: (0, falso_1.randPassword)()
            }).expect(403);
        }));
        (0, mocha_1.test)("should return 400 status when user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            supertestInstance.post("/login").send({
                email: (0, falso_1.randEmail)(),
                password: (0, falso_1.randPassword)()
            }).expect(403);
        }));
    });
});
