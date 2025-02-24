import { groq } from "next-sanity";

export const productQuery = groq`*[_type == "product"]`;
export const stitchedProductsQuery = groq`*[_type == "stitching"]`;
export const stitchedProductQuery = groq`*[_type == "stitching" && slug.current == $slug][0]`; // sanity/lib/queries.ts
export const stitchingProductQuery = `*[_type == "stitching" && slug.current == $slug][0]{
  _id,
  _type,
  stitchingImage,
  stitchType,
  category,
  technique,
  stitchPattern,
  stitchingDescription,
  additionalOptions,
  isCustomizable,
  price,
  priceAdjustment,
  availability,
  stitchingNotes,
  estimatedTime,
  shirtSizes,
  trouserSizes,
  uploadDesign,
  uploadSizeChart,
  isBestSeller,
  rating,
  reviews,
  images,
  description,
  slug,
  title
}`;