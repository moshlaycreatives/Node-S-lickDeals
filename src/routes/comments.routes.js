import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import {
  addNewComment,
  getAllComments,
} from "../controllers/comments.controllers.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";

const commentRouter = Router();

// =============================================
// 1. Add New Comment
// =============================================
commentRouter
  .route("/")
  .post(
    loginAuth,
    trimBodyObject,
    checkRequiredFields(["userId", "productId", "content"]),
    addNewComment
  );

// =============================================
// 2. Get All Comments
// =============================================
commentRouter.route("/:productId").get(getAllComments);

export { commentRouter };
