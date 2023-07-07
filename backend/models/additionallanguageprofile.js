'use strict';
const {
  Model
} = require('sequelize');

const Profile = require("./profile");
module.exports = (sequelize, DataTypes) => {
  class additionalLanguageProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  additionalLanguageProfile.init({
    languageId: DataTypes.INTEGER,
    percent: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'profileAdditionalLanguages',
  });

  additionalLanguageProfile.belongsTo(Profile);

  return additionalLanguageProfile;
};