const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const User = require("./User");
const Doctor = require("./Doctor");

const Booking = sequelize.define("Booking", {
  bookingId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "doctor",
      key: "id",
    },
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Doctor, { foreignKey: "doctorId" });
module.exports = Booking;
