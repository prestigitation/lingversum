import Container from "typedi"
import sequelizeConnection from "../config/database"
import { DataTypes } from "sequelize";
import profileAdditionalLanguages from "./profileAdditionalLanguage.model";
import profileDesiredLanguages from "./profileDesiredLanguage.model";

const sequelize = Container.get(sequelizeConnection).getInstance();

const Profile = sequelize!.define("Profile", {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    mainLanguageId: {
      type: DataTypes.NUMBER,
      allowNull: true
    }
}, {
  tableName: "Profiles"
});

Profile.hasMany(profileAdditionalLanguages);
Profile.hasMany(profileDesiredLanguages);

export default Profile;