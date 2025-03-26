import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const SubCategory = sequelize.define(
  "SubCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    main_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "main_categories",
        key: "id",
      },
    },
  },
  {
    tableName: "sub_categories",
  }
);
