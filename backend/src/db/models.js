// import { DataTypes } from 'sequelize';
// import { sequelize } from './dbConfig.js';

// export const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   email: {
//     type: DataTypes.STRING(50),
//     allowNull: false,
//     unique:true
//   },
//   password: {
//     type: DataTypes.STRING(50),
//     allowNull: false
//   }
// }, { tableName: 'users' });