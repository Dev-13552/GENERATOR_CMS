import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "generated-ai-image" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      },
    ).end(buffer);
  });
};
