import Container from "typedi"
import sequelizeConnection from "../config/database"
import { DataTypes } from "sequelize";
import Profile from "./profile.model";
import profileAdditionalLanguages from "./profileAdditionalLanguage.model";

const sequelize = Container.get(sequelizeConnection).getInstance();

const User = sequelize!.define("Users", {
    id: {
      type: DataTypes.INTEGER,
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
    profileId: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
  tableName: "Users"
})

User.belongsTo(Profile);

export default User;