import React from 'react';
import bgLadrillos from '../assets/images/fondo.webp';


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


const workshopImage = "https://images.unsplash.com/photo-1778582384724-d6ce1dfe6df1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwc2lnbiUyMHdvcmtzaG9wJTIwaW5kdXN0cmlhbCUyMGRhcmslMjBjcmFmdHNtYW58ZW58MXx8fHwxNzkxMDAxMDY1fDA&ixlib=rb-4.1.0&q=85&w=1600";

export default function Nosotros() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@500;700;900&display=swap');
      `}</style>

      <main className="relative min-h-screen text-white font-['Rajdhani'] selection:bg-cyan-400 selection:text-black">
        
        
        <div 
          className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat transform-gpu"
          style={{ backgroundImage: `url(${bgLadrillos})` }}
        >
          <div className="absolute inset-0 bg-[#050508]/90"></div>
          
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,0,0,0.06)_0%,transparent_70%)] pointer-events-none"></div>
        </div>

        <div className="relative z-10 pt-24 pb-20">
          
         
          <section className="mx-auto grid max-w-[1440px] gap-14 px-4 pb-24 pt-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 md:px-8">
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
                Nacimos en un pequeño taller familiar, entre herramientas, cables y la obsesión por transformar ideas en
                luz. Hoy combinamos ese oficio artesanal con tecnología de precisión para crear piezas que definen
                espacios.
              </p>

              <blockquote className="mt-10 max-w-xl py-1 pl-7 border-l-4 border-red-500 shadow-[-10px_0_15px_-10px_rgba(255,0,0,0.2)]">
                <p className="font-['Orbitron'] text-sm md:text-base font-bold uppercase leading-relaxed tracking-wider text-white">
                  “No fabricamos neón en serie. Diseñamos la luz que hace único cada lugar.”
                </p>
                <footer className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">— Taller NeonFlex, 2018</footer>
              </blockquote>
            </div>

           
            <figure className="relative mx-auto w-full max-w-[570px] bg-[#111117]/80 backdrop-blur-md p-2 border border-white/5 rounded-sm shadow-2xl lg:mx-0 group">
              <div className="relative aspect-[4/4.7] overflow-hidden rounded-sm">
                <img
                  className="h-full w-full object-cover object-center grayscale opacity-80 filter saturate-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:saturate-100"
                  src={workshopImage}
                  alt="Artesano trabajando"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                  <div>
                    <p className="font-['Orbitron'] text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">HECHO A MANO</p>
                    <p className="mt-2 text-xs font-bold text-gray-400 tracking-widest uppercase">Buenos Aires · Argentina</p>
                  </div>
                  <span className="font-['Orbitron'] text-4xl font-black text-white/10 select-none">NFP</span>
                </div>
              </div>
            </figure>
          </section>

          
          <section className="relative border-t border-white/10 px-4 py-24 md:px-8">
            <div className="mx-auto max-w-[1440px]">
              
              <div className="mx-auto max-w-2xl text-center">
                <p className="font-['Orbitron'] text-[10px] font-bold tracking-[0.34em] text-red-500 uppercase">LO QUE NOS MUEVE</p>
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