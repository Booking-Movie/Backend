const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('booking', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_seat: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    status_seat: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
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
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'seat',
        key: 'id'
      }
    },
    showtime_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'showtime',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "user_id" },
          { name: "movie_id" },
          { name: "cinema_id" },
          { name: "seat_id" },
          { name: "showtime_id" },
        ]
      },
      {
        name: "cinema_id",
        using: "BTREE",
        fields: [
          { name: "cinema_id" },
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "seat_id",
        using: "BTREE",
        fields: [
          { name: "seat_id" },
        ]
      },
      {
        name: "showtime_id",
        using: "BTREE",
        fields: [
          { name: "showtime_id" },
        ]
      },
    ]
  });
};
