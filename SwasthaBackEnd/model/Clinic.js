// const {Sequelize,DataTypes} = require('sequelize');
// const { sequelize } = require('../database/db');

// const Clinic = sequelize.define('Clinic',{
//     id:{
//         type:DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name:{
//         type:DataTypes.STRING,
//         allowNull: false
//     },
//     pan:{
//         type:DataTypes.STRING,
//         allowNull: false
//     },
//     license:{
//         type:DataTypes.STRING,
//         allowNull: false
//     },
//     address:{
//         type:DataTypes.STRING,
//         allowNull: false
//     },
//     email:{
//         type:DataTypes.STRING,
//         allowNull: false
//     },
//     password:{
//         type:DataTypes.STRING,
//         allowNull: false
//     }
// },{
//     tableName:'clinics',
//     timestamps:false
// });
// module.exports = Clinic;