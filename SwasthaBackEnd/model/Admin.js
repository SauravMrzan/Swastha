const {Sequelize,DataTypes} = require('sequelize');
const { sequelize } = require('../database/db');

const Admin = sequelize.define('Admin',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    adminName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    adminEmail:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull: false
    },
    type:{
        type:DataTypes.STRING,
        allowNull: false
    }

},{
    tableName:'admin',
    timestamps:false
});
module.exports = Admin;