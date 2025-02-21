import { Rule } from '@sanity/types';

const subscriber = {
  name: 'subscriber',
  title: 'Newsletter Subscribers',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
        ],
      },
      initialValue: 'active',
    },
  ],
  indexes: [
    {
      name: 'emailIndex',
      spec: {
        unique: true,
        fields: ['email'],
      },
    },
  ],
};

export default subscriber; 