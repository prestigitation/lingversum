const { default: Container } = require("typedi");
import { DataTypes } from "sequelize";
import sequelizeConnectionAdapter from "../src/repositories/adapters/sequelizeConnectionAdapter"

const sequelize = Container.get(sequelizeConnectionAdapter).connect();

const User = sequelize.define("User", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "Users"
})

export default User