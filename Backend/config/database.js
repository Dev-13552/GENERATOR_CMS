import mongoose from "mongoose";
import "dotenv/config";

export const dbConnect = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully");

    } catch (error) {
        console.log("Error in database connection -->",error);
    }
}

