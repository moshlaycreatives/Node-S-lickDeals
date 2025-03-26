import { User } from "../models/user.model.js";

const username = process.env.ADMIN_USERNAME || "Admin";
const email = process.env.ADMIN_EMAIL || "admin@gmail.com";
const password = process.env.ADMIN_PASSWORD || "12345";

export const createAdmin = async () => {
  try {
    const isAdminExists = await User.findOne({ role: "admin" });
    if (!isAdminExists) {
      await User.create({ username, email, password, role: "admin" });
      console.info("Admin created successfully");
    }
  } catch (error) {
    console.error("An error occurred while creating admin.", error);
  }
};
