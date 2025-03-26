import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

import {
  addMainCategory,
  deleteMainCategory,
  getAllMainCategories,
  getMainCategoryById,
  updateMainCategory,
} from "../controllers/mainCategory.controllers.js";

const mainCategoryRouter = Router();

// MAIN CATEGORY ROUTES
mainCategoryRouter
  .route("/main")
  .post(
    loginAuth,
    adminAuth,
    trimBodyObject,
    checkRequiredFields(["name"]),
    addMainCategory
  )
  .get(getAllMainCategories);

mainCategoryRouter
  .route("/main/:id")
  .get(getMainCategoryById)
  .patch(
    loginAuth,
    adminAuth,
    trimBodyObject,
    checkRequiredFields(["name"]),
    updateMainCategory
  )
  .delete(loginAuth, adminAuth, deleteMainCategory);

export { mainCategoryRouter };
