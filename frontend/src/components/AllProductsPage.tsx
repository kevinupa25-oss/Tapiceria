import { Product } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import logoImage from '../assets/36963ed4c197182fca8efb263d04f9a3e1efe3f9.png';

interface AllProductsPageProps {
  products: Product[];
  onBack: () => void;
}

export function AllProductsPage({ products, onBack }: AllProductsPageProps) {
  return (
    <div>
      <div className="container mx-auto px-4 py-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logoImage} alt="Logo" className="h-12 w-auto object-contain" />
          <h2 className="text-2xl font-semibold">Todos los Productos</h2>
        </div>
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          Volver al Inicio
        </Button>
      </div>
      
      <ProductGrid 
        products={products}
        showAll={true}
      />
    </div>
  );
}
