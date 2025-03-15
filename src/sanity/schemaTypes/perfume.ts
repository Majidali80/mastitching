import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'perfume',
  title: 'Perfume',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Perfume Name',
      type: 'string',
      validation: (rule) => rule.required(), // Inferred as StringRule
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (rule) => rule.required(), // Inferred as SlugRule
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0), // Inferred as NumberRule
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sizeOption',
          title: 'Size Option',
          fields: [
            defineField({
              name: 'size',
              title: 'Size (ml)',
              type: 'string',
              validation: (rule) => rule.required(), // Inferred as StringRule
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (rule) => rule.required().min(0), // Inferred as NumberRule
            }),
          ],
        },
      ],
    }),
    defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true, // Enable hotspot for better image cropping
        },
      }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Floral', value: 'floral' },
          { title: 'Woody', value: 'woody' },
          { title: 'Oriental', value: 'oriental' },
          { title: 'Fresh', value: 'fresh' },
        ],
      },
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
      validation: (rule) => rule.required().min(0), // Inferred as NumberRule
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Discount percentage (e.g., 10 for 10% off)',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      validation: (rule) => rule.required(), // Inferred as StringRule
    }),
    defineField({
      name: 'customerReviews',
      title: 'Customer Reviews',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'datetime',
    }),
    defineField({
      name: 'shippingInformation',
      title: 'Shipping Information',
      type: 'text',
    }),
    defineField({
      name: 'specialOffers',
      title: 'Special Offers',
      type: 'text',
    }),
    defineField({
      name: 'scentNotes',
      title: 'Scent Notes',
      type: 'object',
      fields: [
        defineField({
          name: 'top',
          title: 'Top Notes',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'heart',
          title: 'Heart Notes',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'base',
          title: 'Base Notes',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'bestSeller',
      title: 'Best Seller',
      type: 'boolean',
      
    }),
  ],
});