const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('actor_movie', {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'actor',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'actor_movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "movie_id" },
          { name: "actor_id" },
        ]
      },
      {
        name: "actor_id",
        using: "BTREE",
        fields: [
          { name: "actor_id" },
        ]
      },
    ]
  });
};
