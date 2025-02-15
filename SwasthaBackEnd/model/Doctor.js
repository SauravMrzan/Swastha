const {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../database/db');

const Doctor = sequelize.define('Doctor',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    speciality:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medicalID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorImage:{
        type:DataTypes.STRING,
        allowNull:true,
    }
},{
    tableName:'doctor',
    timestamps: false
});
module.exports = Doctor;