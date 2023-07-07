import Container from "typedi"
import sequelizeConnection from "../config/database"
import { DataTypes } from "sequelize";
import Profile from "./profile.model";

const sequelize = Container.get(sequelizeConnection).getInstance();

const profileAdditionalLanguages = sequelize!.define("profileAdditionalLanguages", {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    languageId: {
        type: DataTypes.NUMBER
    },
    percent: { 
        type: DataTypes.NUMBER
    },
    profileId: {
      type: DataTypes.INTEGER
    },
}, {
  tableName: "profileAdditionalLanguages"
});

//profileAdditionalLanguages.belongsTo(Profile);

export default profileAdditionalLanguages;