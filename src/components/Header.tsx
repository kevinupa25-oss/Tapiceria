import { useState } from 'react';
import { Menu, X, User, Package, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from './AuthContext';
import { AuthDialog } from './AuthDialog';
import { OrderTracking } from './OrderTracking';
import logoImage from '../assets/36963ed4c197182fca8efb263d04f9a3e1efe3f9.png';

interface HeaderProps {
}

export function Header() {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Especialidad', href: '#especialidad' },
    { name: 'Enfoque', href: '#enfoque' },
    { name: 'Productos', href: '#productos' },
    { name: 'Ubicación', href: '#ubicacion' },
  ];

  return (
    <header
      className="sticky top-0 z-50 shadow-sm border-b"
      style={{ backgroundColor: '#ffa500' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-8 md:py-10">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="Tapicería Logo"
              className="transition-transform duration-300 hover:scale-105"
              style={{ height: '1000px', maxHeight: '100px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Desktop Navigation */}
          {!user?.isAdmin && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110 font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}

          {/* Admin Menu */}
          {user?.isAdmin && (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          )}

          {/* User Menu & Mobile Menu */}
          {!user?.isAdmin && (
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="max-w-24 truncate">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => setIsTrackingOpen(true)}>
                      <Package className="h-4 w-4 mr-2" />
                      Seguir Pedidos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthOpen(true)}
                  className="hidden md:flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger className="md:hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    {!user?.isAdmin && navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg py-2 hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.querySelector(item.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                    
                    <div className="border-t pt-4 mt-4">
                      {user ? (
                        <div className="space-y-2">
                          <p className="font-medium">{user.name}</p>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsTrackingOpen(true)}
                          >
                            <Package className="h-4 w-4 mr-2" />
                            Seguir Pedidos
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={logout}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setIsAuthOpen(true)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Iniciar Sesión
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Order Tracking Dialog */}
      <OrderTracking
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </header>
  );
}
