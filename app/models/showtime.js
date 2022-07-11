const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('showtime', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code_theater: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    time_start: {
      type: DataTypes.TIME,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cinema_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cinema',
        key: 'id'
      }
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'showtime',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "cinema_id" },
          { name: "movie_id" },
        ]
      },
      {
        name: "movie_id",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
      {
        name: "cinema_id",
        using: "BTREE",
        fields: [
          { name: "cinema_id" },
        ]
      },
    ]
  });
};
