import { defineType } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'object',
  fields: [
    {
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
  ],
}); 