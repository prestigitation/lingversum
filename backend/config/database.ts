import { Sequelize } from "sequelize";
import Container, { Service } from "typedi";
import sequelizeConnectionAdapter from "../src/repositories/adapters/sequelizeConnectionAdapter";

@Service()
export default class sequelizeConnection {
    #instance: Sequelize | undefined;

    getInstance() {
        if(this.#instance) {
            return this.#instance;
        } else {
            return Container.get(sequelizeConnectionAdapter).connect();
        }
    }
}