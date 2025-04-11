import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const Product = sequelize.define("Product", {
  images: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "At least one product image is required.",
      },
    },
    get() {
      return JSON.parse(this.getDataValue("images") || "[]");
    },
    set(value) {
      this.setDataValue("images", JSON.stringify(value));
    },
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  product_url: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  discount_code: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  deal_start_date: {
    type: DataTypes.DATE,
  },

  deal_end_date: {
    type: DataTypes.DATE,
  },

  sub_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "sub_categories",
      key: "id",
    },
  },
});
