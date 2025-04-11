import { BadRequestException, NotFoundException } from "../errors/index.js";
import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

// =============================================
// 1. Login
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
// 2. Get All Users
// =============================================
export const getAllUsers = async (req, res) => {
  const allUsers = await User.findAll({ where: { role: "user" } });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message:
        allUsers.length > 0
          ? "All users fetched successfully."
          : "Users collection is empty",
      data: allUsers,
    })
  );
};

// =============================================
// 3. Get User By Id
// =============================================
export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    throw new NotFoundException("Invalid user id");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "User fetched successfully.",
      data: user,
    })
  );
};
