import { logger } from "../utils/logger";


export const errorHandler = (err, req, res, next) => {
  logger.error("Error: ", err.message);

  const message = err.message || "Internal server error";
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message
  });
};
