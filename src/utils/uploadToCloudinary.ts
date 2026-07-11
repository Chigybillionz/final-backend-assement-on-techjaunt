import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "autolease/vehicles",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result!);
      },
    );

    stream.end(fileBuffer);
  });
};
