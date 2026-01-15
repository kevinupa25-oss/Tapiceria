import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Trash2, Plus, ArrowLeft, Edit } from 'lucide-react';
import { useAuth } from './AuthContext';
import { Product } from './ProductCard';
import fondo1 from '../assets/fondo1.jpg';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (id: string, updatedProduct: Omit<Product, 'id'>) => void;
  onBack: () => void;
}

export function AdminPanel({ products, onAddProduct, onDeleteProduct, onEditProduct, onBack }: AdminPanelProps) {
  const { logout } = useAuth();
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    gama: 'media',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.gama && imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 400;
          const maxHeight = 400;
          let { width, height } = img;

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

          onAddProduct({
            ...newProduct,
            image: compressedDataUrl,
          });
          setNewProduct({
            name: '',
            gama: 'media',
            image: '',
          });
          setImageFile(null);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        console.error('Error leyendo la imagen');
      };
      reader.readAsDataURL(imageFile);
    } else {
      console.log('Faltan campos:', { name: newProduct.name, gama: newProduct.gama, imageFile: !!imageFile });
    }
  };

  const handleEditProduct = () => {
    if (editingProduct) {
      const { id, ...updatedProduct } = editingProduct;
      onEditProduct(id, updatedProduct);
      setEditingProduct(null);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondo1})` }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-black bg-opacity-70 p-4 rounded">
          <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
          <Button 
            variant="outline" 
            onClick={() => { logout(); onBack(); }}
            className="transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Regresar a página principal
          </Button>
        </div>

        {/* Agregar Producto */}
        <Card className="mb-8 bg-black bg-opacity-70">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Plus className="h-5 w-5 mr-2" />
              Agregar Nuevo Producto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Nombre del producto</label>
                <Input
                  placeholder="Nombre del producto"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="!bg-white placeholder:text-gray-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">GAMA</label>
                <Select value={newProduct.gama} onValueChange={(value: 'alta' | 'media' | 'baja') => setNewProduct({ ...newProduct, gama: value })}>
                  <SelectTrigger className="!bg-white text-black">
                    <SelectValue placeholder="Gama" />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-white">Imagen del producto</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <Button onClick={handleAddProduct} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Agregar Producto
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Productos */}
        <Card className="bg-black bg-opacity-70">
          <CardHeader>
            <CardTitle className="text-white">Productos Existentes</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-center text-gray-300">No hay productos. Agrega uno arriba.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
                    <div className="relative overflow-hidden rounded-lg mb-2 bg-gray-50" style={{ height: '350px' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="mb-2">
                      <p className="text-xs text-black uppercase tracking-wide font-semibold">Producto</p>
                      <h3 className="font-semibold text-black">{product.name}</h3>
                    </div>
                    <div>
                      <p className="text-xs text-black uppercase tracking-wide font-semibold">Gama</p>
                      <p className="text-sm text-black font-medium">{product.gama}</p>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDeleteProduct(product.id)}
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Editar Producto */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-black bg-opacity-70 max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-white">
                <Edit className="h-5 w-5 mr-2" />
                Editar Producto
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Nombre del producto</label>
                  <Input
                    placeholder="Nombre del producto"
                    value={editingProduct?.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct!, name: e.target.value })}
                    className="!bg-white placeholder:text-gray-500 !text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">GAMA</label>
                  <Select
                    value={editingProduct?.gama || 'media'}
                    onValueChange={(value: 'alta' | 'media' | 'baja') =>
                      setEditingProduct({ ...editingProduct!, gama: value })
                    }
                  >
                    <SelectTrigger className="!bg-white !text-black">
                      <SelectValue placeholder="Gama" />
                    </SelectTrigger>
                                        <SelectContent className="text-black">
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleEditProduct}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  Guardar Cambios
                </Button>
                <Button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsEditDialogOpen(false);
                  }}
                  variant="outline"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
