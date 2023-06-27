"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const sequelizeConnectionAdapter_1 = __importDefault(require("./adapters/sequelizeConnectionAdapter"));
class baseRepository {
    constructor(connectionAdapter = typedi_1.default.get(sequelizeConnectionAdapter_1.default)) {
        this.databaseInstance = connectionAdapter.connect();
    }
}
exports.default = baseRepository;
