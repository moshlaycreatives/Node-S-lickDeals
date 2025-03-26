import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import { login } from "../controllers/admin.controllers.js";

const adminRouter = Router();

// ADMIN LOGIN
adminRouter
  .route("/")
  .post(trimBodyObject, checkRequiredFields(["identifier", "password"]), login);

export { adminRouter };
