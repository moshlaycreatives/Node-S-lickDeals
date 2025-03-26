import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import {
  addNewComment,
  getAllComments,
} from "../controllers/comments.controllers.js";

const commentRouter = Router();

// ADD NEW COMMENTS
commentRouter
  .route("/")
  .post(
    trimBodyObject,
    checkRequiredFields(["userId", "productId", "content"]),
    addNewComment
  );

// GET ALL COMMENTS
commentRouter.route("/:productId").get(getAllComments);

export { commentRouter };
