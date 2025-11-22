import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventGallery',
  title: 'Event Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date of Event',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
      description: 'Upload as many images as you want for the carousel.'
    }),
    defineField({
      name: 'report',
      title: 'Event Report',
      type: 'blockContent', // This uses your existing rich text editor
      description: 'The full post-event report text.'
    }),
  ],
})