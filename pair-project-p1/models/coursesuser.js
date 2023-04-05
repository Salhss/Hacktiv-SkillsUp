'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoursesUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoursesUser.init({
    CoursesId: DataTypes.INTEGER,
    UsersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CoursesUser',
  });
  return CoursesUser;
};