import { groq } from "next-sanity";

// Use groq to define queries
export const Query = groq`*[_type == "product"]`;
export const productByIdQuery = groq`*[_type == "product" && _id == $id][0]`;
export const productsByCategoryQuery = groq`*[_type == "product" && category == $category]`;



 // Updated query to match schema
 export const allProductsQuery = groq`*[_type == "product"]{
  _id,
  title,
  price,
  "image": image.asset->url,
  "alt": image.alt,
  slug,
  discountPercentage,
  inventory,
  availability,
  category,
  sizes,
  colors,
  materials,
  dimensions,
  fabricType,
  customerReviews
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  price,
  "image": image.asset->url,
  "alt": image.alt,
  description,
  fabricType,
  materials,
  dimensions,
  sizes,
  tags,
  category,
  inventory,
  colors,
  discountPercentage,
  careInstructions,
  availability,
  customerReviews,
  dateAdded,
  shippingInformation,
  specialOffers,
  slug { current }
}`;


export const allPerfumesQuery = groq`*[_type == "perfume"]{
  _id,
  title,
  price,
  "image": image.asset->url,
  "alt": image.alt,
  slug,
  discountPercentage,
  inventory,
  availability,
  category,
  sizes,
  colors,
  scentNotes,
  bestSeller,
  customerReviews
}`;

export const perfumeBySlugQuery = groq`*[_type == "perfume" && slug.current == $slug][0] {
  _id,
  title,
  price,
  "image": image.asset->url,
  "alt": image.alt,
  description,
  sizes,
  category,
  inventory,
  colors,
  discountPercentage,
  availability,
  customerReviews,
  dateAdded,
  shippingInformation,
  specialOffers,
  scentNotes,
  bestSeller,
  slug { current }
}`;