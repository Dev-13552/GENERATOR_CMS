import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    input_content: {
        type: String,
        required: true,
    },
    output_content: {
        type: String,
        required: true,
    },
    content_type: {
        type: String,
        required: [true, "Content type is required"],
        enum: {
        values: ["rewrite", "expand", "shorten", "generate", "seo-content"],
        message: "Invalid content type",
      }
    }
}, {timestamps: true})

export const Content = mongoose.model("Content", contentSchema);