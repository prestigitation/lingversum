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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importStar(require("express"));
const authController_1 = __importDefault(require("./src/controllers/authController"));
const express_route_grouping_1 = __importDefault(require("express-route-grouping"));
const typedi_1 = __importDefault(require("typedi"));
const cors = require("cors");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv").config();
const app = (0, express_1.default)();
const root = new express_route_grouping_1.default('/', (0, express_1.Router)());
root.group('/api/v1', (router) => {
    router.post("/login", typedi_1.default.get(authController_1.default).login);
    router.post("/register", typedi_1.default.get(authController_1.default).register);
});
app.use(cors());
app.use((0, cookie_parser_1.default)());
const port = process.env.APP_PORT || 3000;
app.use(body_parser_1.default.json());
app.use('/', root.export());
if (!module.parent) {
    app.listen(port);
}
exports.default = app;
