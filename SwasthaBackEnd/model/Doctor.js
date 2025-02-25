const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctorName: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    speciality: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicalID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctorImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "doctor",
    timestamps: false,
  }
);
module.exports = Doctor;
