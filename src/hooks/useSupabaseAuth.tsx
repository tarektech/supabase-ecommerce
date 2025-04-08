import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createProfile } from '@/db/profile'; // Import createProfile function

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      // If user logs in, ensure they exist in our profiles table
      if (session?.user) {
        ensureUserProfile(session.user);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      // If we have a user, ensure they exist in our profiles table
      if (session?.user) {
        ensureUserProfile(session.user);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Ensure user exists in the profiles table
  const ensureUserProfile = async (user: User) => {
    try {
      // Check if user profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('profile_id')
        .eq('profile_id', user.id)
        .single();

      // Create profile if it doesn't exist yet
      if (!existingProfile || checkError) {
        // Use the dedicated createProfile function from db/profile.ts instead
        // which might have better error handling or service role access
        const { error: createError } = await createProfile(user.id);

        if (createError) {
          console.error('Error creating user profile:', createError);
          // Don't throw - we'll handle this on profile page visit
        }
      }
    } catch (error) {
      console.error('Error in ensureUserProfile:', error);
      // Don't throw - we'll handle this on profile page visit
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Signed in successfully');
    } catch (error) {
      toast.error('Failed to sign in');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      // If signup is successfully and we have a user, ensure profile exists
      if (data?.user) {
        await ensureUserProfile(data.user);
      }

      toast.success('Signed up successfully');
    } catch (error) {
      toast.error('Failed to sign up');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, session, loading, signIn, signUp, signOut };
}
