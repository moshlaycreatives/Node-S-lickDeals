import { NotFoundException } from "../errors/index.js";

// ================================================
// * Middleware : Route Not Found
// ================================================
export const routeNotFound = (req, res) => {
  console.error("Route does not found.");
  throw new NotFoundException("Route does not found");
};
