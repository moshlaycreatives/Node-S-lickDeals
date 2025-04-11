import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";

import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/subCategory.controllers.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const subCategoryRouter = Router();

// =============================================
// 1. Add Sub Category
// =============================================
subCategoryRouter
  .route("/sub")
  .post(
    loginAuth,
    adminAuth,
    trimBodyObject,
    checkRequiredFields(["name", "main_category_id"]),
    addSubCategory
  );

// ==============================================
// 2. Get All Sub Categories By Main Category Id
// ==============================================
subCategoryRouter.route("/get-all-sub/:id").get(getAllSubCategories);

// ================================================
// 3. Get + Update + Delete - Sub Categories By Id
// ================================================
subCategoryRouter
  .route("/sub/:id")
  .get(getSubCategoryById)
  .patch(
    loginAuth,
    adminAuth,
    trimBodyObject,
    checkRequiredFields(["name", "main_category_id"]),
    updateSubCategory
  )
  .delete(loginAuth, adminAuth, deleteSubCategory);

export { subCategoryRouter };
