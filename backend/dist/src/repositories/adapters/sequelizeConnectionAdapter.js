"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _sequelizeConnectionAdapter_instance;
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const sequelize_1 = require("sequelize");
let sequelizeConnectionAdapter = class sequelizeConnectionAdapter {
    constructor() {
        _sequelizeConnectionAdapter_instance.set(this, void 0);
        require("dotenv").config();
    }
    connect() {
        if (!this.getInstance()) {
            this.setInstance(new sequelize_1.Sequelize("mydatabase", "myuser", "mypassword", {
                host: "lingversum-database",
                dialect: "mysql"
            }));
        }
        return this.getInstance();
    }
    setInstance(newInstance) {
        __classPrivateFieldSet(this, _sequelizeConnectionAdapter_instance, newInstance, "f");
    }
    getInstance() {
        return __classPrivateFieldGet(this, _sequelizeConnectionAdapter_instance, "f");
    }
};
_sequelizeConnectionAdapter_instance = new WeakMap();
sequelizeConnectionAdapter = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], sequelizeConnectionAdapter);
exports.default = sequelizeConnectionAdapter;
