import { useState, useEffect, lazy, Suspense } from 'react';
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const Especialidad = lazy(() => import('./components/Especialidad'));
const ProductGrid = lazy(() => import('./components/ProductGrid'));
const AllProductsPage = lazy(() => import('./components/AllProductsPage'));
const Location = lazy(() => import('./components/Location'));
const ShoppingCart = lazy(() => import('./components/ShoppingCart'));
const Footer = lazy(() => import('./components/Footer'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const SocialMediaFixed = lazy(() => import('./components/SocialMediaFixed'));
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { productsAPI } from './services/api';

// Placeholder images
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23f3f4f6" width="400" height="500"/%3E%3C/svg%3E';
const vinilImage = placeholderImage;

// Mock data for products (prices in Colombian Pesos)
const mockProducts: Product[] = [
  // Esponjas
  {
    id: 1,
    name: 'Esponja Alta Densidad 1"',
    brand: 'Esponjas',
    price: 25000,
    image: placeholderImage,
    rating: 4.5,
    reviews: 120,
    sizes: [],
    colors: ['Blanco'],
    category: 'Esponjas',
    description: 'Esponja de alta densidad ideal para tapicería profesional.',
    gama: 'alta' as const,
  },
  {
    id: 2,
    name: 'Esponja Alta Densidad 2"',
    brand: 'Esponjas',
    price: 35000,
    image: placeholderImage,
    rating: 4.6,
    reviews: 98,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Alta',
  },
  {
    id: 3,
    name: 'Esponja Alta Densidad 3"',
    brand: 'Esponjas',
    price: 45000,
    image: placeholderImage,
    rating: 4.7,
    reviews: 85,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Alta',
  },
  {
    id: 4,
    name: 'Esponja Media Densidad 1"',
    brand: 'Esponjas',
    price: 20000,
    image: placeholderImage,
    rating: 4.3,
    reviews: 75,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Media',
  },
  {
    id: 5,
    name: 'Esponja Media Densidad 2"',
    brand: 'Esponjas',
    price: 28000,
    image: placeholderImage,
    rating: 4.4,
    reviews: 92,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Media',
  },
  {
    id: 6,
    name: 'Esponja Suave 1"',
    brand: 'Esponjas',
    price: 18000,
    image: placeholderImage,
    rating: 4.2,
    reviews: 65,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Baja',
  },
  {
    id: 7,
    name: 'Esponja Suave 2"',
    brand: 'Esponjas',
    price: 24000,
    image: placeholderImage,
    rating: 4.3,
    reviews: 71,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Baja',
  },
  {
    id: 8,
    name: 'Esponja Extra Firme 2"',
    brand: 'Esponjas',
    price: 38000,
    image: placeholderImage,
    rating: 4.8,
    reviews: 110,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Alta',
  },
  {
    id: 9,
    name: 'Esponja Rebote Rápido 1.5"',
    brand: 'Esponjas',
    price: 32000,
    image: placeholderImage,
    rating: 4.6,
    reviews: 88,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Alta',
  },
  {
    id: 10,
    name: 'Esponja Rebote Rápido 3"',
    brand: 'Esponjas',
    price: 48000,
    image: placeholderImage,
    rating: 4.7,
    reviews: 95,
    sizes: [],
    colors: ['Blanco'],
    category: 'Gama Alta',
  },
  // Viniles
  {
    id: 11,
    name: 'Vinil Texturizado Beige',
    brand: 'Viniles',
    price: 55000,
    image: vinilImage,
    rating: 4.5,
    reviews: 142,
    sizes: [],
    colors: ['Beige'],
    category: 'Gama Alta',
  },
  {
    id: 12,
    name: 'Vinil Texturizado Negro',
    brand: 'Viniles',
    price: 55000,
    image: placeholderImage,
    rating: 4.6,
    reviews: 138,
    sizes: [],
    colors: ['Negro'],
    category: 'Gama Alta',
  }
];

export default function App() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'all-products' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Cargar productos desde la API
    const loadProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        if (data.length > 0) {
          setProducts(data.map((p: any) => ({ ...p, id: p._id })));
        } else {
          // Si no hay productos en la DB, usar mock data
          setProducts(mockProducts.map(p => ({ ...p, id: p.id.toString() })));
        }
      } catch (err) {
        console.error('Error cargando productos:', err);
        // Fallback a mock data
        setProducts(mockProducts.map(p => ({ ...p, id: p.id.toString() })));
      }
    };

    loadProducts();
    
    // Update page title
    document.title = 'PROVEEDORA DE TAPICEROS DE AGUASCALIENTES';
    
    // Listen to hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#todos-productos') {
        setCurrentPage('all-products');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddToCart = (product: Product, size: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item: CartItem) => item.id === product.id && item.size === size
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
    }

    toast.success(`${product.name} añadido al carrito`);
  };

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const savedProduct = await productsAPI.create(newProduct);
      setProducts([...products, { ...savedProduct, id: savedProduct._id }]);
      toast.success('Producto agregado');
    } catch (error) {
      console.error('Error agregando producto:', error);
      toast.error('Error al agregar producto');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await productsAPI.delete(id);
      setProducts(products.filter((p: Product) => p.id !== id));
      toast.success('Producto eliminado');
    } catch (error) {
      console.error('Error eliminando producto:', error);
      toast.error('Error al eliminar producto');
    }
  };

  const handleEditProduct = async (id: string, updatedProduct: Omit<Product, 'id'>) => {
    try {
      const savedProduct = await productsAPI.update(id, updatedProduct);
      setProducts(products.map(p => p.id === id ? { ...savedProduct, id: savedProduct._id } : p));
      toast.success('Producto actualizado');
    } catch (error) {
      console.error('Error actualizando producto:', error);
      toast.error('Error al actualizar producto');
    }
  };

  const handleUpdateQuantity = (id: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id, size);
      return;
    }

    const updatedItems = cartItems.map((item: CartItem) =>
      item.id === id && item.size === size
        ? { ...item, quantity }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (id: string, size: number) => {
    const updatedItems = cartItems.filter(
      (item: CartItem) => !(item.id === id && item.size === size)
    );
    setCartItems(updatedItems);
    toast.info('Producto eliminado del carrito');
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartItemsCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  // Si el usuario es admin
  if (user?.isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <div className="min-h-screen bg-white">
          <Header />
          <AdminPanel 
            products={products} 
            onBack={() => setCurrentPage('home')}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
          <Footer />
        </div>
      </Suspense>
    );
  }

  // Si estamos en la página de todos los productos
  if (currentPage === 'all-products') {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <div className="min-h-screen bg-white">
          <Header />
          
          <main>
              <AllProductsPage 
                products={products}
                onBack={handleBackToHome}
              />
            </main>

            <Footer />

            <ShoppingCart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />

            <SocialMediaFixed />

            <Toaster />
          </div>
      </Suspense>
    );
  }

  // Página principal
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <div className="min-h-screen bg-white">
        <Header />
          
          <main>
            <div id="inicio">
              <Hero />
            </div>
            <Especialidad />
            <AboutUs />
            <div id="productos">
              <ProductGrid 
                products={products}
                showAll={false}
              />
            </div>
            <Location />
          </main>

          <Footer />

          <ShoppingCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />

          <SocialMediaFixed />

          <Toaster />
        </div>
    </Suspense>
  );
}