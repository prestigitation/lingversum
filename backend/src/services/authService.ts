import { Service } from "typedi";
import authServiceInterface from "../interfaces/authServiceInterface";
import bcrypt from "bcrypt";

@Service()
export default class authService implements authServiceInterface {
    jwt: any;
    dotenv: any;

    constructor() {
        this.dotenv = require('dotenv');
        this.jwt = require('jsonwebtoken');
    }

    generateToken(info: object) {
        return this.jwt.sign(info, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    }

    matchHash(rawString: string, hashedString: string): boolean {
        return bcrypt.compareSync(rawString, hashedString)
    }
}