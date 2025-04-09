import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileCardProps {
  user: User;
  username: string;
  setUsername: (value: string) => void;
  avatarUrl: string;
  setAvatarUrl: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  createdAt: string | null;
  isSaving: boolean;
  onSaveProfile: () => void;
  onSignOut: () => void;
}

export function ProfileCard({
  user,
  username,
  setUsername,
  avatarUrl,
  setAvatarUrl,
  email,
  setEmail,
  createdAt,
  isSaving,
  onSaveProfile,
  onSignOut,
}: ProfileCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-medium mb-4">Account Information</h3>
              <p className="text-muted-foreground mb-4">{user.email}</p>
            </div>
            <div>
              <p className="text-lg font-medium mb-4">
                {username
                  ? 'Your profile information'
                  : 'Please add your username'}
              </p>
              <p className="text-muted-foreground mb-4">
                {username || 'Please add your username'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/your-avatar.jpg"
              />
            </div>
          </div>

          <Button onClick={onSaveProfile} disabled={isSaving} className="mb-4">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>

          <div className="text-sm text-muted-foreground space-y-1">
            {createdAt && (
              <span className="block">
                Account created: {new Date(createdAt).toLocaleDateString()}
              </span>
            )}
            <span className="block">Profile ID: {user?.id}</span>
          </div>
        </div>
        <Button
          onClick={onSignOut}
          className="hover:bg-accent hover:text-accent-foreground"
        >
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
