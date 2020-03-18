'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    view_count: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    active: DataTypes.ENUM
  }, {});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};