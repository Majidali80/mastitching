    // types.ts
export interface ProductSizeOption {
  size: string;
  price: number;
}

export interface Product {
  _type: 'product';
  title: string;
  description: string;
  fabricType: string;
  materials: string[];
  dimensions: string;
  sizes: ProductSizeOption[];
  price: number;
  images: { _type: 'image'; asset: { _ref: string; _type: 'reference' } }[];
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
  reviews: { _type: 'review'; reviewText: string }[];
  stockQuantity: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
}

export interface Stitching {
  _type: 'stitching';
  stitchingImage: { _type: 'image'; asset: { _ref: string; _type: 'reference' } };
  stitchType: string;
  category: string;
  technique: string;
  stitchPattern: string;
  stitchingDescription: string;
  additionalOptions: string[];
  isCustomizable: boolean;
  priceAdjustment: number;
  availability: string;
  stitchingNotes: string;
  estimatedTime: string;
  shirtSizes: {
    length: number;
    armHole: number;
    shoulder: number;
    chest: number;
    waist: number;
    hips: number;
    daman: number;
    sleeves: number;
    cuff: number;
  };
  trouserSizes: {
    length: number;
    waist: number;
    hips: number;
    pancha: number;
  };
  uploadDesign: { _type: 'image'; asset: { _ref: string; _type: 'reference' } };
  uploadSizeChart: { _type: 'file'; asset: { _ref: string; _type: 'reference' } };
}
