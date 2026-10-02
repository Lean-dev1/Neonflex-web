import React from 'react';
import { FaHandHoldingHeart, FaLightbulb, FaTools } from 'react-icons/fa';

const tallerImg = "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-white font-sans transition-colors duration-300">
      
      {/* --- HISTORIA --- */}
      <div className="max-w-7xl mx-auto py-20 px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-in-up">
           <span className="text-neon-blue font-bold tracking-widest uppercase text-sm mb-2 block">Nuestra Historia</span>
           <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            Más que carteles, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-red">creamos atmósferas.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-neutral-400 mb-6 leading-relaxed">
            Somos un emprendimiento familiar apasionado por la luz y el diseño. Lo que empezó en el taller de Diego como una curiosidad por la tecnología LED, se transformó en <strong>Neon Flex</strong>.
          </p>
          <p className="text-lg text-gray-600 dark:text-neutral-400 leading-relaxed border-l-4 border-neon-red pl-6 bg-gray-50 dark:bg-transparent py-2">
            "Cada pieza que hacemos es única, fabricada a mano con atención obsesiva al detalle, combinando la artesanía tradicional con la tecnología de impresión 3D más moderna."
          </p>
        </div>
        
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue via-transparent to-neon-red rounded-2xl blur-2xl opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-2xl h-[400px]">
                <img 
                    src={tallerImg} 
                    alt="Nuestro Taller" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
            </div>
        </div>
      </div>

      {/* --- VALORES --- */}
      <div className="bg-gray-50 dark:bg-neutral-900 py-20 border-y border-gray-200 dark:border-neutral-800 relative overflow-hidden transition-colors duration-300">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/10 dark:bg-neon-blue/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-red/10 dark:bg-neon-red/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">¿Por qué elegirnos?</h2>
            
             <div className="grid md:grid-cols-3 gap-8 text-center">
              
              <div className="p-8 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-neon-red dark:hover:border-neon-red transition-all shadow-lg group hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-neon-red/10 transition-colors">
                    <FaHandHoldingHeart size={35} className="text-gray-400 dark:text-neutral-400 group-hover:text-neon-red transition-colors"/>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Hecho con Pasión</h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">No somos una fábrica masiva. Somos artesanos que cuidamos cada curva del neón y cada soldadura.</p>
              </div>

              <div className="p-8 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-neon-blue dark:hover:border-neon-blue transition-all shadow-lg group hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-neon-blue/10 transition-colors">
                    <FaLightbulb size={35} className="text-gray-400 dark:text-neutral-400 group-hover:text-neon-blue transition-colors"/>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Tecnología Duradera</h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">Usamos tiras LED de 12V de alta eficiencia. Brillan más, consumen menos y duran años encendidas.</p>
              </div>

               <div className="p-8 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all shadow-lg group hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/10 transition-colors">
                    <FaTools size={35} className="text-gray-400 dark:text-neutral-400 group-hover:text-purple-500 transition-colors"/>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Personalización Total</h3>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">Si puedes dibujarlo, podemos hacerlo neón. Tu logo, tu frase, tu idea loca... la hacemos luz.</p>
              </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;