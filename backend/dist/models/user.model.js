"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const profile_model_1 = __importDefault(require("./profile.model"));
const sequelize = typedi_1.default.get(database_1.default).getInstance();
const User = sequelize.define("Users", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    profileId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "Users"
});
User.belongsTo(profile_model_1.default);
exports.default = User;
