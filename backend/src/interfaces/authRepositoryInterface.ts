import { Model } from "sequelize";
import User from "../../models/user.model";
import userCreationProperties from "./userRegisterProperties";

export default interface authRepositoryInterface {
    createUser(userProperties: userCreationProperties): Promise<Model<typeof User>>;
}