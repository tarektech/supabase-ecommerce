import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { OrderType } from '@/types';
import toast from 'react-hot-toast';
import { getProfile, updateProfile, createProfile } from '@/db/profile';
import { getUserOrders } from '@/db/order';
import {
  isProfileAccessError,
  handleCommonErrors,
} from '@/utils/errorHandling';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  username: string;
  avatarUrl: string;
  createdAt: string | null;
  orders: OrderType[];
  loading: boolean;
  isSaving: boolean;
  setUsername: (username: string) => void;
  setAvatarUrl: (url: string) => void;
  saveProfile: () => Promise<void>;
}

export function useProfile(user: User | null): ProfileData {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Skip fetch if no user
    if (!user) return;

    // Fetch user profile and orders
    async function fetchUserData() {
      try {
        // Get user profile
        const { data: profile, error: profileError } = await getProfile(
          user?.id || ''
        );

        // If profile doesn't exist or there's a row-level security error, create a new profile
        if (profileError && isProfileAccessError(profileError)) {
          console.log(
            'Profile not found or RLS error, creating new profile...'
          );
          const { data: newProfile, error: createError } = await createProfile(
            user?.id || ''
          );

          if (createError) {
            if (createError.code === '42501') {
              // This is an RLS error
              toast.error(
                'Unable to create profile due to permissions. Please contact support.'
              );
              console.error(
                'RLS policy violation when creating profile:',
                createError
              );
            } else {
              handleCommonErrors(createError, {
                context: 'creating profile',
                showToast: true,
              });
            }
            // Don't redirect to sign-in for RLS errors, stay on profile page
            if (createError.code !== '42501') {
              navigate('/sign-in');
            }
          } else if (newProfile) {
            setUsername(newProfile.username || '');
            setAvatarUrl(newProfile.avatar_url || '');
            setCreatedAt(newProfile.created_at);
          }
        } else if (profileError) {
          handleCommonErrors(profileError, { context: 'fetching profile' });
        } else if (profile) {
          setUsername(profile.username || '');
          setAvatarUrl(profile.avatar_url || '');
          setCreatedAt(profile.created_at);
        }

        // Fetch user orders
        const { data: orderData, error: orderError } = await getUserOrders(
          user?.id || ''
        );

        if (orderError) {
          handleCommonErrors(orderError, {
            context: 'fetching orders',
            showToast: false,
            silentOnNoRows: true,
          });
        } else {
          setOrders((orderData as unknown as OrderType[]) || []);
        }
      } catch (error) {
        handleCommonErrors(error, { context: 'fetching user data' });
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user, navigate]);

  // Handle profile updates
  const saveProfile = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      const { error } = await updateProfile(user.id, {
        username,
        avatar_url: avatarUrl,
      });

      if (error) {
        handleCommonErrors(error, { context: 'updating profile' });
      } else {
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      handleCommonErrors(error, { context: 'updating profile' });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    username,
    avatarUrl,
    createdAt,
    orders,
    loading,
    isSaving,
    setUsername,
    setAvatarUrl,
    saveProfile,
  };
}
