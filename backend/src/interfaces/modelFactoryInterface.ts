import { Model } from "sequelize";

export default interface modelFactoryInterface {
    getModel(): Model
}