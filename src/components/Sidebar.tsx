import { Home, Shirt, Watch, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const categories = [
  { name: 'All', icon: Home, href: '/' },
  { name: 'Clothing', icon: Shirt, href: '/clothing' },
  { name: 'Accessories', icon: Watch, href: '/accessories' },
  { name: 'Electronics', icon: Smartphone, href: '/electronics' },
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  // Filter categories based on authentication status
  const displayCategories = user
    ? categories
    : categories.filter((category) =>
        ['All', 'Clothing'].includes(category.name)
      );

  return (
    <aside
      className={cn(
        'w-64 h-screen p-4',
        'bg-background border-r border-border',
        'transition-colors duration-300'
      )}
    >
      <h2 className="text-xl font-bold mb-4 text-foreground">Categories</h2>
      <ul>
        {displayCategories.map((category) => {
          const isActive = location.pathname === category.href;
          return (
            <li key={category.name} className="mb-2 p-2">
              <Link
                to={category.href}
                className={cn(
                  'flex items-center',
                  'transition-colors duration-200',
                  isActive
                    ? 'text-foreground font-medium bg-muted rounded-md p-1'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <category.icon className="mr-2" size={20} />
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
