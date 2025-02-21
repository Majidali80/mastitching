import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'addresses',
      title: 'Addresses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Address Type',
              type: 'string',
              options: {
                list: ['Home', 'Work', 'Other'],
              },
            }),
            defineField({
              name: 'street',
              title: 'Street Address',
              type: 'string',
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
            }),
            defineField({
              name: 'state',
              title: 'State',
              type: 'string',
            }),
            defineField({
              name: 'postalCode',
              title: 'Postal Code',
              type: 'string',
            }),
            defineField({
              name: 'country',
              title: 'Country',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'dateJoined',
      title: 'Date Joined',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'measurements',
      title: 'Measurements',
      type: 'object',
      fields: [
        defineField({ name: 'chest', title: 'Chest', type: 'string' }),
        defineField({ name: 'waist', title: 'Waist', type: 'string' }),
        defineField({ name: 'hips', title: 'Hips', type: 'string' }),
        defineField({ name: 'inseam', title: 'Inseam', type: 'string' }),
        defineField({ name: 'shoulder', title: 'Shoulder', type: 'string' }),
        defineField({ name: 'armLength', title: 'Arm Length', type: 'string' }),
      ],
    }),
    defineField({
      name: 'orderHistory',
      title: 'Order History',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'order' }] }],
    }),
  ],
}); 