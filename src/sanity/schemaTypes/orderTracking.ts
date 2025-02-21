import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'orderTracking',
  title: 'Order Tracking',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order Reference',
      type: 'reference',
      to: [{ type: 'order' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Current Status',
      type: 'string',
      options: {
        list: [
          'Order Placed',
          'Measurements Confirmed',
          'Fabric Selected',
          'Cutting Started',
          'Stitching In Progress',
          'First Fitting',
          'Alterations Required',
          'Final Fitting',
          'Quality Check',
          'Ready for Pickup/Delivery',
          'Delivered',
          'Alterations Requested',
          'Cancelled'
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tailorAssigned',
      title: 'Assigned Tailor',
      type: 'string',
    }),
    defineField({
      name: 'fittingAppointments',
      title: 'Fitting Appointments',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'appointmentType',
            title: 'Appointment Type',
            type: 'string',
            options: {
              list: ['First Fitting', 'Alterations', 'Final Fitting']
            }
          }),
          defineField({
            name: 'dateTime',
            title: 'Date and Time',
            type: 'datetime',
          }),
          defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
              list: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled']
            }
          }),
          defineField({
            name: 'notes',
            title: 'Fitting Notes',
            type: 'text',
          }),
        ],
      }],
    }),
    defineField({
      name: 'alterationDetails',
      title: 'Alteration Details',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
          }),
          defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
              list: ['Pending', 'In Progress', 'Completed']
            }
          }),
        ],
      }],
    }),
    defineField({
      name: 'qualityChecks',
      title: 'Quality Checks',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'checkDate',
            title: 'Check Date',
            type: 'datetime',
          }),
          defineField({
            name: 'checkedBy',
            title: 'Checked By',
            type: 'string',
          }),
          defineField({
            name: 'result',
            title: 'Result',
            type: 'string',
            options: {
              list: ['Passed', 'Needs Adjustment', 'Failed']
            }
          }),
          defineField({
            name: 'notes',
            title: 'Notes',
            type: 'text',
          }),
        ],
      }],
    }),
  ],
}); 