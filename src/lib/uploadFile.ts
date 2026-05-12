import cloudinary from "@/config/cloudinary";
import { nanoid } from "nanoid";

type UploadResponse = {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
};

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

// Optimize delivery by resizing and applying auto-format and auto-quality
export const optimizeUrl = (publicId: string): string => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto:best",
  });
};

// Transform the image: auto-crop to square aspect_ratio
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

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
