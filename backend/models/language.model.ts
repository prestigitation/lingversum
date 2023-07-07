import Container from "typedi"
import sequelizeConnection from "../config/database"
import { DataTypes } from "sequelize";

const sequelize = Container.get(sequelizeConnection).getInstance();

const Language = sequelize!.define("Languages", {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    imageLink: {
        type: DataTypes.STRING
    }
}, {
  tableName: "Languages"
});

export default Language;