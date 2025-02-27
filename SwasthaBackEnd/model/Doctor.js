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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalID: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctorImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availableDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    availableTime: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
