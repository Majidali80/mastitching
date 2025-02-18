// src/types/product.ts

export interface Product {
  discount(price: number, discount: number): unknown;
  _id: string;
  productName: string;
  title:string;
  image: {
    asset: {
      url: string;
    };
  };
  price: number;
  description: string;
  fabricType: string;
  materials: string[];
  dimensions: string;
  sizes: { size: string; price: number }[];
  tags: string[];
  category: string;
  inventory: number;
  colors: string[];
  discountPercentage: number;
  careInstructions: string;
  availability: string;
  customerReviews: string[];
  dateAdded: string;
  shippingInformation: string;
  specialOffers: string;
  slug: {
    _type: "slug";
    current: string;
  };
  reviews: { rating: number; comment: string }[];
  productImage?: string; // Make this field optional, or required if needed
  
    asset: {
      url: "/default-image.jpg", // Path to your default image
    },
  };


export type cart = {
  id: number;
  title: string;
  image: { asset: { url: string } };  // Matching structure with Product type
  slug: string;
  price: number;
  category: string;
  size: string;
  quantity: number;
  discountPercentage: number;
};