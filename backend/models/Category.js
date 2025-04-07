import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Service from './Service.js';

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

Category.hasMany(Service, { as: 'services' });

export default Category;
