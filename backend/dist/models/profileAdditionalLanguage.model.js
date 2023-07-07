"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const sequelize = typedi_1.default.get(database_1.default).getInstance();
const profileAdditionalLanguages = sequelize.define("profileAdditionalLanguages", {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    languageId: {
        type: sequelize_1.DataTypes.NUMBER
    },
    percent: {
        type: sequelize_1.DataTypes.NUMBER
    },
    profileId: {
        type: sequelize_1.DataTypes.INTEGER
    },
}, {
    tableName: "profileAdditionalLanguages"
});
//profileAdditionalLanguages.belongsTo(Profile);
exports.default = profileAdditionalLanguages;
