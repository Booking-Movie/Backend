const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('news', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    new_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    new_introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    new_body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    new_conclusion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    new_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'news_type',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'news',
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
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
};
