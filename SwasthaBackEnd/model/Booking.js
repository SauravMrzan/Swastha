const { Sequelize,DataTypes} = require('sequelize');
const { sequelize } = require('../database/db');

const Booking = sequelize.define('Booking',{
    bookingId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    doctorId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    startTime:{
        type:DataTypes.TIME,
        allowNull: false,
    }
});
module.exports = Booking;