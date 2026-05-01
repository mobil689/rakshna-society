import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, User, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle, signInWithGithub } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-orange-500' };
    if (score <= 3) return { score: 3, label: 'Good', color: 'bg-yellow-500' };
    if (score <= 4) return { score: 4, label: 'Strong', color: 'bg-green-500' };
    return { score: 5, label: 'Very Strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!displayName.trim()) {
      toast.error('Display name is required');
      return;
    }

    setIsLoading(true);

    try {
      const { error, needsConfirmation } = await signUpWithEmail(email, password, displayName.trim());

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Try signing in instead.');
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (needsConfirmation) {
        setShowConfirmation(true);
      } else {
        toast.success('Account created successfully!');
        navigate('/');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await signInWithGoogle();
    if (error) toast.error(error.message);
  };

  const handleGithubSignUp = async () => {
    const { error } = await signInWithGithub();
    if (error) toast.error(error.message);
  };

  // Show confirmation screen after successful registration
  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">Check Your Email</h2>
                <p className="text-muted-foreground">
                  We've sent a confirmation link to <strong>{email}</strong>. 
                  Click the link in your email to activate your account.
                </p>
                <p className="text-sm text-muted-foreground">
                  Didn't receive it? Check your spam folder or try registering again.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/login">Go to Login</Link>
                </Button>
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
            <h1 className="text-3xl font-bold text-primary mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Join the Rakshna community</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Register
              </CardTitle>
              <CardDescription>
                Create an account to comment on blogs, like posts, and track your incident reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
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
                  onClick={handleGithubSignUp}
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
                  <span className="bg-card px-2 text-muted-foreground">or register with email</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Display Name *</Label>
                  <Input
                    id="register-name"
                    placeholder="How you'll appear to others"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    maxLength={50}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email Address *</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
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
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength.score
                                ? passwordStrength.color
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{passwordStrength.label}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="register-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {passwordsMatch && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                    {passwordsMismatch && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {passwordsMismatch && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !!passwordsMismatch}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-primary text-sm mb-1">Your Privacy Matters</h4>
                  <p className="text-xs text-muted-foreground">
                    Your email is only used for account verification and password recovery.
                    We never share your personal information with third parties.
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

export default Register;
