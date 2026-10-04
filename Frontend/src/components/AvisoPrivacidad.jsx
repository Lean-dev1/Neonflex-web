import React, { useState, useEffect } from 'react';
import { FaCookieBite } from 'react-icons/fa';

const AvisoPrivacidad = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
   
    const consent = localStorage.getItem('neonflex_cookie_consent');
    
 
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
   
    localStorage.setItem('neonflex_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
   
    localStorage.setItem('neonflex_cookie_consent', 'rejected');
    setIsVisible(false);
  };

 
  if (!isVisible) return null;

  return (
    
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050508]/80 backdrop-blur-sm p-4 animate-fade-in-up">
      
      {/* Ventana modal centrada */}
      <div className="bg-[#0a0a0f] border border-white/10 p-8 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.8)] max-w-md w-full font-['Rajdhani'] text-center relative overflow-hidden">
        
        {/* Luz de fondo sutil */}
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-cyan-500/20 blur-[50px] pointer-events-none"></div>

        <div className="flex justify-center mb-5 relative z-10">
          <div className="w-12 h-12 bg-[#111117] border border-white/5 rounded-full flex items-center justify-center shadow-inner">
            <FaCookieBite className="text-cyan-400 text-xl drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]" />
          </div>
        </div>
        
        <h3 className="text-white font-['Orbitron'] font-bold text-lg tracking-widest uppercase mb-3 relative z-10">
          Privacidad y Cookies
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium relative z-10">
          Utilizamos cookies propias y de terceros para obtener datos estadísticos de tu navegación y mejorar tu experiencia en la web. Podés elegir aceptarlas o rechazarlas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <button 
            onClick={handleReject}
            className="flex-1 border border-white/20 hover:border-white/50 text-white font-bold font-['Orbitron'] py-3.5 rounded-sm text-xs tracking-widest uppercase transition-colors"
          >
            Rechazar
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-[#050508] font-bold font-['Orbitron'] py-3.5 rounded-sm text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvisoPrivacidad;