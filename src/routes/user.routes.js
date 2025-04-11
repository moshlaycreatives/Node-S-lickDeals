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

// =============================================
// 1. Register
// =============================================
userRouter
  .route("/register")
  .post(
    trimBodyObject,
    checkRequiredFields(["username", "email", "password"]),
    emailValidator,
    register
  );

// =============================================
// 2. Login
// =============================================
userRouter
  .route("/login")
  .post(trimBodyObject, checkRequiredFields(["identifier", "password"]), login);

// =============================================
// 3. Forgot Password
// =============================================
userRouter
  .route("/forgot-password")
  .post(
    trimBodyObject,
    checkRequiredFields(["email"]),
    emailValidator,
    forgotPassword
  );

// =============================================
// 4. Verify Forgot Password OTP
// =============================================
userRouter
  .route("/verify-forgot-otp")
  .patch(
    trimBodyObject,
    checkRequiredFields(["email", "otp"]),
    emailValidator,
    verifyForgotPasswordOtp
  );

// =============================================
// 5. Reset Password
// =============================================
userRouter
  .route("/reset-password")
  .patch(
    trimBodyObject,
    checkRequiredFields(["email", "newPassword"]),
    emailValidator,
    resetPassword
  );
export { userRouter };
