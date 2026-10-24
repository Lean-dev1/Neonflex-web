import React, { useState, useEffect } from 'react';
import bgLadrillos from '../assets/images/pared.jpg';
import imagen1 from '../assets/images/diego4.png'
import imagen2 from '../assets/images/nosotros.png'
import imagen3 from '../assets/images/diego2.png'


function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 27S4.5 20.3 4.5 11.9A6.4 6.4 0 0 1 16 8a6.4 6.4 0 0 1 11.5 3.9C27.5 20.3 16 27 16 27Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 9.3c-1.7.8-2.6 2.3-2.4 4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M10.8 21c-2.1-1.6-3.4-4.1-3.4-6.9a8.6 8.6 0 1 1 13.8 6.9c-1.3.9-1.7 2-1.7 3.2h-7c0-1.2-.4-2.3-1.7-3.2Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12.7 27h6.6M12.5 24.2h7M16 2V.5M25.9 6.1 27 5M6.1 6.1 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ToolsIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="m18.5 11.8 8.8 8.8a2.8 2.8 0 0 1-4 4l-8.7-8.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18.6 9.2a6.7 6.7 0 0 1-8.3 8.4L4 23.9a2.2 2.2 0 0 1-3.1-3.1l6.3-6.3a6.7 6.7 0 0 1 8.4-8.3l-3.9 3.9.7 2.2 2.2.7 4-3.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m24.4 21.7 1.1 1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ValueCard({ number, icon, title, children }) {
  return (
    <article className="bg-[#111117]/80 backdrop-blur-md border border-white/5 p-8 rounded-sm group hover:border-cyan-400/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="text-gray-400 group-hover:text-cyan-400 transition-colors">{icon}</div>
        <span className="font-['Orbitron'] text-[10px] tracking-[0.25em] text-white/20 font-bold">{number}</span>
      </div>
      <div className="mt-10 h-px w-10 bg-cyan-400/50 transition-all duration-500 group-hover:w-16 group-hover:bg-cyan-400" />
      <h3 className="font-['Orbitron'] mt-6 text-base md:text-lg font-bold tracking-[0.04em] text-white uppercase">{title}</h3>
      <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-400 font-medium">{children}</p>
    </article>
  );
}

// Array con las imágenes para el carrusel (Podés agregar más URLs acá)
const workshopImages = [
  imagen1,
  imagen2, 
  imagen3
];

export default function Nosotros() {
  const [currentImg, setCurrentImg] = useState(0);

  // Auto-scroll del carrusel cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % workshopImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@500;700;900&display=swap');
      `}</style>

      <main className="relative min-h-screen text-white font-['Rajdhani'] selection:bg-cyan-400 selection:text-black">
        
        {/* Fondo Global */}
        <div 
          className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat transform-gpu"
          style={{ backgroundImage: `url(${bgLadrillos})` }}
        >
          <div className="absolute inset-0 bg-[#050508]/90"></div>
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,0,0,0.06)_0%,transparent_70%)] pointer-events-none"></div>
        </div>

        {/* Ajuste de margen superior (pt-40 md:pt-44) para respetar la nueva Navbar */}
        <div className="relative z-10 pt-40 md:pt-44 pb-20">
          
          <section className="mx-auto grid max-w-[1440px] gap-14 px-4 pb-24 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 md:px-8">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-[1px] w-10 bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                <p className="font-['Orbitron'] text-xs font-bold tracking-[0.34em] text-cyan-400 uppercase">NUESTRA HISTORIA</p>
              </div>

              <h1 className="font-['Orbitron'] max-w-3xl text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-tight tracking-tight">
                Más que carteles,
                <span className="block text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">creamos atmósferas</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-400 font-medium">
                Nacimos como un pequeño emprendimiento familiar, entre herramientas, cables y la obsesión por transformar ideas en
                realidad. Hoy combinamos este oficio artesanal con tecnología de precisión para crear piezas que resaltan la identidad de tu lugar.
              </p>

            
            </div>

            {/* Carrusel Deslizante Automático */}
            <figure className="relative mx-auto w-full max-w-[570px] bg-[#111117]/80 backdrop-blur-md p-2 border border-white/5 rounded-sm shadow-2xl lg:mx-0">
              <div className="relative aspect-[4/4.7] overflow-hidden rounded-sm bg-[#050508]">
                
                {/* Tira de imágenes que se desplaza en X */}
                <div 
                  className="flex h-full w-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentImg * 100}%)` }}
                >
                  {workshopImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Taller NeonFlex ${idx + 1}`}
                      loading="lazy"
                      className="h-full w-full shrink-0 object-cover object-center"
                    />
                  ))}
                </div>

                {/* Sombreado para que el texto resalte */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/20 to-transparent opacity-90 pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 z-10 pointer-events-none">
                  <div>
                    <p className="font-['Orbitron'] text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">HECHO A MANO</p>
                    <p className="mt-2 text-xs font-bold text-gray-300 tracking-widest uppercase">Buenos Aires · Argentina</p>
                  </div>
                  <span className="font-['Orbitron'] text-4xl font-black text-white/20 select-none">NFP</span>
                </div>

                {/* Puntitos indicadores del carrusel */}
                <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                  {workshopImages.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImg ? 'w-5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'w-1.5 bg-white/40'
                      }`} 
                    />
                  ))}
                </div>

              </div>
            </figure>
          </section>

          
          <section className="relative border-t border-white/10 px-4 py-24 md:px-8">
            <div className="mx-auto max-w-[1440px]">
              
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-['Orbitron'] mt-5 text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                  ¿Por qué elegirnos?
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-base md:text-lg leading-relaxed text-gray-400 font-medium">
                  Cada pieza reúne diseño, oficio y una tecnología pensada para acompañarte durante años.
                </p>
              </div>

              <div className="mt-16 grid gap-6 md:grid-cols-3">
                <ValueCard number="01" icon={<HeartIcon className="h-10 w-10" />} title="HECHO CON PASIÓN">
                  Cuidamos cada curva y cada unión como si la pieza fuera para nuestro propio espacio. Porque la diferencia vive en los detalles.
                </ValueCard>
                <ValueCard number="02" icon={<BulbIcon className="h-10 w-10" />} title="TECNOLOGÍA DURADERA">
                  LED premium de 12V, bajo consumo y materiales resistentes para una luz intensa, uniforme y preparada para durar años.
                </ValueCard>
                <ValueCard number="03" icon={<ToolsIcon className="h-10 w-10" />} title="PERSONALIZACIÓN TOTAL">
                  Desde el primer boceto hasta el último brillo: tu logo, tu frase o tu idea loca fabricada exactamente a la medida de tu pared.
                </ValueCard>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}