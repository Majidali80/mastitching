// src/types/product.ts

import { StaticImageData } from "next/image";

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
}

export type cart = {
  id: number;
  title: string;
  image?: string | { url: string }; 
  slug: string;
  price: number;
  category: string;
  size: string;
  quantity: number;
  discount?: number;
  
};
