"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateJwt(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return response.sendStatus(401).redirect("/login");
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err)
            return response.sendStatus(403);
        request.user = user;
        next();
    });
}
exports.default = authenticateJwt;
