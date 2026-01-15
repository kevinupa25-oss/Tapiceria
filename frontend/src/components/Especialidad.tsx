import { useState, useEffect } from 'react';
import fondo2 from '../assets/fondo2.jpg';
import arriba1 from '../assets/arriba1.jpg';
import arriba2 from '../assets/arriba2.jpg';
import arriba3 from '../assets/arriba3.jpg';
import abajo1 from '../assets/abajo1.jpg';
import abajo2 from '../assets/abajo2.jpg';
import abajo3 from '../assets/abajo3.jpg';

export function Especialidad() {
  const topImages = [arriba1, arriba2, arriba3];
  const bottomImages = [abajo1, abajo2, abajo3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topOffset, setTopOffset] = useState(-100);
  const [bottomOffset, setBottomOffset] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopOffset(0);
      setBottomOffset(0);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopOffset(100);
      setBottomOffset(-100);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % 3);
        setTopOffset(-100);
        setBottomOffset(100);
        setTimeout(() => {
          setTopOffset(0);
          setBottomOffset(0);
        }, 50);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="especialidad"
      className="relative overflow-hidden my-40 bg-cover bg-center text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${fondo2})` }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span style={{ color: '#d1a14a' }}>Nuestra</span>{' '}
            <span className="text-white">Especialidad</span>
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Más de 100 telas automotrices tipo original, incluyendo dobetina, para transformar tu auto con estilo.
          </p>
        </div>
        <div className="mt-16 relative overflow-hidden h-96">
          <img src={topImages[currentIndex]} alt="Imagen superior" className="absolute left-0 top-0 w-1/2 h-full object-cover transition-transform duration-1000 ease-in-out" style={{transform: `translateX(${topOffset}%)`}} />
          <img src={bottomImages[currentIndex]} alt="Imagen inferior" className="absolute right-0 top-0 w-1/2 h-full object-cover transition-transform duration-1000 ease-in-out" style={{transform: `translateX(${bottomOffset}%)`}} />
        </div>
      </div>
    </section>
  );
}