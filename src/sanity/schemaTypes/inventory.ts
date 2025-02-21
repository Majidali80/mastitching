import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  fields: [
    defineField({
      name: 'materialType',
      title: 'Material Type',
      type: 'string',
      options: {
        list: [
          'Fabric',
          'Buttons',
          'Zippers',
          'Thread',
          'Lining',
          'Interfacing',
          'Elastic',
          'Hooks and Eyes',
          'Shoulder Pads',
        ],
      },
    }),
    defineField({
      name: 'fabricDetails',
      title: 'Fabric Details',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Fabric Type',
          type: 'string',
        }),
        defineField({
          name: 'color',
          title: 'Color',
          type: 'string',
        }),
        defineField({
          name: 'pattern',
          title: 'Pattern',
          type: 'string',
        }),
        defineField({
          name: 'width',
          title: 'Width (inches)',
          type: 'number',
        }),
        defineField({
          name: 'composition',
          title: 'Fabric Composition',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'currentStock',
      title: 'Current Stock',
      type: 'object',
      fields: [
        defineField({
          name: 'quantity',
          title: 'Quantity',
          type: 'number',
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: ['Meters', 'Yards', 'Pieces', 'Rolls', 'Spools', 'Packets']
          }
        }),
      ],
    }),
    defineField({
      name: 'stockLocation',
      title: 'Stock Location',
      type: 'object',
      fields: [
        defineField({
          name: 'warehouse',
          title: 'Warehouse',
          type: 'string',
        }),
        defineField({
          name: 'section',
          title: 'Section',
          type: 'string',
        }),
        defineField({
          name: 'shelf',
          title: 'Shelf',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'costDetails',
      title: 'Cost Details',
      type: 'object',
      fields: [
        defineField({
          name: 'purchasePrice',
          title: 'Purchase Price (per unit)',
          type: 'number',
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
        }),
        defineField({
          name: 'lastPurchaseDate',
          title: 'Last Purchase Date',
          type: 'date',
        }),
      ],
    }),
    defineField({
      name: 'supplier',
      title: 'Supplier Information',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Supplier Name',
          type: 'string',
        }),
        defineField({
          name: 'contactPerson',
          title: 'Contact Person',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'leadTime',
          title: 'Lead Time (days)',
          type: 'number',
        }),
        defineField({
          name: 'minimumOrderQuantity',
          title: 'Minimum Order Quantity',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'qualityGrade',
      title: 'Quality Grade',
      type: 'string',
      options: {
        list: ['Premium', 'Standard', 'Economy']
      },
    }),
    defineField({
      name: 'maintenanceNotes',
      title: 'Maintenance Notes',
      type: 'text',
    }),
  ],
}); 