import { Product } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface AllProductsPageProps {
  products: Product[];
  onBack: () => void;
}

export function AllProductsPage({ products, onBack }: AllProductsPageProps) {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
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
