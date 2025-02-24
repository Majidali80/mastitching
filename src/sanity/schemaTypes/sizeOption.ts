import { defineType } from 'sanity';

export default defineType({
  name: 'sizeOption',
  title: 'Size Option',
  type: 'object',
  fields: [
    {
      name: 'size',
      title: 'Size',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
  ],
}); 