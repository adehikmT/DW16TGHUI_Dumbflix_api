'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gendre: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    subscibe: DataTypes.BOOLEAN,
    role:DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    user.hasOne(models.transaction)
  };
  return user;
};