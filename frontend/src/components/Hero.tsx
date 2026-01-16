import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.jpg';
import heroBg from '../assets/imageninicio.webp';

const images = [img1, img2, img3];

// 👉 Textos rotativos
const texts = [
  <>
    <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
      Bienvenido a
      <span className="block text-orange-300">Proveedora de Tapiceros de Aguascalientes</span>
      Venta de Viniles y Telas
    </h1>
    <p className="text-lg lg:text-xl text-gray-200/90 max-w-2xl leading-relaxed">
      Descubre nuestra selección de viniles y telas de alto desempeño con acabados resistentes,
      listas para proyectos que buscan durabilidad y estilo.
    </p>
  </>,
  <>
    <h1 className="text-5xl lg:text-6xl font-serif text-amber-200 mb-8">
      Viniles, telas, hules y espuma
    </h1>
    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
      En todas las gamas: alta, media y económica.
    </p>
  </>,
  <>
    <h1 className="text-5xl lg:text-6xl font-serif text-blue-200 mb-8">
      Tapices automotrices tipo original
    </h1>
    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
      Calidad que respeta el diseño de fábrica, con acabados resistentes y duraderos.
    </p>
  </>,
  <>
    <h1 className="block text-5xl lg:text-6xl font-serif text-white mb-8">
      Materiales de alto desempeño
    </h1>
    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mt-8">
      Para tapicería y muebles, combinando resistencia y estilo.
    </p>
  </>,
  <>
    <h1 className="text-5xl lg:text-6xl font-serif text-green-200 mb-8">
      Tu aliado en viniles y telas
    </h1>
    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mt-8">
      Experiencia y surtido que marcan la diferencia.
    </p>
  </>,
  <>
    <h1 className="text-5xl lg:text-6xl font-serif text-pink-200 mb-8">
      Dobetina y materiales premium
    </h1>
    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mt-8">
      Dale a tus proyectos el toque original que merecen.
    </p>
  </>
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const intervalImg = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    const intervalText = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 9000); // 👉 cambia cada 9 segundos

    return () => {
      clearInterval(intervalImg);
      clearInterval(intervalText);
    };
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBg})` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 via-black/55 to-transparent z-[1]" />
      {/* Glows y grid sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-12 z-[1]">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orange-500 blur-[120px]" />
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-amber-300 blur-[120px]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0, rgba(255,255,255,0) 35%), radial-gradient(circle at 75% 10%, rgba(255,255,255,0.05) 0, rgba(255,255,255,0) 30%)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-[3]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto lado izquierdo */}
          <div className="space-y-12">
            {/* Bloque fijo de tendencias */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Tendencias 2025 · Viniles premium
            </div>

            {/* Texto dinámico */}
            <div
              key={currentText}
              className="transition-opacity duration-1000 ease-in-out space-y-8"
            >
              {texts[currentText]}
            </div>
          </div>

          {/* Carrusel lado derecho */}
          <div className="relative">
            <div className="relative z-10 w-full aspect-[5/4] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
              <ImageWithFallback
                src={images[currentImage]}
                alt="Viniles y telas para tapicería"
                className="w-full h-full object-cover transition-opacity duration-700 ease-out"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-6 -right-4 h-32 w-32 rounded-full bg-orange-400/40 blur-3xl" />
            <div className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
