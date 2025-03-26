import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    timestamps: true,
  }
);
