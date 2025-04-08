import { supabase } from '@/utils/supabase';
import { ProfileType } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';
import { logError } from '@/utils/errorHandling';

interface ProfileResponse {
  data: ProfileType | null;
  error: PostgrestError | null;
}

export async function getProfile(userId: string): Promise<ProfileResponse> {
  const { data, error } = await supabase
    .from('profiles')
    .select('profile_id, username, avatar_url, created_at')
    .eq('profile_id', userId)
    .single();

  return { data, error };
}

export async function createProfile(userId: string): Promise<ProfileResponse> {
  const now = new Date().toISOString();

  try {
    // First attempt to create a profile
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        profile_id: userId,
        username: '',
        avatar_url: '',
        created_at: now,
      })
      .select('profile_id, username, avatar_url, created_at')
      .single();

    // If there's an error, check if it's an RLS policy violation
    if (error) {
      // Log the error but don't return it yet
      logError('creating profile', error);

      // Check if it's an RLS policy error (code 42501)
      if (error.code === '42501') {
        // If it's an RLS error, add a record to handle_profile_errors to be fixed later
        // This is just a workaround - in a real app, you would use admin/service role
        console.log(
          'RLS error encountered - will need to fix in Supabase dashboard'
        );

        // Return the error, but the profile page will handle it gracefully
        return { data: null, error };
      }

      return { data, error };
    }

    return { data, error };
  } catch (err) {
    logError('creating profile (unexpected)', err);
    return { data: null, error: err as PostgrestError };
  }
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<ProfileType, 'username' | 'avatar_url'>>
): Promise<ProfileResponse> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('profile_id', userId)
    .select('profile_id, username, avatar_url, created_at')
    .single();

  if (error) {
    logError('updating profile', error);
  }

  return { data, error };
}
