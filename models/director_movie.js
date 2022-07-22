const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('director_movie', {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    director_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'director',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'director_movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "movie_id" },
          { name: "director_id" },
        ]
      },
      {
        name: "director_id",
        using: "BTREE",
        fields: [
          { name: "director_id" },
        ]
      },
    ]
  });
};
