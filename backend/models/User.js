import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define('User', {
  login: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

export default User;
