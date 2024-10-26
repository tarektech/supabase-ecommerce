import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { Product } from '@/types'

function App() {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Classic T-Shirt",
      description: "A comfortable and versatile cotton t-shirt for everyday wear.",
      price: 19.99,
      image: "https://picsum.photos/seed/tshirt/300/200",
      category: "Clothing"
    },
    {
      id: 2,
      title: "Leather Watch",
      description: "Elegant leather strap watch with a minimalist design.",
      price: 89.99,
      image: "https://picsum.photos/seed/watch/300/200",
      category: "Accessories"
    },
    {
      id: 3,
      title: "Wireless Earbuds",
      description: "High-quality wireless earbuds with noise cancellation.",
      price: 129.99,
      image: "https://picsum.photos/seed/earbuds/300/200",
      category: "Electronics"
    },
    {
      id: 4,
      title: "Denim Jeans",
      description: "Classic blue denim jeans with a comfortable fit.",
      price: 59.99,
      image: "https://picsum.photos/seed/jeans/300/200",
      category: "Clothing"
    },
    {
      id: 5,
      title: "Sunglasses",
      description: "Stylish sunglasses with UV protection.",
      price: 39.99,
      image: "https://picsum.photos/seed/sunglasses/300/200",
      category: "Accessories"
    },
    {
      id: 6,
      title: "Smartphone",
      description: "Latest model smartphone with advanced features.",
      price: 699.99,
      image: "https://picsum.photos/seed/smartphone/300/200",
      category: "Electronics"
    },
    {
      id: 7,
      title: "Hooded Sweatshirt",
      description: "Warm and cozy hooded sweatshirt for chilly days.",
      price: 49.99,
      image: "https://picsum.photos/seed/hoodie/300/200",
      category: "Clothing"
    },
    {
      id: 8,
      title: "Backpack",
      description: "Durable and spacious backpack for everyday use.",
      price: 79.99,
      image: "https://picsum.photos/seed/backpack/300/200",
      category: "Accessories"
    },
    {
      id: 9,
      title: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with excellent sound quality.",
      price: 89.99,
      image: "https://picsum.photos/seed/speaker/300/200",
      category: "Electronics"
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 p-4">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
                  <p>{product.description}</p>
                  <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Button>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
