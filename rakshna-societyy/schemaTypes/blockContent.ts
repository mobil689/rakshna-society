
import {defineType, defineArrayMember} from 'sanity'

export default defineType({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        defineArrayMember({
            title: 'Block',
            type: 'block',
            styles: [{title: 'Normal', value: 'normal'}],
            lists: [{title: 'Bullet', value: 'bullet'}],
            marks: {
                decorators: [
                    {title: 'Strong', value: 'strong'},
                    {title: 'Emphasis', value: 'em'},
                ],
            },
        }),
        defineArrayMember({
            type: 'image',
            options: {hotspot: true},
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility.',
                },
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                }
            ]
        }),
    ],
})