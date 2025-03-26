import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/upload.middleware.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const productRouter = Router();

// ADD PRODUCT
productRouter
  .route("/")
  .post(
    loginAuth,
    adminAuth,
    upload.array("images"),
    trimBodyObject,
    checkRequiredFields([
      "name",
      "description",
      "price",
      "discount",
      "discount_price",
      "company",
      "product_sku",
    ]),
    addProduct
  );

// GET ALL PRODUCTS
productRouter.route("/").get(getAllProducts);

// GET SINGLE PRODUCT
productRouter.route("/:id").get(getProductById);

// UPDATE PRODUCT
productRouter
  .route("/:id")
  .patch(
    loginAuth,
    adminAuth,
    upload.array("images"),
    trimBodyObject,
    checkRequiredFields([
      "name",
      "description",
      "price",
      "discount",
      "discount_price",
      "company",
      "product_sku",
    ]),
    updateProduct
  );

// DELETE PRODUCT
productRouter.route("/:id").delete(loginAuth, adminAuth, deleteProduct);

export { productRouter };
