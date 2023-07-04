import { Service } from "typedi";
import { Sequelize } from "sequelize";
import databaseConnectionAdapterInterface from "../../interfaces/databaseConnectionAdapterInterface";
@Service()
export default class sequelizeConnectionAdapter implements databaseConnectionAdapterInterface {
    #instance: Sequelize | undefined;
    constructor() {
        require("dotenv").config();
    }
    connect(): Sequelize | undefined {
        if (!this.getInstance()) {
            this.setInstance(new Sequelize("mydatabase", "myuser", "mypassword", {
                host: "lingversum-database",
                dialect: "mysql"
            }))
        }

        return this.getInstance();
    }
    setInstance(newInstance: Sequelize) {
        this.#instance = newInstance
    }
    getInstance() {
        return this.#instance;
    }
}