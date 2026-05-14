import cloudinary from "@/config/cloudinary";
import { UploadResponse } from "@/types";

interface ErrorType {
  message: string;
  name: string;
  http_code: number;
}

/**
 * Upload images into cloudinary
 * @param file: string
 * @param fileType: string
 * @returns UploadResponse
 */
export const uploadImage = async (
  file: File,
  fileType = "products",
): Promise<UploadResponse> => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: fileType,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }

          resolve(result);
        },
      );

      stream.end(buffer);
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as ErrorType).message ?? "Image upload failed",
    };
  }
};

/**
 * Optimize delivery by resizing and applying auto-format and auto-quality
 * @param publicId: string,
 * @returns string
 */
export const optimizeUrl = (publicId: string): string => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto:best",
  });
};

/**
 * Transform the image: auto-crop to square aspect_ratio
 * @param publicId: string,
 * @param width: number,
 * @param height: number,
 * @returns string
 */
export const autoCropUrl = (
  publicId: string,
  width: number,
  height: number,
): string => {
  return cloudinary.url(publicId, {
    crop: "fill",
    gravity: "auto",
    width: width,
    height: height,
  });
};

/**
 * Image delete from cloudinary
 * @param publicId string
 * @returns Promise<any>
 */
export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
