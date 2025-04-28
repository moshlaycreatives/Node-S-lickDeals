import dotenv from "dotenv";
import https from "https";
import http from "http";
import fs from "fs";

import { app } from "./src/app.js";
import { connectDb, sequelize } from "./src/config/db.config.js";
import { createAdmin } from "./src/utils/createAdmin.util.js";
import setupAssociations from "./src/utils/associations.util.js";

// =============================================
// 1. Dot Env Configuration
// =============================================
dotenv.config();

// =============================================
// 2. Server Setup With Clustering
// =============================================
let server;
if (process.env.NODE_ENV === "PRODUCTION") {
  try {
    const privateKey = fs.readFileSync("./privkey.pem", "utf8");
    const certificate = fs.readFileSync("./fullchain.pem", "utf8");

    const options = {
      key: privateKey,
      cert: certificate,
    };
    server = https.createServer(options, app);
  } catch (err) {
    console.error("Error reading files:", err);
  }
} else {
  server = http.createServer(app);
}

// =============================================
// 3. Server Listening & DB Connection
// =============================================
const PORT = process.env.PORT || 8585;
(async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Server is running on port ${PORT}`);
      } else {
        console.info(`==> 🌎 Go to http://localhost:${PORT}`);
      }
    });
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
    await createAdmin();
    setupAssociations();
  } catch (error) {
    console.error("An error occurred while running server", error);
  }
})();
