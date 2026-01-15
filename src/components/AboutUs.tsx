import { Award, Users, CheckCircle, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import fondo1 from '../assets/fondo1.jpg';
import sillon from '../assets/sillon.jpg';
import silla from '../assets/silla.jpg';
import sala from '../assets/sala.jpg';
import auto from '../assets/auto.jpg';

export function AboutUs() {
  const features = [
    {
      title: 'Sillones',
      description: 'Renueva tus sillones con nuestra variedad de telas resistentes y suaves, diseñadas para reflejar tu estilo único.',
      image: sillon
    },
    {
      title: 'Sillas',
      description: 'Haz que tus sillas hablen de ti: elige entre telas duraderas y diseños exclusivos.',
      image: silla
    },
    {
      title: 'Salas',
      description: 'Dale a tu sala un aire acogedor y distinguido con nuestros tapizados personalizados.',
      image: sala
    },
    {
      title: 'Automotriz',
      description: 'Disfruta de una experiencia sin complicaciones al personalizar tu vehículo con nuestras telas de calidad.',
      image: auto
    }
  ];

  return (
    <section
      id="enfoque"
      className="relative overflow-hidden pt-24 bg-cover bg-center text-white"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${fondo1})`,
        paddingBottom: '300px'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Enfoque</h2>
          <p className="text-4xl font-semibold max-w-2xl mx-auto text-center">
            <span style={{ color: '#d1a14a' }}>Donde Comienza la Tapicería:</span>{' '}
            <span className="text-white">Materiales que Inspiran</span>
          </p>



        </div>

       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
              style={{ 
                transform: index % 2 === 0 ? 'translateY(0)' : 'translateY(6rem)'
              }}
            >
              {/* Imagen del feature */}
              <div className="h-96 w-full overflow-hidden bg-gray-100">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-96 object-cover object-center hover:scale-110 transition-transform duration-300"
                  style={{ minHeight: '384px', maxHeight: '384px' }}
                />
              </div>
              
              {/* Contenido */}
              <div className="p-6">
                <h4 className="font-semibold mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
