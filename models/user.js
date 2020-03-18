'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.CHAR,
    role: DataTypes.ENUM,
    active: DataTypes.ENUM
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};