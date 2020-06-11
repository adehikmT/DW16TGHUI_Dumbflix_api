'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    category.hasMany(models.user,{
      foreigenKey: 'idCategory',
      as: 'filem'
    })
  };
  return category;
};