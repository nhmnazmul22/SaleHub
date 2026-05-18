import { uploadImage } from "@/lib/uploadFile";
import * as ProductRepository from "@/features/product/server/product.repository";
import slugify from "slugify";
import { UploadResponse } from "@/types";

export const generateUniqueSlug = async (name: string) => {
  const baseSlug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let count = 1;

  while (await ProductRepository.findOneByQuery({ slug })) {
    slug = `${baseSlug}-v${count}`;
    count++;
  }

  return slug;
};

export const uploadImageHelper = async (
  files: File | File[],
  fileType: string,
): Promise<UploadResponse | UploadResponse[]> => {
  if (!Array.isArray(files)) {
    return await uploadImage(files, fileType);
  }

  return await Promise.all(files.map((file) => uploadImage(file, fileType)));
};
