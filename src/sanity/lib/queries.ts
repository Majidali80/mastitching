import { groq } from "next-sanity";

export const productQuery = groq`*[_type == "product"]`;
export const stitchedProductsQuery = groq`*[_type == "stitching"]`;
export const stitchedProductQuery = groq`*[_type == "stitching" && slug.current == $slug][0]`; 