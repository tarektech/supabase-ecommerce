import { supabase } from '../utils/supabase';
import { ProfileType } from '@/types';

export const profileService = {
  async getProfileById(userId: string): Promise<ProfileType | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('profile_id', userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching profile with id ${userId}:`, error);
      return null;
    }
  },

  async updateProfile(
    userId: string,
    profile: Partial<ProfileType>
  ): Promise<ProfileType | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('profile_id', userId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error(`Error updating profile with id ${userId}:`, error);
      return null;
    }
  },

  async createProfile(profile: ProfileType): Promise<ProfileType | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      return null;
    }
  },
};
