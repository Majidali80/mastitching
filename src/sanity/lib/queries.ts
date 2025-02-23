import { groq } from "next-sanity";

export const productQuery = groq`*[_type == "product"]`;

export const productByIdQuery = groq`*[_type == "product" && _id == $id][0]`;

export const stitchedProductQuery = groq`
 *[_type == "stitching"]`;


