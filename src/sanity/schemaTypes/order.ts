import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            }),
            defineField({
              name: 'selectedSize',
              title: 'Selected Size',
              type: 'string',
            }),
            defineField({
              name: 'priceAtTime',
              title: 'Price at Time of Order',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          'Pending',
          'Processing',
          'Shipped',
          'Delivered',
          'Cancelled',
          'Refunded',
        ],
      },
      initialValue: 'Pending',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postal Code', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),
    defineField({
      name: 'paymentInfo',
      title: 'Payment Information',
      type: 'object',
      fields: [
        defineField({
          name: 'method',
          title: 'Payment Method',
          type: 'string',
        }),
        defineField({
          name: 'status',
          title: 'Payment Status',
          type: 'string',
          options: {
            list: ['Pending', 'Completed', 'Failed', 'Refunded'],
          },
        }),
        defineField({
          name: 'transactionId',
          title: 'Transaction ID',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'subtotal',
      title: 'Subtotal',
      type: 'number',
    }),
    defineField({
      name: 'tax',
      title: 'Tax',
      type: 'number',
    }),
    defineField({
      name: 'shippingCost',
      title: 'Shipping Cost',
      type: 'number',
    }),
    defineField({
      name: 'total',
      title: 'Total',
      type: 'number',
    }),
    defineField({
      name: 'notes',
      title: 'Order Notes',
      type: 'text',
    }),
    defineField({
      name: 'trackingNumber',
      title: 'Tracking Number',
      type: 'string',
    }),
  ],
}); 