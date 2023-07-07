import Container from "typedi"
import sequelizeConnection from "../config/database"
import { DataTypes } from "sequelize";
import Profile from "./profile.model";

const sequelize = Container.get(sequelizeConnection).getInstance();

const profileDesiredLanguages = sequelize!.define("profileDesiredLanguages", {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    languageId: {
        type: DataTypes.NUMBER
    },
    profileId: {
        type: DataTypes.NUMBER
    }
}, {
  tableName: "profileDesiredLanguages"
});

//profileDesiredLanguages.belongsTo(Profile);

export default profileDesiredLanguages;