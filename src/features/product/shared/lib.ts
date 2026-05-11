import * as ProductRepository  from '@/features/product/server/product.repository';
import slugify from "slugify";

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
