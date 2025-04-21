import { Router } from "express";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import {
  favoriteProduct,
  getUserFavorites,
  unfavoriteProduct,
} from "../controllers/favorite.controllers.js";

const favoriteRouter = Router();

// =============================================
// 1. Add + Remove - Favorites
// =============================================
favoriteRouter
  .route("/:productId")
  .post(loginAuth, favoriteProduct)
  .get(loginAuth, unfavoriteProduct);

// =============================================
// 2. Get All Favorites
// =============================================
favoriteRouter.route("/").get(loginAuth, getUserFavorites);

export { favoriteRouter };
