import { Router } from "express";
import { trimBodyObject } from "../middlewares/trimBodyObject.middleware.js";
import { checkRequiredFields } from "../middlewares/checkRequiredFields.middleware.js";
import { emailValidator } from "../middlewares/emailValidation.middleware.js";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyForgotPasswordOtp,
} from "../controllers/user.controllers.js";

const userRouter = Router();

// REGISTER
userRouter
  .route("/register")
  .post(
    trimBodyObject,
    checkRequiredFields(["username", "email", "password"]),
    emailValidator,
    register
  );

// LOGIN
userRouter
  .route("/login")
  .post(trimBodyObject, checkRequiredFields(["identifier", "password"]), login);

// FORGOT PASSWORD
userRouter
  .route("/forgot-password")
  .post(
    trimBodyObject,
    checkRequiredFields(["email"]),
    emailValidator,
    forgotPassword
  );

// VERIFY OTP
userRouter
  .route("/verify-forgot-otp")
  .patch(
    trimBodyObject,
    checkRequiredFields(["email", "otp"]),
    emailValidator,
    verifyForgotPasswordOtp
  );

// RESET PASSWORD
userRouter
  .route("/reset-password")
  .patch(
    trimBodyObject,
    checkRequiredFields(["email", "newPassword"]),
    emailValidator,
    resetPassword
  );
export { userRouter };
