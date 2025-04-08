import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ProfileCard } from '@/components/ProfileCard';
import { OrderCard } from '@/components/OrderCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyOrdersState } from '@/components/EmptyOrdersState';
import { useProfile } from '@/hooks/useProfile';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  // Get profile data from custom hook
  const {
    username,
    setUsername,
    avatarUrl,
    setAvatarUrl,
    createdAt,
    orders,
    loading,
    isSaving,
    saveProfile,
  } = useProfile(user);

  // Check authentication status
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
      if (!user) {
        navigate('/sign-in');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <ProfileCard
        user={user}
        username={username}
        setUsername={setUsername}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
        createdAt={createdAt}
        isSaving={isSaving}
        onSaveProfile={saveProfile}
        onSignOut={handleSignOut}
      />

      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {loading || authLoading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <EmptyOrdersState onBrowseProducts={() => navigate('/')} />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
