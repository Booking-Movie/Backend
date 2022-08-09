const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seat', {
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
      allowNull: true,
      defaultValue: 1
    },
    showtime_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'showtime',
        key: 'id'
      }
    },
    user_booking: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'seat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "showtime_id" },
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
