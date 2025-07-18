
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: any | null;
  loading: boolean;
  showOnboarding: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<{ error: any }>;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const { toast } = useToast();

  const updateProfile = async (profileData: any) => {
    if (!user) {
      return { error: 'No user logged in' };
    }
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', user.id);
      if (error) {
        toast({
          title: 'Update Failed',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }
      // Refresh profile
      const updatedProfile = await fetchUserProfile(user.id);
      setUserProfile(updatedProfile);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
        variant: 'default',
      });
      return { error: null };
    } catch (err: any) {
      toast({
        title: 'Update Failed',
        description: err.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { error: err };
    }
  };

  // existing code continues...

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.warn('Profile not found, might be a new user');
        return null;
      }
      
      return profile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const profile = await fetchUserProfile(session.user.id);
            if (mounted) {
              setUserProfile(profile);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (mounted) {
            setUserProfile(profile);
          }
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);


  const signUp = async (email: string, password: string, userData: any = {}) => {
    try {
      console.log('Attempting signup for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });
      
      console.log('Signup response:', { data, error });
      
      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // If user was created successfully, add initial credits
      if (data.user && !error) {
        console.log('User created, adding credits for:', data.user.id);
        try {
          const { error: creditsError } = await supabase
            .from('user_credits')
            .insert([
              {
                user_id: data.user.id,
                total_credits: 30,
                used_credits: 0
              }
            ]);
          
          if (creditsError) {
            console.error('Error creating user credits:', creditsError);
          } else {
            console.log('Successfully added 30 credits for new user');
          }
        } catch (creditsError) {
          console.error('Error inserting credits:', creditsError);
        }
      }
      
      toast({
        title: "Success!",
        description: "Account created successfully. Please check your email to confirm your account.",
        variant: "default",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Signup catch error:', error);
      toast({
        title: "Sign Up Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signin for:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Signin error:', error);
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Check if user needs onboarding
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('has_completed_onboarding')
          .eq('id', user?.id)
          .single();
        
        if (profile && !profile.has_completed_onboarding) {
          setShowOnboarding(true);
        }
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
          variant: "default",
        });
      }
      
      return { error };
    } catch (error: any) {
      console.error('Signin catch error:', error);
      toast({
        title: "Sign In Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    }
  };

  const completeOnboarding = async () => {
    if (!user) return;
    
    try {
      await supabase
        .from('user_profiles')
        .update({ has_completed_onboarding: true })
        .eq('id', user.id);
      
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserProfile(null);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Signout error:', error);
      toast({
        title: "Sign Out Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      userProfile,
      loading,
      showOnboarding,
      signUp,
      signIn,
      signOut,
      updateProfile,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
