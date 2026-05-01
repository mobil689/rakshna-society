import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Heart, Linkedin, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import { hasLiked, toggleLike } from "@/utils/likes";
import { RelatedPosts } from "@/components/RelatedPosts";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { CommentSection } from "@/components/CommentSection";
import { toast } from "sonner";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sanityClient, sanityWriteClient } from "@/lib/sanityClient";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import type { BlogPost as BlogPostType } from "@/types/blog";
import { PortableText } from '@portabletext/react';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [blog, setBlog] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Zoom Image State
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const openImage = (imgSrc: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return; // Don't work on mobile phone layout
    setActiveImage(imgSrc);
    setIsImageOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setIsImageOpen(false);
    setZoomLevel(1);
    setActiveImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      if (!slug) return;
      try {
        const query = `*[_type == "blogPost" && slug.current == $slug][0] {
          "id": _id,
          "slug": slug.current,
          title,
          excerpt,
          content,
          "author": {
            "name": author.name,
            "role": author.role,
            "avatar": author.avatar.asset->url,
            "linkedin": author.linkedin
          },
          "coverImage": coverImage.asset->url,
          "gallery": gallery[].asset->url,
          publishedAt,
          readTime,
          likes,
          tags
        }`;
        const data = await sanityClient.fetch(query, { slug });
        if (data) {
          const safeData = {
            ...data,
            author: data.author || { name: 'Admin', role: 'Editor' },
            likes: data.likes || 0,
            tags: data.tags || [],
            publishedAt: data.publishedAt || new Date().toISOString()
          };
          setBlog(safeData);
          setLikeCount(safeData.likes);
          window.scrollTo(0, 0);

          // Check like status — use Supabase if logged in, localStorage otherwise
          if (user && slug) {
            try {
              const { data: likeData } = await supabase
                .from('likes')
                .select('id')
                .eq('user_id', user.id)
                .eq('blog_slug', slug)
                .maybeSingle();
              setLiked(!!likeData);
            } catch {
              setLiked(hasLiked(safeData.id));
            }
          } else {
            setLiked(hasLiked(safeData.id));
          }
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Failed to fetch individual blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slug, user]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-white" />; // Optionally wrap with a layout if required, but simple un-styled is fine until loaded
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-sm underline text-blue-600">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(blog.publishedAt);
  const formattedDate = format(publishedDate, "MMMM d, yyyy");

  const handleLike = async () => {
    // If user is authenticated, use Supabase for persistent cross-device likes
    if (isAuthenticated && user && slug) {
      const newLikedState = !liked;
      setLiked(newLikedState);
      setLikeCount((prev) => newLikedState ? prev + 1 : prev - 1);
      if (newLikedState) toast.success("Thanks for the like!");
      else toast.info("Like removed");

      try {
        if (newLikedState) {
          await supabase.from('likes').insert({
            user_id: user.id,
            blog_slug: slug,
          });
        } else {
          await supabase.from('likes').delete()
            .eq('user_id', user.id)
            .eq('blog_slug', slug);
        }
        // Also sync count to Sanity for display
        await sanityWriteClient
          .patch(blog.id)
          .set({ likes: newLikedState ? likeCount + 1 : Math.max(0, likeCount - 1) })
          .commit();
      } catch (error) {
        console.error('Failed to sync like:', error);
      }
    } else {
      // Fallback: localStorage for anonymous users
      const newLikedState = toggleLike(blog.id);
      setLiked(newLikedState);
      setLikeCount((prev) => newLikedState ? prev + 1 : prev - 1);
      if (newLikedState) toast.success("Thanks for the like!");
      else toast.info("Like removed");

      try {
        await sanityWriteClient
          .patch(blog.id)
          .set({ likes: newLikedState ? likeCount + 1 : Math.max(0, likeCount - 1) })
          .commit();
      } catch (error) {
        console.error('Failed to sync like to Sanity:', error);
      }
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-900"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      {/* Header bar */}
      <motion.div
        className="container mx-auto px-4 max-w-5xl py-4 flex items-center justify-between text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-1 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </button>
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
      </motion.div>

      {/* Title Section */}
      <header className="container mx-auto px-4 max-w-5xl pb-8">
        <motion.h1
          className="text-3xl md:text-[42px] leading-tight mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {blog.title}
        </motion.h1>
        <motion.div
          className="flex items-center justify-between flex-wrap gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm">
              {blog.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm">{blog.author.name}</p>
              <p className="text-xs text-gray-500">{blog.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.readTime} minutes</span>
          </div>
        </motion.div>
      </header>

      {/* Cover Image or Gallery */}
      <motion.div
        className="container mx-auto px-4 max-w-5xl mb-12"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        {blog.gallery && blog.gallery.length > 0 ? (
          <div className="relative aspect-[2/1] rounded-xl overflow-hidden group shadow-lg">
            {blog.gallery.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer md:cursor-zoom-in ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                onClick={() => openImage(image)}
              >
                <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
                <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                        <Maximize2 className="w-6 h-6 text-gray-900" />
                    </div>
                </div>
              </div>
            ))}
            
            {/* Carousel Controls */}
            {blog.gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide((prev) => (prev - 1 + blog.gallery!.length) % blog.gallery!.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide((prev) => (prev + 1) % blog.gallery!.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {blog.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div 
            className="relative aspect-[2/1] rounded-xl overflow-hidden shadow-lg group cursor-pointer md:cursor-zoom-in"
            onClick={() => openImage(blog.coverImage)}
          >
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
            <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Maximize2 className="w-6 h-6 text-gray-900" />
                </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Content with Sticky Sidebar */}
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block">
            <motion.div
              className="sticky top-20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex gap-2 mb-8">
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </a>
              </div>

              {/* In This Article */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3">In This Article</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{blog.excerpt}</p>
              </div>

              {/* Like Button */}
              <motion.button
                onClick={handleLike}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${
                  liked
                    ? "bg-gray-100 border-gray-300 text-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                <span>{likeCount}</span>
              </motion.button>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </aside>

          {/* Article Content */}
          <article>
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${
                  liked ? "bg-gray-100 border-gray-300 text-gray-800" : "border-gray-200 text-gray-600"
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                <span>{likeCount}</span>
              </button>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
              >
                <Linkedin className="w-4 h-4 text-gray-500" />
              </a>
            </div>

            <AnimateOnScroll>
              <div
                className="
                  [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:text-gray-700 [&_p]:leading-[1.8] [&_p]:mb-5 [&_p]:text-[16px]
                  [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6
                  [&_li]:text-gray-700 [&_li]:mb-2 [&_li]:text-[16px] [&_li]:leading-[1.8]
                  [&_blockquote]:border-l-[3px] [&_blockquote]:border-gray-400
                  [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:my-8
                  [&_blockquote]:text-gray-600 [&_blockquote]:text-lg
                  [&_figure]:my-10
                  [&_img]:rounded-lg [&_img]:w-full
                  [&_figcaption]:text-center [&_figcaption]:text-sm
                  [&_figcaption]:text-gray-500 [&_figcaption]:mt-3
                  [&_figcaption]:italic
                  [&_strong]:text-black
                "
              >
                <PortableText 
                  value={blog.content} 
                  components={{
                    types: {
                      image: ({ value }: any) => {
                        if (!value?.asset?._ref) {
                          return null;
                        }
                        const imgUrl = sanityClient.config().projectId 
                          ? `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${value.asset._ref.split('-')[1]}-${value.asset._ref.split('-')[2]}.${value.asset._ref.split('-')[3]}` 
                          : '';
                        return (
                          <figure className="my-10">
                            <img
                              src={imgUrl}
                              alt={value.alt || 'Blog inline image'}
                              className="rounded-lg w-full h-auto object-cover"
                              loading="lazy"
                            />
                            {value.caption && (
                              <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                                {value.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      }
                    }
                  }}
                />
              </div>
            </AnimateOnScroll>

            {/* Author Bio */}
            <AnimateOnScroll>
              <div className="mt-14 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white text-lg flex-shrink-0">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm mb-0.5">{blog.author.name}</p>
                    <p className="text-xs text-gray-500">{blog.author.role}, Rakshna Mait</p>
                  </div>
                  {blog.author.linkedin && (
                    <a
                      href={blog.author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Comments Section */}
            <AnimateOnScroll>
              {slug && <CommentSection blogSlug={slug} />}
            </AnimateOnScroll>
          </article>
        </div>
      </div>

      {/* Newsletter */}
      <div className="container mx-auto px-4 max-w-3xl py-16 md:py-20">
        <AnimateOnScroll>
          <NewsletterSubscribe />
        </AnimateOnScroll>
      </div>

      {/* Related Posts */}
      <AnimateOnScroll>
        {/* We pass an empty array temporarily or modify RelatedPosts to fetch its own data. 
            For now, RelatedPosts expects an array, so we pass [] to fix the missing mockBlogs reference. */}
        <RelatedPosts currentBlogId={blog.id} blogs={[]} currentTags={blog.tags} />
      </AnimateOnScroll>

      {/* Image Viewer Modal */}
      {isImageOpen && activeImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeImage}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-[110]">
            <button 
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="bg-black/50 text-white px-3 py-2 rounded-full text-sm font-medium min-w-[60px] text-center select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button 
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={closeImage}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="transition-transform duration-200 ease-out cursor-move"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img 
                src={activeImage}
                alt="Zoomed"
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}