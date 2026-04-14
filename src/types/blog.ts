import type { PortableTextBlock } from '@portabletext/react';

export interface BlogPost {
  id: string; // Will map to Sanity's _id
  slug: string; // We'll project slug.current to string
  title: string;
  excerpt: string;
  content: PortableTextBlock[]; // Changed for Sanity Portable Text
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  coverImage: string; // Projected image URL string
  gallery?: string[]; // Array of image URLs
  publishedAt: string;
  readTime: number;
  likes: number;
  tags: string[];
}
