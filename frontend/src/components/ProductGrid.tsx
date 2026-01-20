import { ProductCard, Product } from './ProductCard';
import { Button } from './ui/button';
import fondo2 from '../assets/fondo2.jpg';

// Placeholder image
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="120"%3E%3Crect fill="%23f3f4f6" width="400" height="120"/%3E%3Ctext x="200" y="60" text-anchor="middle" font-family="Arial" font-size="12" fill="%23999"%3EImagen no disponible%3C/text%3E%3C/svg%3E';

interface ProductGridProps {
  products: Product[];
  showAll?: boolean;
}

export function ProductGrid({ products, showAll = false }: ProductGridProps) {
  // Mostrar solo 8 productos si showAll es false
  const displayedProducts = showAll ? products : products.slice(0, 8);

  const handleVerMas = () => {
    window.location.hash = '#todos-productos';
  };

  return (
    <section
      id="productos"
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${fondo2})`}}
    >
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold">Nuestros Productos</h2>
            <p className="text-gray-100 mt-2">
              {showAll 
                ? `${products.length} producto${products.length !== 1 ? 's' : ''} disponible${products.length !== 1 ? 's' : ''}`
                : `Mostrando ${displayedProducts.length} de ${products.length} productos`
              }
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {showAll ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProducts.map((product) => (
              <div key={product.id} className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
                <div className="relative overflow-hidden rounded-lg mb-2 bg-gray-50" style={{ height: '350px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { 
                      console.error('Image failed to load:', e.target.src); 
                      (e.target as HTMLImageElement).src = placeholderImage;
                    }}
                  />
                </div>
                <div className="mb-2">
                  <p className="text-xs text-black uppercase tracking-wide font-semibold">Producto</p>
                  <h3 className="font-semibold text-black">{product.name}</h3>
                </div>
                <div>
                  <p className="text-xs text-black uppercase tracking-wide font-semibold">Gama</p>
                  <p className="text-sm text-black font-medium">{product.gama.toUpperCase()}</p>
                </div>
                <Button
                  onClick={() => window.open('https://wa.me/4499788321', '_blank')}
                  className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Te interesa? Contactanos
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {/* Botón Ver Más */}
        {!showAll && products.length > 8 && (
          <div className="flex justify-center" style={{ marginTop: '50px' }}>
            <Button 
              onClick={handleVerMas}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              Ver Todos los Productos ({products.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}