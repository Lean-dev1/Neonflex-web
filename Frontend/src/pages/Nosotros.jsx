import React from 'react';

const Nosotros = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen">
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        {/* Encabezado con imagen de fondo (puedes cambiar la URL por una foto real del taller) */}
        <div className="h-64 bg-slate-900 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000')] bg-cover bg-center opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple relative z-10 drop-shadow-lg">
              Sobre Nosotros
            </h1>
        </div>

        <div className="p-8 space-y-6 text-gray-300 leading-relaxed text-lg">
          <p>
            <strong className="text-white text-xl">¡Hola! Somos Neon Flex.</strong> Un emprendimiento familiar nacido en Argentina, dedicado a iluminar tus espacios con la mejor tecnología LED y soluciones creativas.
          </p>
          <p>
            Lo que comenzó como un proyecto pequeño, hoy nos permite crear cartelería personalizada para comercios, eventos y decoraciones hogareñas, poniendo pasión en cada soldadura y en cada diseño.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 hover:border-neon-pink transition-colors">
              <h3 className="text-neon-pink font-bold text-xl mb-2">Nuestra Misión</h3>
              <p className="text-sm">Ofrecer cartelería de alta calidad, duradera y de bajo consumo, ayudando a que tu marca o tu rincón favorito brille con luz propia.</p>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 hover:border-neon-purple transition-colors">
              <h3 className="text-neon-purple font-bold text-xl mb-2">¿Por qué elegirnos?</h3>
              <p className="text-sm">Trato personalizado, diseños a medida y amor por los detalles. No somos una fábrica masiva, somos artesanos del neón.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;