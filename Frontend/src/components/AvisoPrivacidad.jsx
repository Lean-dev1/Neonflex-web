import React, { useState, useEffect } from 'react';
import { safeStorage } from '../utils/storage'; // Importamos nuestro escudo

const CONSENT_KEY = 'neonflex_cookie_consent';

export default function AvisoPrivacidad() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Si safeStorage falla por modo incógnito, devuelve null y el cartel se muestra igual,
    // pero sin crashear la aplicación.
    if (!safeStorage.get(CONSENT_KEY)) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => { 
    safeStorage.set(CONSENT_KEY, 'accepted'); 
    setIsVisible(false); 
  };

  const handleReject = () => { 
    safeStorage.set(CONSENT_KEY, 'rejected'); 
    setIsVisible(false); 
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0f] border-t border-white/10 p-4 z-50 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-400">
        Usamos cookies para mejorar tu experiencia.
      </p>
      <div className="flex gap-3">
        <button onClick={handleReject} className="text-xs text-gray-500 hover:text-white transition-colors">
          Rechazar
        </button>
        <button onClick={handleAccept} className="bg-cyan-500 text-black text-xs font-bold px-4 py-2 rounded-sm hover:bg-cyan-400 transition-colors">
          Aceptar
        </button>
      </div>
    </div>
  );
}