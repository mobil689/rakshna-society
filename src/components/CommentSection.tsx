import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Trash2, Loader2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Comment {
  id: string;
  user_id: string;
  blog_slug: string;
  display_name: string;
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  blogSlug: string;
}

const COOLDOWN_MS = 30_000; // 30 second cooldown between comments

export function CommentSection({ blogSlug }: CommentSectionProps) {
  const { user, isAuthenticated, displayName } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [lastCommentTime, setLastCommentTime] = useState(0);

  const fetchComments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_slug', blogSlug)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch comments:', error);
        return;
      }

      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setIsLoadingComments(false);
    }
  }, [blogSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast.error('Please sign in to comment');
      return;
    }

    const trimmedComment = newComment.trim();
    if (!trimmedComment) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (trimmedComment.length > 2000) {
      toast.error('Comment is too long (max 2000 characters)');
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastCommentTime < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastCommentTime)) / 1000);
      toast.error(`Please wait ${secondsLeft} seconds before commenting again`);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          user_id: user.id,
          blog_slug: blogSlug,
          display_name: displayName,
          content: trimmedComment,
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to post comment:', error);
        toast.error('Failed to post comment. Please try again.');
        return;
      }

      setComments((prev) => [data, ...prev]);
      setNewComment('');
      setLastCommentTime(Date.now());
      toast.success('Comment posted!');
    } catch (err) {
      console.error('Error posting comment:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user?.id); // RLS also enforces this, but belt-and-suspenders

      if (error) {
        console.error('Failed to delete comment:', error);
        toast.error('Failed to delete comment');
        return;
      }

      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success('Comment deleted');
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="mt-14 border-t pt-10">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments
        {comments.length > 0 && (
          <span className="text-sm font-normal text-gray-500">({comments.length})</span>
        )}
      </h3>

      {/* Comment Input */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm flex-shrink-0 mt-1">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 space-y-3">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="min-h-[80px] resize-none bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                maxLength={2000}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {newComment.length}/2000
                </span>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Posting...</>
                  ) : (
                    'Post Comment'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <p className="text-sm text-gray-600 mb-3">Sign in to join the conversation</p>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/login?returnTo=/blog/${blogSlug}`}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In to Comment
            </Link>
          </Button>
        </div>
      )}

      {/* Comments List */}
      {isLoadingComments ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-400">Loading comments...</span>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-1">
          {comments.map((comment) => (
            <div key={comment.id} className="group p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs flex-shrink-0">
                  {comment.display_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{comment.display_name}</span>
                    <span className="text-xs text-gray-400">
                      {format(new Date(comment.created_at), 'MMM d, yyyy · h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                </div>
                {/* Delete button — only visible for own comments */}
                {user?.id === comment.user_id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500"
                    title="Delete comment"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
