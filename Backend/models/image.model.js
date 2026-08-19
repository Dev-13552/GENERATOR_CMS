import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    user_id: {
      required: [true, "User ID is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: {
      required: [true, "Prompt is required"],
      type: String,
    },
    image_url: {
      required: [true, "Image URL is required"],
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Image = mongoose.model("Image", imageSchema);