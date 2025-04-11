import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import {
  addNewComment,
  getAllComments,
} from "../controllers/comments.controllers.js";

const commentRouter = Router();

// =============================================
// 1. Add New Comment
// =============================================
commentRouter
  .route("/")
  .post(
    trimBodyObject,
    checkRequiredFields(["userId", "productId", "content"]),
    addNewComment
  );

// =============================================
// 2. Get All Comments
// =============================================
commentRouter.route("/:productId").get(getAllComments);

export { commentRouter };
