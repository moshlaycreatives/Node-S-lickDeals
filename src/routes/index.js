import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { commentRouter } from "./comments.routes.js";
import { productRouter } from "./product.routes.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import { adminRouter } from "./admin.routes.js";
import { subCategoryRouter } from "./subCategory.routes.js";
import { mainCategoryRouter } from "./mainCategory.routes.js";
import { favoriteRouter } from "./favorite.routes.js";

const router = Router();

// =============================================
// 1. Admin Routes
// =============================================
router.use("/admin", adminRouter);

// =============================================
// 2. User Routes
// =============================================
router.use("/user", userRouter);

// =============================================
// 3. Product Routes
// =============================================
router.use("/product", productRouter);

// =============================================
// 4. Comment Routes
// =============================================
router.use("/comment", loginAuth, commentRouter);

// =============================================
// 5. Main Category Routes
// =============================================
router.use("/category", mainCategoryRouter);

// =============================================
// 6. Sub Category Routes
// =============================================
router.use("/category", subCategoryRouter);

// =============================================
// 6. Favorite Products Routes
// =============================================
router.use("/favorite", favoriteRouter);

export { router };
