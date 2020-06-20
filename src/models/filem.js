"use strict";
module.exports = (sequelize, DataTypes) => {
  const filem = sequelize.define(
    "filem",
    {
      title: DataTypes.STRING,
      thumbnailFilm: DataTypes.STRING,
      year: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      linkFilm: DataTypes.STRING,
    },
    {}
  );
  filem.associate = function (models) {
    filem.belongsTo(models.category, {
      foreignKey: {
        name: "categoryId",
      },
    });
    // filem.hasOne(models.episode)
    filem.hasMany(models.episode);
  };
  return filem;
};
