'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    viewCount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    active: DataTypes.ENUM
  }, {});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};
