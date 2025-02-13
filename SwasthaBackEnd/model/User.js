const {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../database/db');


const User = sequelize.define('User',{

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true,
    } ,
    name: {
        type:DataTypes.STRING,
        allowNull: false
     },
    email: {
        type:DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false
    },
    address: {
        type:DataTypes.STRING,
        allowNull:false
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    tableName: 'users',
    timestamps: false
});

module.exports = User;


