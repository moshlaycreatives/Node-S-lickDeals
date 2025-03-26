import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "../errors/index.js";

export const loginAuth = async (req, res, next) => {
  const token = req?.headers?.authorization;

  if (!token) {
    console.error("Token must be provided.");
    throw new NotFoundException("Token must be provided.");
  }

  let payload;
  try {
    payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  } catch (error) {
    console.error("Invalid token provided.", error);
    throw new UnauthorizedException(error.message);
  }

  const user = await User.findOne({ _id: payload.userId });

  if (!user) {
    console.error("User not found by provided token");
    throw new ForbiddenException("User not found by provided token");
  }

  req.userId = user.id;
  req.userRole = user.role;
  req.loggedInUser = user;

  next();
};
