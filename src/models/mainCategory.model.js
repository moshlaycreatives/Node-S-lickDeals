import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const MainCategory = sequelize.define(
  "MainCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "main_categories",
  }
);
