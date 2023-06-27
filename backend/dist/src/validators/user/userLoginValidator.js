"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userConstants_1 = require("../../constants/userConstants");
const zod_1 = require("zod");
const rules = zod_1.z.object({
    email: zod_1.z.string().email().nonempty(),
    password: zod_1.z.string().max(userConstants_1.PASSWORD_MAX_LENGTH).min(userConstants_1.PASSWORD_MIN_LENGTH).nonempty()
});
exports.default = (requestBody) => rules.safeParse(requestBody);
