import "express-async-errors";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { routeNotFound } from "./middlewares/routeNotFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { router } from "./routes/index.js";

// =============================================
// 1. Express Instance
// =============================================
const app = express();

// =============================================
// 2. Middlewares
// =============================================
app.use(morgan("dev"));
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// =============================================
// 3. Testing Route
// =============================================
app.route("/").get((req, res) => {
  return res.send(
    "<h1 style='display: flex; justify-content: center;  align-items: center; font-size:9rem; margin-top:10rem;'>Server is running.</h1>"
  );
});

// =============================================
// 4. Routes Setup
// =============================================
app.use("/api/v1", router);

// =============================================
// 5. Error Handling Middlewares
// =============================================
app.use(routeNotFound);
app.use(errorHandler);

export { app };
