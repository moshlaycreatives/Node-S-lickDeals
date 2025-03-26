import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
export const ForgotPassword = sequelize.define(
  "ForgotPassword",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "forgot_passwords",
    timestamps: true,
  }
);
