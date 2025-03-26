import { MainCategory } from "../models/mainCategory.model.js";
import { SubCategory } from "../models/subCategory.model.js";
import { Product } from "../models/product.model.js";
import { Comment } from "../models/comments.model.js";
import { User } from "../models/user.model.js";

// Associations
MainCategory.hasMany(SubCategory, {
  foreignKey: "main_category_id",
  onDelete: "CASCADE",
});
SubCategory.belongsTo(MainCategory, { foreignKey: "main_category_id" });

SubCategory.hasMany(Product, {
  foreignKey: "sub_category_id",
  onDelete: "CASCADE",
});
Product.belongsTo(SubCategory, { foreignKey: "sub_category_id" });

User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Comment, { foreignKey: "productId", onDelete: "CASCADE" });
Comment.belongsTo(Product, { foreignKey: "productId" });

export default function setupAssociations() {
  console.log("Database associations have been set up.");
}
