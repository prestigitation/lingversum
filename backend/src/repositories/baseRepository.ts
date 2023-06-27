import Container from "typedi";
import sequelizeConnectionAdapter from "./adapters/sequelizeConnectionAdapter";
import { Sequelize } from "sequelize";

export default class baseRepository {
    databaseInstance: Sequelize | undefined;
    constructor(connectionAdapter = Container.get(sequelizeConnectionAdapter)) {
        this.databaseInstance = connectionAdapter.connect();
    }
}