import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Service = sequelize.define('Service', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  CategoryId: { type: DataTypes.INTEGER }
});

export default Service;
