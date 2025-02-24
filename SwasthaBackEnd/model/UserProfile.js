const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references:{
        model: 'User',
        key: 'id'
      },
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    bloodtype:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    allergies:{
        type: DataTypes.STRING,
        allowNull: true,
    }
  },
  {
    tableName: "userprofile",
    timestamps: false,
  }
);

module.exports = UserProfile;
