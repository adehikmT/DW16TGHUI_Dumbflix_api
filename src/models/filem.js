'use strict';
module.exports = (sequelize, DataTypes) => {
  const filem = sequelize.define('filem', {
    title: DataTypes.STRING,
    thumbnatiFilem:DataTypes.STRING,
    year: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER
  }, {});
  filem.associate = function(models) {
    // associations can be defined here
  };
  return filem;
};