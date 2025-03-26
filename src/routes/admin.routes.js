import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import {
  getAllUsers,
  getUserById,
  login,
} from "../controllers/admin.controllers.js";
import { loginAuth } from "../middlewares/loginAuth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const adminRouter = Router();

// ADMIN LOGIN + GET ALL USERS
adminRouter
  .route("/")
  .post(trimBodyObject, checkRequiredFields(["identifier", "password"]), login)
  .get(loginAuth, adminAuth, getAllUsers);

// GET USER BY ID
adminRouter.route("/:id").get(loginAuth, adminAuth, getUserById);
export { adminRouter };
