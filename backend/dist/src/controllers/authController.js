"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const typedi_1 = __importStar(require("typedi"));
const userRegisterValidator_1 = __importDefault(require("../validators/user/userRegisterValidator"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const authService_1 = __importDefault(require("../services/authService"));
const userLoginValidator_1 = __importDefault(require("../validators/user/userLoginValidator"));
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
const baseController_1 = __importDefault(require("./baseController"));
let authController = class authController extends baseController_1.default {
    constructor() {
        super();
    }
    login(request, response) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const service = typedi_1.default.get(authService_1.default);
            const { email, password } = request.body;
            let validator = (0, userLoginValidator_1.default)(request.body);
            if (validator.success) {
                const user = yield user_model_1.default.findOne({
                    where: {
                        email
                    }
                });
                if (user) {
                    if (service.matchHash(password, user === null || user === void 0 ? void 0 : user.getDataValue("password"))) {
                        let userInfo = {
                            name: user === null || user === void 0 ? void 0 : user.getDataValue("name"),
                            email
                        };
                        let token = service.generateToken(userInfo);
                        return response.json(Object.assign({ token }, userInfo));
                    }
                    else {
                        return response.status(403).send({ message: (_a = this.getI18N()) === null || _a === void 0 ? void 0 : _a.__("USER.INCORREСT_PASSWORD") });
                    }
                }
                else {
                    console.log((_b = this.i18n) === null || _b === void 0 ? void 0 : _b.__("USER.NOT_FOUND"));
                    return response.status(400).send({ message: (_c = this.getI18N()) === null || _c === void 0 ? void 0 : _c.__("USER.NOT_FOUND") });
                }
            }
            else {
                return response.status(422).send({ message: (_d = this.getI18N()) === null || _d === void 0 ? void 0 : _d.__("USER.NOT_VALIDATED") });
            }
        });
    }
    register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = request.body;
            const repository = new authRepository_1.default();
            yield user_model_1.default.findOne({
                where: {
                    email
                }
            }).then((user) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (user) {
                    return response.status(409).send((_a = this.getI18N()) === null || _a === void 0 ? void 0 : _a.__("USER.ALREADY_EXISTS"));
                }
                else {
                    let validator = (0, userRegisterValidator_1.default)(request.body);
                    if (validator.success) {
                        const user = yield repository.createUser({ name, email, password });
                        user.save();
                        return response.sendStatus(201);
                    }
                    else {
                        return response.status(422).send({ message: (_b = this.getI18N()) === null || _b === void 0 ? void 0 : _b.__("USER.NOT_VALIDATED") });
                    }
                }
            })).catch((e) => {
                var _a;
                return response.status(500).send({ message: (_a = this.getI18N()) === null || _a === void 0 ? void 0 : _a.__("ERROR.SERVER_ERROR") });
            });
        });
    }
};
authController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], authController);
exports.default = authController;
