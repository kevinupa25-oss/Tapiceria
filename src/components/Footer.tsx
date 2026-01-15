import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Cross } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: 'Navegación',
      links: [
        { name: 'Inicio', href: '#inicio' },
        { name: 'Especialidad', href: '#especialidad' },
        { name: 'Enfoque', href: '#enfoque' },
        { name: 'Productos', href: '#productos' },
        { name: 'Ubicación', href: '#ubicacion' },
      ]
    },
    {
      title: 'Horario',
      links: [
        { name: 'Lunes a Viernes', href: '#' },
        { name: '9:00 AM - 6:00 PM', href: '#' },
        { name: 'Sábados', href: '#' },
        { name: '9:00 AM - 2:00 PM', href: '#' },
        { name: 'Domingos: Cerrado', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        
        {/* Primera fila: Proveedora + Fundadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Proveedora de Tapiceros */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Proveedora de Tapiceros de Aguascalientes</h2>
            <p className="text-gray-400 mt-2 max-w-md">
              Venta de viniles y telas de tapicería en Aguascalientes. 
              Descubre nuestra selección de viniles y telas de alto desempeño con acabados resistentes, listas para proyectos que buscan durabilidad y estilo.
            </p>
          </div>

          {/* Fundadores */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
  <h3 className="text-xl font-semibold text-yellow-400 flex items-center mb-4">
    <Users className="h-5 w-5 mr-2" />
    Nuestros Fundadores
  </h3>
  <blockquote className="text-gray-300 italic border-l-4 border-yellow-400 pl-4">
  “Fundado por el señor <span className="font-bold">JOSE LUIS MARQUEZ MUÑOZ</span>
  <span className="text-yellow-400 font-bold ml-2 mr-2">✟</span>
  y la señora <span className="font-bold">MARIA GUADALUPE LUGO</span>, con más de 40 años de experiencia en el rubro.”
</blockquote>


</div>

        </div>

        {/* Segunda fila: Contáctanos + Navegación y Horario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contáctanos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contáctanos</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">449 978 8321</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Jmarquezlugo@yahoo.com.mx</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Av. de los Maestros # 903, La España, CP 20210, Aguascalientes, Ags.</span>
              </div>
            </div>
          </div>

          {/* Navegación y Horario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
            <span>© 2025 Proveedora de Tapiceros de Aguascalientes. Todos los derechos reservados.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1">
              <a href="https://www.facebook.com/proveedoradetapicerosdeaguascalientes" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
