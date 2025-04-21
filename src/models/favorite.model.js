import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const Favorite = sequelize.define(
  "Favorite",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
  },
  {
    tableName: "favorites",
    timestamps: true,
  }
);
