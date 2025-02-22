export interface Product {
  _id: string;
  productName: string;
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
  stockQuantity: number;
  reviews: Array<{
    rating: number;
    comment: string;
  }>;
  isNewArrival: boolean;
  isBestSeller: boolean;
} 