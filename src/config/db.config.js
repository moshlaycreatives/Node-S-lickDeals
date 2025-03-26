import { Sequelize } from "sequelize";
const DB_NAME = process.env.DB_NAME || "silk_deals_replica_db";
const DB_USER_NAME = process.env.DB_USER_NAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

export const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
