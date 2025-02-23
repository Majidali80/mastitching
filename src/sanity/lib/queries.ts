import { groq } from "next-sanity";

export const productQuery = groq`*[_type == "product"]`;

export const productByIdQuery = groq`*[_type == "product" && _id == $id][0]`;

export const stitchedProductsQuery = groq`*[_type == "stitching"]`;



export const stitchedProductByIdQuery = groq`*[_type == "stitching" && _id == $id][0]`;
