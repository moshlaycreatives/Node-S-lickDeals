import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../errors/index.js";
import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { ForgotPassword } from "../models/forgotPassword.model.js";
import { sendMail } from "../utils/sendEmail.util.js";

// =============================================
// 1. Register
// =============================================
export const register = async (req, res) => {
  const isUserNameExists = await User.findOne({
    where: { username: req.body.username },
  });

  if (isUserNameExists) {
    throw new ConflictException("Username already taken.");
  }

  const isEmailExists = await User.findOne({
    where: { email: req.body.email },
  });

  if (isEmailExists) {
    throw new ConflictException("Email already taken.");
  }

  await User.create(req.body);
  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "User register successfully.",
    })
  );
};

// =============================================
// 2. Login
// =============================================
export const login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    throw new NotFoundException("Invalid email/username or password.");
  }

  if (password !== user.password) {
    throw new BadRequestException("Invalid email/username or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Login successful.",
      data: { token },
    })
  );
};

// =============================================
// 3. Forgot Password
// =============================================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundException("User with this email not found.");
  }

  await ForgotPassword.destroy({ where: { userId: user.id } });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await ForgotPassword.create({ userId: user.id, otp, expiresAt });

  await sendMail({
    to: email,
    subject: "Forgot Password OTP",
    html: `You forgot password OTP is ${otp}, It will expires in 10 minutes.`,
  });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "OTP sent successfully.",
      data: { otp },
    })
  );
};

// =============================================
// 4. Verify Forgot Password OTP
// =============================================
export const verifyForgotPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundException("User with this email not found.");
  }

  const otpRecord = await ForgotPassword.findOne({
    where: { userId: user.id, otp, expiresAt: { [Op.gt]: new Date() } },
  });

  if (!otpRecord) {
    throw new BadRequestException("Invalid or expired OTP.");
  }

  user.isAbleToChangePassword = true;
  await user.save();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "OTP verified successfully.",
    })
  );
};

// =============================================
// 5. Reset Password
// =============================================
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundException("User with this email not found.");
  }

  if (!user.isAbleToChangePassword) {
    throw new BadRequestException("OTP verification required.");
  }

  user.password = newPassword;
  user.isAbleToChangePassword = false;
  await user.save();

  await ForgotPassword.destroy({ where: { userId: user.id } });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Password reset successfully.",
    })
  );
};
