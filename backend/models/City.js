import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const City = sequelize.define(
  "City",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    boxPrice: { type: DataTypes.STRING, allowNull: false }, 
    palletPrice: { type: DataTypes.STRING, allowNull: false }, 
    threePalletsPrice: { type: DataTypes.STRING, allowNull: false }, 
    deliveryDays: { type: DataTypes.JSON, allowNull: false }, 
    shippingDays: { type: DataTypes.JSON, allowNull: false }, 
    byAgreementDelivery: { type: DataTypes.BOOLEAN, defaultValue: false }, 
    byAgreementShipping: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: false }
);

export default City;