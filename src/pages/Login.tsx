import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, Lock, Eye, EyeOff, Loader2, Github, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signInWithEmail, signInWithGoogle, signInWithGithub, resetPassword, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const returnTo = searchParams.get('returnTo') || '/';
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, navigate, searchParams]);

  // Show error from OAuth callback
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'callback_failed') {
      toast.error('Sign in failed. Please try again.');
    } else if (error === 'timeout') {
      toast.error('Sign in timed out. Please try again.');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please confirm your email before signing in. Check your inbox.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Welcome back!');
        const returnTo = searchParams.get('returnTo') || '/';
        navigate(returnTo, { replace: true });
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) toast.error(error.message);
  };

  const handleGithubLogin = async () => {
    const { error } = await signInWithGithub();
    if (error) toast.error(error.message);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(resetEmail);
      if (error) {
        toast.error(error.message);
      } else {
        setResetSent(true);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password Reset Form
  if (showResetForm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 max-w-md">
            <div className="text-center mb-8">
              <div className="w-fit mx-auto mb-4">
                <img src="/rakshna-logo.png" alt="RAKSHNA Logo" className="h-16 w-16" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Reset Password</h1>
              <p className="text-muted-foreground">We'll send you a reset link</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                {resetSent ? (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-green-800">Check Your Email</h2>
                    <p className="text-muted-foreground text-sm">
                      If an account exists for <strong>{resetEmail}</strong>, you'll receive a password reset link shortly.
                    </p>
                    <Button variant="outline" onClick={() => { setShowResetForm(false); setResetSent(false); }}>
                      Back to Login
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email Address</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setShowResetForm(false)}
                    >
                      Back to Login
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <div className="w-fit mx-auto mb-4">
              <img src="/rakshna-logo.png" alt="RAKSHNA Logo" className="h-16 w-16" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Secure Access Portal</h1>
            <p className="text-muted-foreground">Access your cybersecurity account</p>
          </div>

          <Tabs defaultValue="member" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="member" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Member Login
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="member">
              <Card>
                <CardHeader>
                  <CardTitle>Member Access</CardTitle>
                  <CardDescription>
                    Sign in to comment on blogs, like posts, and track your incident reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      className="w-full"
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGithubLogin}
                      className="w-full"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
                    </div>
                  </div>

                  {/* Email Login Form */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="member-email">Email Address</Label>
                      <Input 
                        id="member-email" 
                        type="email" 
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="member-password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="member-password" 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end text-sm">
                      <button
                        type="button"
                        onClick={() => setShowResetForm(true)}
                        className="text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing In...</>
                      ) : (
                        <><User className="mr-2 h-4 w-4" />Sign In</>
                      )}
                    </Button>
                  </form>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Register here
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator Access</CardTitle>
                  <CardDescription>
                    Administrative access for incident management and system oversight
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                    <div className="flex items-center gap-2 text-warning font-medium text-sm">
                      <Lock className="h-4 w-4" />
                      Restricted Access Area
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This area is restricted to authorized personnel only. All access is logged and monitored.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Administrator ID</Label>
                    <Input 
                      id="admin-username" 
                      placeholder="Enter your administrator ID"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Input 
                        id="admin-password" 
                        type={showAdminPassword ? "text" : "password"}
                        placeholder="Enter your admin password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                      >
                        {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-2fa">Two-Factor Authentication Code</Label>
                    <Input 
                      id="admin-2fa" 
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      required
                    />
                  </div>
                  
                  <Button className="w-full" variant="destructive">
                    <Shield className="mr-2 h-4 w-4" />
                    Access Admin Dashboard
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    Need admin access?{' '}
                    <a href="mailto:admin@cybersecure.gov" className="text-primary hover:underline">
                      Contact IT Security
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Security Notice */}
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-primary text-sm mb-1">Security Notice</h4>
                  <p className="text-xs text-muted-foreground">
                    Your session is secured with end-to-end encryption. Always log out completely when finished, 
                    especially on shared computers. Report any suspicious activity immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;