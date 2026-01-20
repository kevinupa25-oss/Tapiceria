import { MessageCircle, Facebook, Instagram } from 'lucide-react';

export function SocialMediaFixed() {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/4491519829?text=${encodeURIComponent('Hola, me interesa atención más personalizada')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/proveedoradetapicerosdeaguascalientes"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Facebook"
      >
        <Facebook className="h-6 w-6" />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/proveedoratapiceriaags?igsh=MXhrcW5td2hvbjVkdw=="
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Instagram"
      >
        <Instagram className="h-6 w-6" />
      </a>
    </div>
  );
}
