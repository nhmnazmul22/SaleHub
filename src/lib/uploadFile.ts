import cloudinary from "@/config/cloudinary";
import { nanoid } from "nanoid";

type UploadResponse = {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
};

/**
 * Upload images into cloudinary
 * @param file: string
 * @param fileType: string
 * @returns UploadResponse
 */
export const uploadImage = async (
  file: string,
  fileType: string = "products",
): Promise<UploadResponse> => {
  try {
    const uniquePublicId = `${fileType}-${nanoid(10)}`;

    const result = await cloudinary.uploader.upload(file, {
      folder: fileType,
      public_id: uniquePublicId,
      resource_type: "image",
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Image upload failed",
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
