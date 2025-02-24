import { defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: '_id',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'fabricType',
      title: 'Fabric Type',
      type: 'string',
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
    },
    {
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'string',
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
    },
    {
      name: 'customerReviews',
      title: 'Customer Reviews',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'dateAdded',
      title: 'Date Added',
      type: 'string',
    },
    {
      name: 'shippingInformation',
      title: 'Shipping Information',
      type: 'string',
    },
    {
      name: 'specialOffers',
      title: 'Special Offers',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'review' }],
    },
    {
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
    },
    {
      name: 'isNewArrival',
      title: 'Is New Arrival',
      type: 'boolean',
    },
    {
      name: 'isBestSeller',
      title: 'Is Best Seller',
      type: 'boolean',
    },
    {
      name: 'productName',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'sizeOption' }], // Ensure sizes is of type SizeOption[]
    },
  ],
}); 