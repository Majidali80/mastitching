import { defineField, defineType } from 'sanity';


export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub Title',
      type: 'text',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'fabricType',
      title: 'Fabric Type',
      type: 'string',
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sizeOption',
          title: 'Size Option',
          fields: [
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
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
          { title: 'Men\'s', value: 'mens' },
          { title: 'Women\'s', value: 'womens' },
          { title: 'Unisex', value: 'unisex' },

        ],
      },
    }),
    
    defineField({
      name: 'subCategory',
      title: 'Sub-Category',
      type: 'string',
      options: {
        list: [
          // Scent Profile Sub-categories
          { title: 'Floral', value: 'floral' },
          { title: 'Woody', value: 'woody' },
          { title: 'Oriental', value: 'oriental' },
          { title: 'Citrus', value: 'citrus' },
          { title: 'Fruity', value: 'fruity' },
          { title: 'Aromatic', value: 'aromatic' },
          { title: 'Aquatic', value: 'aquatic' },
          { title: 'Gourmand', value: 'gourmand' },
 
    
      
        ],
      },
    }),

defineField({
      name: 'occasion',
      title: 'Occasion',
      type: 'string',
      options: {
        list: [
 // Occasion Sub-categories
          { title: 'Casual', value: 'casual' },
          { title: 'Evening', value: 'evening' },
          { title: 'Formal', value: 'formal' },
          { title: 'Special Occasion', value: 'special_occasion' },
          { title: 'Seasonal', value: 'seasonal' },
        ],
      },
    }),
    

defineField({
      name: 'usage_type',
      title: 'Usage Type',
      type: 'string',
      options: {
        list: [
 { title: 'Perfume Oils', value: 'perfume_oils' },
          { title: 'Sprays', value: 'sprays' },
          { title: 'Deodorants', value: 'deodorants' },
        ],
      },
    }),

defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: [
 { title: 'Luxury', value: 'luxury' },
          { title: 'Designer', value: 'designer' },
          { title: 'Niche', value: 'niche' },
          { title: 'Celebrity', value: 'celebrity' },
        ],
      },
    }),
    defineField({
      name: 'subcategory',
      title: 'Sub Category',
      type: 'string',
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
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
    }),
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
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
    
    // Adding slug field
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // Optional
      },
    }),
    
  ],
});
