import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { formatCurrency } from './utils/currency';

export interface Product {
  id: string;
  name: string;
  gama: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg bg-gray-50" style={{ height: '350px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { console.error('Image failed to load:', e.target.src); }}
          />
        </div>

        <div className="p-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500"><strong>Gama:</strong> {product.gama}</p>
            <p className="font-medium text-gray-900"><strong>Nombre del producto:</strong> {product.name}</p>
          </div>

          <Button
            onClick={() => window.open('https://wa.me/4499788321', '_blank')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Te interesa? Contactanos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
