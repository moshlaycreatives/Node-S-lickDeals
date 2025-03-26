import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { commentRouter } from "./comments.routes.js";
import { productRouter } from "./product.routes.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import { adminRouter } from "./admin.routes.js";
import { subCategoryRouter } from "./subCategory.routes.js";
import { mainCategoryRouter } from "./mainCategory.routes.js";

const router = Router();

// Admin Routes
router.use("/admin", adminRouter);

// User Routes
router.use("/user", userRouter);

// PRODUCT ROUTES
router.use("/product", productRouter);

// COMMENT ROUTES
router.use("/comment", loginAuth, commentRouter);

// MAIN CATEGORY ROUTES
router.use("/category", mainCategoryRouter);

// CATEGORY ROUTES
router.use("/category", subCategoryRouter);
export { router };
