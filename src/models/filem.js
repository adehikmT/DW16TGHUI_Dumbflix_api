'use strict';
module.exports = (sequelize, DataTypes) => {
  const filem = sequelize.define('filem', {
    title: DataTypes.STRING,
    thumbnailFilm: DataTypes.STRING,
    year: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  filem.associate = function(models) {
    filem.belongsTo(models.category, {
      foreignKey: {
        name: "categoryId",
      },
    });
  };
  return filem;
};