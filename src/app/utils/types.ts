export interface Product {
  _id: string;
  productName: string;
  title: string;
  slug: { current: string };
  description: string;
  price: number;
  discountPercentage: number;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  imageUrl: string;
  fabricType?: string;
  dimensions?: string;
  stockQuantity: number;
  reviews: { rating: number; comment: string }[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  sizes: { size: string; price: number }[];  // This will allow sizes with prices
  tags: string[];
  category: string;
  inventory: number;
  colors: string[];
  materials: string[];
  careInstructions: string;
  availability: string;
  customerReviews: string[];
  dateAdded: string;
  shippingInformation: string;
  specialOffers: string;
} 