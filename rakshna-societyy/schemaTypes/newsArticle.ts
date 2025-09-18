

import {defineField, defineType} from 'sanity'
import {Newspaper} from 'lucide-react'

export default defineType({
    name: 'newsArticle',
    title: 'News Article',
    type: 'document',
    icon: Newspaper,
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
            description: 'A unique URL part for the article (e.g., "my-first-article")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true, // Allows for better image cropping
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility.',
                },
            ],
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 3,
            description: 'A short summary of the article for previews.',
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent', // This is a rich text editor
            description: 'The main content of the article.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
})