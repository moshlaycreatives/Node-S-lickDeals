import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsBySubCategoryId,
  getProductById,
  searchProducts,
  updateProduct,
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/upload.middleware.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const productRouter = Router();

// ==============================================
// 1. Add Product + Get All Products
// ==============================================
productRouter
  .route("/")
  .post(
    loginAuth,
    adminAuth,
    upload.array("images"),
    trimBodyObject,
    checkRequiredFields(["name", "price", "sub_category_id"]),
    addProduct
  )
  .get(getAllProducts);

// ==============================================
// 2. Get All Products By Sub Category Id
// ==============================================
productRouter.route("/category/:id").get(getAllProductsBySubCategoryId);

// ==============================================
// 3. Search Product
// ==============================================
productRouter.route("/search").get(searchProducts);

// ==============================================
// 4. Get + Update + Delete By Id
// ==============================================
productRouter
  .route("/:id")
  .get(getProductById)
  .patch(
    loginAuth,
    adminAuth,
    upload.array("images"),
    trimBodyObject,
    checkRequiredFields(["name", "price", "sub_category_id"]),
    updateProduct
  )
  .delete(loginAuth, adminAuth, deleteProduct);

export { productRouter };
