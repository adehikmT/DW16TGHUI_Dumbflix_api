'use strict';
module.exports = (sequelize, DataTypes) => {
  const episode = sequelize.define('episode', {
    title: DataTypes.STRING,
    thumbnailFilem: DataTypes.STRING,
    linkFilem: DataTypes.STRING,
    filemId: DataTypes.INTEGER
  }, {});
  episode.associate = function(models) {
    episode.belongsTo(models.filem, {
      foreignKey: {
        name: "filemId",
      },
    });
  };
  return episode;
};