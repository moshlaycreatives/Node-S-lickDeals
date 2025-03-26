import { BadRequestException, NotFoundException } from "../errors/index.js";
import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

/* __________ LOGIN __________ */
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
