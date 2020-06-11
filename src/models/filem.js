'use strict';
module.exports = (sequelize, DataTypes) => {
  const filem = sequelize.define('filem', {
    title: DataTypes.STRING,
    idCategory: DataTypes.INTEGER
  }, {});
  filem.associate = function(models) {
    // associations can be defined here
  };
  return filem;
};