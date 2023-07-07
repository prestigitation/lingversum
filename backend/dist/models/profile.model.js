"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const profileAdditionalLanguage_model_1 = __importDefault(require("./profileAdditionalLanguage.model"));
const profileDesiredLanguage_model_1 = __importDefault(require("./profileDesiredLanguage.model"));
const sequelize = typedi_1.default.get(database_1.default).getInstance();
const Profile = sequelize.define("Profile", {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    mainLanguageId: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    }
}, {
    tableName: "Profiles"
});
Profile.hasMany(profileAdditionalLanguage_model_1.default);
Profile.hasMany(profileDesiredLanguage_model_1.default);
exports.default = Profile;
