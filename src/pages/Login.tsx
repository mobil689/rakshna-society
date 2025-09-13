import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

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
                    Sign in to access your incident reports and training materials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="member-email">Email Address</Label>
                    <Input 
                      id="member-email" 
                      type="email" 
                      placeholder="your.email@company.com"
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
                  
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  
                  <Button className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Sign In to Member Portal
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline">
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