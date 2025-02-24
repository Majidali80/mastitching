import { defineType } from 'sanity';

export default defineType({
  name: 'stitching',
  title: 'Stitching',
  type: 'document',
  fields: [
    {
      name: '_id',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'stitchType',
      title: 'Stitch Type',
      type: 'string',
    },
    {
      name: 'stitchingImage',
      title: 'Stitching Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'priceAdjustment',
      title: 'Price Adjustment',
      type: 'number',
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
    },
    {
      name: 'stitchingNotes',
      title: 'Stitching Notes',
      type: 'text',
    },
    {
      name: 'estimatedTime',
      title: 'Estimated Time',
      type: 'string',
    },
    {
      name: 'shirtSizes',
      title: 'Shirt Sizes',
      type: 'object',
      fields: [
        { name: 'length', title: 'Length', type: 'number' },
        { name: 'armHole', title: 'Arm Hole', type: 'number' },
        { name: 'shoulder', title: 'Shoulder', type: 'number' },
        { name: 'chest', title: 'Chest', type: 'number' },
        { name: 'waist', title: 'Waist', type: 'number' },
        { name: 'hips', title: 'Hips', type: 'number' },
        { name: 'daman', title: 'Daman', type: 'number' },
        { name: 'sleeves', title: 'Sleeves', type: 'number' },
        { name: 'cuff', title: 'Cuff', type: 'number' },
      ],
    },
    {
      name: 'trouserSizes',
      title: 'Trouser Sizes',
      type: 'object',
      fields: [
        { name: 'length', title: 'Length', type: 'number' },
        { name: 'waist', title: 'Waist', type: 'number' },
        { name: 'hips', title: 'Hips', type: 'number' },
        { name: 'pancha', title: 'Pancha', type: 'number' },
      ],
    },
    {
      name: 'uploadDesign',
      title: 'Upload Design',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'uploadSizeChart',
      title: 'Upload Size Chart',
      type: 'file',
    },
    {
      name: 'isBestSeller',
      title: 'Is Best Seller',
      type: 'boolean',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'review' }],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}); 