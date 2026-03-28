import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "../types/blog";

interface RelatedPostsProps {
  currentBlogId: string;
  blogs: BlogPost[];
  currentTags: string[];
}

export function RelatedPosts({ currentBlogId, blogs, currentTags }: RelatedPostsProps) {
  const relatedPosts = blogs
    .filter((blog) => blog.id !== currentBlogId)
    .map((blog) => {
      const sharedTags = blog.tags.filter((tag) => currentTags.includes(tag));
      return { blog, relevance: sharedTags.length };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3)
    .map(({ blog }) => blog);

  const postsToShow = relatedPosts.length > 0
    ? relatedPosts
    : blogs.filter((blog) => blog.id !== currentBlogId).slice(0, 3);

  if (postsToShow.length === 0) return null;

  return (
    <div className="py-16 md:py-20 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl">Continue Reading</h2>
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1 border border-gray-200 rounded-full px-4 py-2">
            Check all articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <p className="text-gray-500 text-sm mb-10">The latest handpicked blog articles</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {postsToShow.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="group block">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-[15px] leading-snug">
                    {blog.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}