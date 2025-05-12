import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

export const Product = sequelize.define(
  "Product",
  {
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

    button_text: {
      type: DataTypes.STRING,
      allowNull: true,
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

    deals: {
      type: DataTypes.ENUM(["Top", ""]),
      defaultValue: "",
    },

    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sub_categories",
        key: "id",
      },
    },

    descriptions: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("descriptions");
        try {
          return JSON.parse(rawValue || "[]");
        } catch (err) {
          return [];
        }
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue("descriptions", JSON.stringify(value));
        } else {
          try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              this.setDataValue("descriptions", JSON.stringify(parsed));
            } else {
              this.setDataValue("descriptions", JSON.stringify([]));
            }
          } catch (err) {
            this.setDataValue("descriptions", JSON.stringify([]));
          }
        }
      },
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);
