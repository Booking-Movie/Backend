const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('movie', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_movie: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comming_data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    des_movie: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time_show: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    trailer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status_movie: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    evaluate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_movie: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
