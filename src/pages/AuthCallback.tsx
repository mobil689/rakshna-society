import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

/**
 * OAuth Callback Handler
 * 
 * This page handles the redirect from Google/GitHub OAuth.
 * Supabase appends the auth tokens to the URL hash, and the
 * Supabase client automatically picks them up via `detectSessionInUrl`.
 * We just need to wait for the session to be established, then redirect.
 */
const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // The supabase client automatically handles the hash fragment
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          navigate('/login?error=callback_failed', { replace: true });
          return;
        }

        if (session) {
          // Successfully authenticated — go home
          navigate('/', { replace: true });
        } else {
          // No session yet, wait for onAuthStateChange to fire
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
              if (event === 'SIGNED_IN' && newSession) {
                subscription.unsubscribe();
                navigate('/', { replace: true });
              }
            }
          );

          // Timeout fallback — if nothing happens in 5 seconds, redirect to login
          setTimeout(() => {
            subscription.unsubscribe();
            navigate('/login?error=timeout', { replace: true });
          }, 5000);
        }
      } catch {
        navigate('/login?error=unknown', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
