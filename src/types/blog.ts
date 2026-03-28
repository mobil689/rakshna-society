export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  coverImage: string;
  publishedAt: string;
  readTime: number;
  likes: number;
  tags: string[];
}
