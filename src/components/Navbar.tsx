import { ShoppingCart, User, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { totalItems } = useCart();
  const { user } = useAuth();

  return (
    <nav className="bg-background shadow-md p-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">ShopClone</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            className="hover:bg-accent hover:text-accent-foreground"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
          <Link to="/cart">
            <Button className="hover:bg-accent hover:text-accent-foreground relative">
              <ShoppingCart className="mr-2" size={20} />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Link to={user ? '/profile' : '/sign-in'}>
            <Button className="hover:bg-accent hover:text-accent-foreground">
              <User className="mr-2" size={20} />
              {user ? 'Profile' : 'Sign In'}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
