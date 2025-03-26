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

  description: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  discount_price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  label: {
    type: DataTypes.ENUM("Popular", "New"),
    defaultValue: "New",
  },

  tag: {
    type: DataTypes.ENUM("For You", "Personalized"),
    defaultValue: "For You",
  },

  product_sku: {
    type: DataTypes.STRING,
    allowNull: false,
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
