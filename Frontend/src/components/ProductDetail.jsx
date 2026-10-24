import React, { useEffect } from 'react';

function DetailIcon({ name }) {
  const paths = {
    bolt: <path d="M13 2 4.5 13H11l-1 9 8.5-12H12l1-8Z" />,
    mount: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m8 5 4-3 4 3M8 19l4-4 4 4" />
      </>
    ),
    size: (
      <>
        <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
        <path d="M3 8 9 2M21 8l-6-6M3 16l6 6M21 16l-6 6" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" />
        <path d="M8.2 7.7c.3-.6.6-.6.9-.6h.4c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.8c-.2.2-.2.4-.1.7.5 1 1.3 1.8 2.3 2.3.3.2.5.1.7-.1l.8-1c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.3.4.5 0 .4-.2 1.5-.8 2-.6.5-1.4.8-2.6.5-1.2-.3-2.8-1-4.5-2.6-1.4-1.3-2.3-2.9-2.6-4-.4-1.1 0-1.7.3-2.2Z" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 shrink-0 text-cyan-400">
      {paths[name]}
    </svg>
  );
}

const categoryNames = {
  carteleria: 'CARTELERÍA',
  impresion3d: 'IMPRESIÓN 3D',
  insumos: 'INSUMOS',
};

export default function ProductDetailModal({ product, onClose, whatsappNumber = '5491100000000' }) {
  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isRedAccent = product.category === 'impresion3d';
  const formattedPrice = `$${Number(product.price).toLocaleString('es-AR')}`;
  const displayCategory = categoryNames[product.category] || product.category?.toUpperCase() || 'PIEZA DE AUTOR';

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola NeonFlex, quiero consultar por ${product.title} (${formattedPrice}).`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050508]/85 backdrop-blur-md p-4 md:p-6 overflow-y-auto font-['Rajdhani']"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[1380px] my-auto bg-[#111117]/95 border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.65)] backdrop-blur-xl overflow-hidden rounded-sm animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior estilo técnico (Breadcrumb de Figma) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050508]/60 font-['Orbitron'] text-[9px] tracking-[0.15em] text-gray-500">
          <div className="flex items-center gap-2.5">
            <span>CATÁLOGO</span>
            <span className="text-cyan-400">/</span>
            <span className="text-gray-300">{displayCategory}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">NF—{String(product.id).padStart(3, '0')}</span>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-cyan-400 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              [ CERRAR ✕ ]
            </button>
          </div>
        </div>

        {/* Grilla Principal 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] min-h-[620px]">
          
          {/* Columna Izquierda: Imagen con marco y esquineros */}
          <div className="p-3 md:p-4 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className={`relative h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[600px] overflow-hidden bg-[#09090c] border transition-all duration-300 group ${
              isRedAccent 
                ? 'border-[#ff0055]/20 hover:border-[#ff0055]/60 hover:shadow-[0_0_35px_rgba(255,0,85,0.1)]' 
                : 'border-cyan-400/20 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(0,240,255,0.1)]'
            }`}>
              <img 
                src={product.image_url} 
                alt={product.title} 
                className="w-full h-full object-cover saturate-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Degradado inferior */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030305]/90 pointer-events-none" />

              {/* Esquineros técnicos (image-corners de Figma) */}
              <div className="absolute inset-4 pointer-events-none">
                <i className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/40" />
                <i className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/40" />
                <i className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/40" />
                <i className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/40" />
              </div>

              {/* Etiqueta inferior izquierda */}
              <div className="absolute bottom-7 left-7 flex items-baseline gap-2.5 font-['Orbitron']">
                <span className="text-gray-400 text-[9px] tracking-[0.18em]">PIEZA</span>
                <strong className={`text-2xl md:text-3xl ${isRedAccent ? 'text-[#ff0055]' : 'text-cyan-400'}`}>
                  #{String(product.id).padStart(2, '0')}
                </strong>
              </div>

              <span className="hidden sm:block absolute right-7 bottom-8 text-gray-500 font-['Orbitron'] text-[7px] tracking-[0.14em] uppercase">
                NEONFLEX · ORIGINAL
              </span>
            </div>
          </div>

          {/* Columna Derecha: Información y Especificaciones */}
          <div className="flex flex-col p-6 sm:p-10 lg:p-14">
            
            <div className="flex items-center justify-between gap-4">
              <span className={`px-3 py-1.5 border rounded-full font-['Orbitron'] text-[9px] font-bold tracking-[0.13em] ${
                isRedAccent 
                  ? 'border-[#ff0055]/50 text-[#ff0055] bg-[#ff0055]/5' 
                  : 'border-cyan-400/45 text-cyan-400 bg-cyan-400/5'
              }`}>
                {displayCategory}
              </span>
              <span className="hidden sm:inline font-['Orbitron'] text-[8px] tracking-[0.12em] text-gray-400">
                <span className="text-cyan-400 mr-1">●</span> DISPONIBLE A PEDIDO
              </span>
            </div>

            <div className="mt-8 lg:mt-12">
              <span className="block mb-2.5 text-gray-400 text-xs font-semibold tracking-[0.15em] uppercase">
                Neón LED flexible / Serie Oficial
              </span>
              <h2 className="font-['Orbitron'] text-3xl sm:text-5xl font-bold uppercase leading-[0.98] tracking-wide text-white">
                {product.title}
              </h2>
            </div>

            <div className="flex items-end gap-4 mt-7 pb-6 border-b border-white/10">
              <span className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">
                {formattedPrice}
              </span>
              <span className="pb-1.5 text-gray-500 text-[10px] font-semibold tracking-[0.11em]">
                ARS · PRECIO FINAL
              </span>
            </div>

            <p className="mt-6 text-gray-400 text-base sm:text-[17px] font-medium leading-relaxed">
              {product.description || 
                'Una pieza de luz diseñada para transformar el espacio. Fabricada artesanalmente con neón LED de alta intensidad sobre base resistente, combina estética industrial, precisión técnica y una presencia inconfundible.'}
            </p>

            {/* Grilla de Especificaciones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 mt-8 border-t border-b border-white/10">
              <div className="flex items-center gap-3 py-4 px-3 border-b sm:border-b-0 sm:border-r border-white/10 text-gray-200 text-[11px] font-bold tracking-wider">
                <DetailIcon name="bolt" />
                <div>
                  <small className="block text-gray-500 text-[8px] tracking-[0.12em] mb-0.5">TECNOLOGÍA</small>
                  LED 12V
                </div>
              </div>
              <div className="flex items-center gap-3 py-4 px-3 border-b sm:border-b-0 sm:border-r border-white/10 text-gray-200 text-[11px] font-bold tracking-wider">
                <DetailIcon name="mount" />
                <div>
                  <small className="block text-gray-500 text-[8px] tracking-[0.12em] mb-0.5">INSTALACIÓN</small>
                  LISTO PARA COLGAR
                </div>
              </div>
              <div className="flex items-center gap-3 py-4 px-3 text-gray-200 text-[11px] font-bold tracking-wider">
                <DetailIcon name="size" />
                <div>
                  <small className="block text-gray-500 text-[8px] tracking-[0.12em] mb-0.5">MEDIDAS</small>
                  A PERSONALIZAR
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="mt-auto pt-8">
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-between px-6 py-4 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#001416] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] font-['Orbitron'] text-xs font-bold tracking-[0.11em] transition-all cursor-pointer"
              >
                <span>CONSULTAR POR WHATSAPP</span>
                <DetailIcon name="whatsapp" />
              </button>

              <button
                onClick={onClose}
                className="mt-4 text-gray-400 hover:text-white text-xs font-bold tracking-[0.11em] uppercase transition-colors cursor-pointer flex items-center gap-2"
              >
                <span className="text-cyan-400">←</span> VOLVER AL CATÁLOGO
              </button>
            </div>

            {/* Footer de garantías */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-gray-500 text-[9px] font-bold tracking-[0.11em]">
              <span><b className="text-cyan-400 mr-1">+</b>HECHO A MANO EN ARGENTINA</span>
              <span><b className="text-cyan-400 mr-1">+</b>GARANTÍA DE FÁBRICA</span>
              <span><b className="text-cyan-400 mr-1">+</b>ENVÍOS A TODO EL PAÍS</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}