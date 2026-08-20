import mongoose from "mongoose";
import "dotenv/config";
import { logger } from "../utils/logger";

export const dbConnect = async () => {
  try {

    if (mongoose.connection.readyState == 1) {
      logger.warn("Already Connected to database, disconnecting first");
      await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL);
    logger.info("Database Connected Successfully");

  } catch (error) {
    logger.error("Error in database connection -->", error);
  }
};
