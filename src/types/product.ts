// types.ts

export interface Product {
  _id: string;
  _type: 'product';
  title: string;
  description: string;
  fabricType: string;
  materials: string[];
  dimensions: string;
  price: number;
  images: { _type: 'image'; asset: { _ref: string; _type: 'reference' } }[];
  productImage?: { asset: { url: string } };
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
  slug: { _type: 'slug'; current: string };
  reviews: { _type: 'review'; reviewText: string; rating: number }[];
  stockQuantity: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  productName: string;
}

