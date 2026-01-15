import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';
import fondo1 from '../assets/fondo1.jpg';

export function Location() {
  return (
    <section
      id="ubicacion"
      className="relative overflow-hidden py-20 bg-cover bg-center text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${fondo1})` }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span style={{ color: '#d1a14a' }}>Nuestras</span>{' '}
            <span className="text-white">Ubicaciones</span>
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Visítanos en nuestras sucursales de Proveedora de Tapiceros de Aguascalientes en Aguascalientes, Fresnillo y Zacatecas. Estamos aquí para atenderte.
          </p>
        </div>

        {/* Bloque de mapas */}
        <div className="flex flex-row gap-8 mb-12 justify-center flex-wrap">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.8820922187865!2d-102.87554092468163!3d23.174503079067524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86830ba25f8ef239%3A0x4a1ee0d84d20bff!2sProveedora%20De%20Tapiceros!5e0!3m2!1ses-419!2smx!4v1768192107226!5m2!1ses-419!2smx"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Fresnillo"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#d1a14a' }}>Sucursal Fresnillo</h3>
              <p className="text-gray-700 text-sm">Proveedora De Tapiceros<br />Fresnillo, Zacatecas</p>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29614.59701941935!2d-102.32490178916012!3d21.902828000000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ee44d437a647%3A0xbb4db83f36216cc!2sPROVEEDORA%20DE%20TAPICEROS%20DE%20AGUASCALIENTES!5e0!3m2!1ses-419!2smx!4v1768192713006!5m2!1ses-419!2smx"
    width="100%"
    height="200"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Ubicación Aguascalientes"
  />
  <div className="p-4 text-center">
    <h3 className="text-lg font-semibold mb-2" style={{ color: '#d1a14a' }}>
      Sucursal Aguascalientes 2
    </h3>
    <p className="text-gray-700 text-sm">
      Calle Héroe de Nacozari Norte 2204<br />Aguascalientes, Ags.
    </p>
  </div>
</div>


          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29622.15913689002!2d-102.34592578916019!3d21.866409799999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ec282fded567%3A0x7153d0f4518d3671!2sProveedora%20de%20Tapiceros%20de%20Aguascalientes!5e0!3m2!1ses-419!2smx!4v1768192735457!5m2!1ses-419!2smx"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Centro"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#d1a14a' }}>Sucursal Aguascalientes</h3>
              <p className="text-gray-700 text-sm">Av. de los Maestros #903<br />La España, Aguascalientes</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
