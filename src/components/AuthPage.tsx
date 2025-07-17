import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, Mail, Lock, User, Chrome, Twitter, Facebook,
  Sparkle, ShieldCheck, Key
} from 'lucide-react';

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { toast } = useToast();
  const [animationColors, setAnimationColors] = useState({
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-blue-400 to-indigo-500',
    accent: 'from-fuchsia-500 to-violet-500'
  });
  
  // Effect to periodically change background animation colors
  useEffect(() => {
    const colorSets = [
      {
        primary: 'from-purple-500 to-pink-500',
        secondary: 'from-blue-400 to-indigo-500',
        accent: 'from-fuchsia-500 to-violet-500'
      },
      {
        primary: 'from-cyan-400 to-blue-500',
        secondary: 'from-teal-400 to-emerald-500',
        accent: 'from-indigo-500 to-purple-600'
      },
      {
        primary: 'from-rose-500 to-orange-500',
        secondary: 'from-amber-400 to-yellow-500',
        accent: 'from-pink-500 to-rose-600'
      }
    ];
    
    let colorIndex = 0;
    const intervalId = setInterval(() => {
      colorIndex = (colorIndex + 1) % colorSets.length;
      setAnimationColors(colorSets[colorIndex]);
    }, 10000); // Change colors every 10 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'twitter' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-bg relative overflow-hidden p-4">
      {/* Dynamic animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br ${animationColors.primary} rounded-full blur-3xl animate-pulse-glow opacity-25`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-tr ${animationColors.secondary} rounded-full blur-2xl animate-pulse-glow opacity-20 delay-1000`}></div>
        <div className={`absolute top-3/4 left-1/3 w-48 h-48 bg-gradient-to-r ${animationColors.accent} rounded-full blur-xl animate-pulse-glow opacity-25 delay-700`}></div>
        
        {/* Subtle geometric shapes */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 border border-white/10 rounded-lg rotate-12 backdrop-blur-sm animate-float opacity-40"></div>
        <div className="absolute bottom-[20%] left-[15%] w-24 h-24 border border-white/10 rounded-full backdrop-blur-sm animate-float opacity-30 delay-500"></div>
        
        {/* Background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer"></div>
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border border-white/10 bg-card/80 backdrop-blur-md relative z-10 overflow-hidden">
        {/* Card inner glow effect */}
        <div className="absolute inset-0 bg-gradient-primary opacity-5 pointer-events-none"></div>
        
        {/* Card corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>
        
        <CardHeader className="text-center space-y-4 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center opacity-10 animate-rotate-slow"></div>
          
          <CardTitle className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent drop-shadow-sm flex items-center justify-center gap-2">
            <Sparkle className="h-6 w-6 animate-pulse text-primary-foreground opacity-75" />
            Konichiwa
            <Sparkle className="h-6 w-6 animate-pulse text-primary-foreground opacity-75" />
          </CardTitle>
          
          <p className="text-2xl font-medium bg-gradient-accent bg-clip-text text-transparent">
            こんにちは。ミズと申します
          </p>
          
          <CardDescription className="text-muted-foreground text-base px-6">
            Sign in to your account or create a new one to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative">
          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="signin" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-5">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-0.5 rounded-lg">
                <div className="bg-card/80 backdrop-blur-sm rounded-md p-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground/80 flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-card/50 border-muted/50 focus:border-primary/50 pl-3"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground/80 flex items-center gap-2">
                        <Key className="h-3.5 w-3.5" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-card/50 border-muted/50 focus:border-primary/50 pl-3"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="mr-2 h-4 w-4" />
                      )}
                      Sign In
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-5">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-0.5 rounded-lg">
                <div className="bg-card/80 backdrop-blur-sm rounded-md p-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground/80 flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        Full Name
                      </Label>
                      <div className="relative">
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-card/50 border-muted/50 focus:border-primary/50 pl-3"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground/80 flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-card/50 border-muted/50 focus:border-primary/50 pl-3"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground/80 flex items-center gap-2">
                        <Key className="h-3.5 w-3.5" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-card/50 border-muted/50 focus:border-primary/50 pl-3"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="mr-2 h-4 w-4" />
                      )}
                      Sign Up
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card/80 px-3 py-1 text-muted-foreground rounded-full backdrop-blur-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                className="border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                <Chrome className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('twitter')}
                className="border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
                className="border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;