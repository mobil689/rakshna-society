import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Heart, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { mockBlogs } from "@/data/mockBlogs";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ROTATE_INTERVAL = 5000;

export function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Editor's picks pool from filtered blogs
  const picksPool = filteredBlogs.slice(0, 4);

  // Latest always shows ALL blogs (not affected by tag filter), only search applies
  const latestBlogs = mockBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery, selectedTag]);

  useEffect(() => {
    if (picksPool.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % picksPool.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [picksPool.length]);

  const handlePickClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const featuredBlog = picksPool[activeIndex];
  const sidebarBlogs = picksPool.filter((_, i) => i !== activeIndex);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Editor's Picks */}
      <section className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            <h1 className="text-3xl md:text-4xl">Editor's picks</h1>
          </div>
          <p className="text-gray-400 text-sm mb-8 ml-5">Handpicked blogs by the Rakshna editorial team</p>
        </motion.div>

        {/* Featured Layout */}
        {filteredBlogs.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {/* Featured Post */}
            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait">
                {featuredBlog && (
                  <motion.div
                    key={featuredBlog.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link to={`/blog/${featuredBlog.slug}`} className="block group">
                      <div className="rounded-xl overflow-hidden">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl">
                          <img
                            src={featuredBlog.coverImage}
                            alt={featuredBlog.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-700"
                          />
                        </div>
                        <div className="pt-5">
                          <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-3">
                            {featuredBlog.tags[0]}
                          </span>
                          <h2 className="text-2xl md:text-[28px] leading-tight mb-3 group-hover:text-gray-500 transition-colors">
                            {featuredBlog.title}
                          </h2>
                          <p className="text-gray-500 text-[15px] leading-relaxed mb-4 line-clamp-2">
                            {featuredBlog.excerpt}
                          </p>
                          {/* Author / Likes / Date */}
                          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs">
                                {featuredBlog.author.name.charAt(0)}
                              </div>
                              <span className="text-sm text-gray-800">{featuredBlog.author.name}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5" />
                                {featuredBlog.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {format(new Date(featuredBlog.publishedAt), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress dots */}
              {picksPool.length > 1 && (
                <div className="flex gap-1.5 mt-5">
                  {picksPool.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePickClick(i)}
                      className="relative h-1.5 rounded-full overflow-hidden bg-gray-200 transition-all"
                      style={{ width: i === activeIndex ? 32 : 12 }}
                    >
                      {i === activeIndex && (
                        <motion.div
                          className="absolute inset-0 bg-blue-600 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: ROTATE_INTERVAL / 1000, ease: "linear" }}
                          style={{ transformOrigin: "left" }}
                          key={`progress-${activeIndex}-${Date.now()}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Posts */}
            {sidebarBlogs.length > 0 && (
              <div className="flex flex-col gap-5 justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sidebarBlogs.map(b => b.id).join("-")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    {sidebarBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => handlePickClick(picksPool.findIndex(b => b.id === blog.id))}
                        className="cursor-pointer"
                      >
                        <BlogCard blog={blog} compact />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 text-sm border border-gray-200 text-gray-600 rounded-full px-4 py-2 self-start hover:bg-gray-50 transition-colors mt-2"
                >
                  Show All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4 text-sm">No articles match your criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
              className="text-sm underline text-gray-600 hover:text-gray-900"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Latest Section — always visible */}
      {latestBlogs.length > 0 && (
        <section className="bg-[#0a1628] py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimateOnScroll>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-7 bg-blue-500 rounded-full" />
                  <h2 className="text-white text-3xl italic">Latest</h2>
                </div>
                <div className="relative p-[0px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border border-gray-700 rounded-full text-sm text-white placeholder:text-gray-500 outline-none focus:border-gray-500 transition-colors w-64 pl-[36px] pr-[16px] py-[8px]"
                  />
                </div>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestBlogs.map((blog, i) => (
                <AnimateOnScroll key={blog.id} delay={i * 0.08} direction="up">
                  <BlogCard blog={blog} variant="dark" />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="container mx-auto px-4 max-w-6xl py-16 md:py-20">
        <AnimateOnScroll>
          <NewsletterSubscribe />
        </AnimateOnScroll>
      </section>
      <Footer />
    </div>
  );
}
