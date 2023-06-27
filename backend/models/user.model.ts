import Container from "typedi"
import sequelizeConnection from "../config/database"
import { DataTypes } from "sequelize";

const sequelize = Container.get(sequelizeConnection).getInstance();

const User = sequelize!.define("Users", {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
  tableName: "Users"
})

export default User;