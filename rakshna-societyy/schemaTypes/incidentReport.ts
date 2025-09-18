// in rakshna-societyy/schemaTypes/incidentReport.ts

import {defineField, defineType} from 'sanity'
import {AlertTriangle} from 'lucide-react'

export default defineType({
    name: 'incidentReport',
    title: 'Incident Report',
    type: 'document',
    icon: AlertTriangle,
    fields: [
        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            readOnly: true, // Data comes from the form, so it's not editable here
        }),
        defineField({
            name: 'emailAddress',
            title: 'Email Address',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'attackType',
            title: 'Type of Attack',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text', // 'text' is for longer blocks of text
            readOnly: true,
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    {title: 'New', value: 'new'},
                    {title: 'In Review', value: 'in_review'},
                    {title: 'Resolved', value: 'resolved'},
                ],
                layout: 'radio',
            },
            initialValue: 'new', // Default status for new reports
        }),
        defineField({
            name: 'evidenceFile',
            title: 'Evidence File',
            type: 'file',
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'fullName',
            subtitle: 'attackType',
            status: 'status',
        },
        prepare({title, subtitle, status}) {
            return {
                title: `${title} - ${subtitle}`,
                subtitle: `Status: ${status}`,
            }
        },
    },
})