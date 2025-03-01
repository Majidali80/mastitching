export interface Review {
    _type: 'review';
    reviewText: string;
    rating: number;
}

export interface Stitching {
    _id: string;
    _type: 'stitching';
    stitchingImage: { _type: 'image'; asset: { _ref: string; _type: 'reference' } };
    stitchType: string;
    category: string;
    technique: string;
    stitchPattern: string;
    stitchingDescription: string;
    additionalOptions: string[];
    isCustomizable: boolean;
    price: number;
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
    isBestSeller?: boolean;
    rating?: number;
    reviews?: Review[];
    images: string[];
    description: string;
    slug: { _type: 'slug'; current: string };
    title: string;
}
  