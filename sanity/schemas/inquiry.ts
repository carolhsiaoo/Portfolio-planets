import { defineType, defineField } from 'sanity';

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'serviceTypes',
      title: 'Service Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Website Redesign', value: 'website-redesign' },
          { title: 'Creative Website Design', value: 'creative-design' },
          { title: 'Interactive Development', value: 'interactive-dev' },
          { title: 'CMS Setup & Integration', value: 'cms' },
          { title: 'Deployment & Launch', value: 'deployment' },
          { title: 'Full Package', value: 'full-package' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
});
