"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userConstants_1 = require("../../constants/userConstants");
const zod_1 = require("zod");
const rules = zod_1.z.object({
    name: zod_1.z.string().min(userConstants_1.NAME_MIN_LENGTH).max(userConstants_1.NAME_MAX_LENGTH),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(userConstants_1.PASSWORD_MIN_LENGTH).max(userConstants_1.PASSWORD_MAX_LENGTH)
});
exports.default = (requestBody) => rules.safeParse(requestBody);
