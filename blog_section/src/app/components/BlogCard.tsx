import { Link } from "react-router";
import { ArrowRight, Heart, Calendar } from "lucide-react";
import { BlogPost } from "../types/blog";
import { format } from "date-fns";

interface BlogCardProps {
  blog: BlogPost;
  featured?: boolean;
  variant?: "light" | "dark";
  compact?: boolean;
}

export function BlogCard({ blog, featured = false, variant = "light", compact = false }: BlogCardProps) {
  const publishedDate = new Date(blog.publishedAt);
  const formattedDate = format(publishedDate, "MMM d, yyyy");

  // Compact card for sidebar in editor's picks (right column)
  if (compact) {
    return (
      <Link to={`/blog/${blog.slug}`} className="flex gap-4 group">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded mb-1.5">
            {blog.tags[0]}
          </span>
          <h4 className="text-[15px] leading-snug group-hover:text-gray-500 transition-colors line-clamp-3">
            {blog.title}
          </h4>
        </div>
      </Link>
    );
  }

  // Dark variant card (for "Latest" section)
  if (variant === "dark") {
    return (
      <Link to={`/blog/${blog.slug}`} className="block group h-full">
        <div className="bg-[#111d33] rounded-xl overflow-hidden border border-[#1a2a45] hover:border-gray-600/40 transition-all duration-300 h-full flex flex-col">
          <div className="aspect-[4/3] overflow-hidden m-3 rounded-lg">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="px-4 pb-4 pt-1 flex-1 flex flex-col">
            <span className="inline-block text-[11px] bg-white/10 text-gray-300 px-2.5 py-1 rounded-full mb-2 self-start">
              {blog.tags[0]}
            </span>
            <h3 className="text-white text-[16px] leading-snug group-hover:text-gray-300 transition-colors line-clamp-2 mb-3 flex-1">
              {blog.title}
            </h3>
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px]">
                  {blog.author.name.charAt(0)}
                </div>
                <span className="text-xs text-gray-400">{blog.author.name}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {blog.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default light card
  return (
    <Link to={`/blog/${blog.slug}`} className="block group h-full">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <span className="inline-block text-xs text-gray-500 mb-2">{formattedDate}</span>
          <h3 className="text-lg leading-snug mb-2 group-hover:text-gray-500 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">{blog.author.name}</span>
            <span className="text-xs text-gray-400">{blog.readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
