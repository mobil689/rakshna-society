import { defineField, defineType } from 'sanity'
import { BookOpen } from 'lucide-react'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  // @ts-ignore
  icon: BookOpen,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Is Featured Post?',
      type: 'boolean',
      description: 'Check this to feature this post at the top of the blog page.',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      description: 'Add multiple images to create a scrolling carousel in the blog post.',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary for the blog cards.',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent', 
      description: 'The main body of the blog post.',
    }),
    defineField({
      name: 'author',
      title: 'Author Details',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
        { name: 'role', type: 'string', title: 'Role (e.g., Security Researcher)', validation: (Rule) => Rule.required() },
        { name: 'avatar', type: 'image', title: 'Avatar Image (Optional)' }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (Minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes.',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      // @ts-ignore
      of: [{ type: 'string' }],
      options: {
        layout: 'tags' // Makes it easy to type out multiple tags
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'likes',
      title: 'Initial Likes / Engagement Count',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    prepare(selection: any) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
