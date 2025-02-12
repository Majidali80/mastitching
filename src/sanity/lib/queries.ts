
// const query = `*[_type == "product"]`;
// Fetch All Products

// const query = `*[_type == "product"]`;
// // Fetch Single Product by ID

// // const query = `*[_type == "product" && _id == $id][0]`;
// Fetch Products by Category

// const query = `*[_type == "product" && category == $category]`;
// Fetch Products with Size Options and Prices
import { defineQuery } from "next-sanity";
import { groq } from "next-sanity";
// sanity/queries.js

export const Query = `*[_type == "product"]`;
export const productByIdQuery = `*[_type == "product" && _id == $id][0]`;
export const productsByCategoryQuery = `*[_type == "product" && category == $category]`;

export const allProductsQuery = defineQuery(`*[_type == "product"]`)
// Fetch Products with Pagination (e.g., 10 products per page)

// const query = `*[_type == "product"] | order(_createdAt desc) [0...10]`;
// Fetch Products by Tag

// const query = `*[_type == "product" && tags match $tag]`;