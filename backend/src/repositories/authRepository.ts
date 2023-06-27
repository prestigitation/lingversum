import baseRepository from "./baseRepository";
import authRepositoryInterface from "../interfaces/authRepositoryInterface";
import User from "../../models/user.model";
import userRegisterProperties from "../interfaces/userRegisterProperties";
import { Model } from "sequelize";
import bcrypt from "bcrypt"
import { Service } from "typedi";

@Service()
export default class authRepository extends baseRepository implements authRepositoryInterface {
    constructor() {
        super();
    }

    async createUser({email, name, password}: userRegisterProperties): Promise<Model<typeof User>> {
        const user = await User.build({
            email,
            name,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        });
        return user;
    }
}