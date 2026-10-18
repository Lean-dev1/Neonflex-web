import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const handleConsultar = () => {
    const mensaje = `Hola! Estoy interesado en el cartel "${product.title}" que vi en la web.`;
    const url = `https://wa.me/54911XXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

function ProductCard({ product }) {
  const formattedPrice = Math.round(product.price).toLocaleString("es-AR");
  const message = encodeURIComponent(`Hola NeonFlexPremium, quiero comprar el cartel "${product.title}" por $${formattedPrice}.`);

  return (
    <article className="bg-[#111117] border border-white/5 hover:border-cyan-400/30 rounded-sm flex flex-col h-full group backdrop-blur-sm">
      
      <div className="relative aspect-square bg-black overflow-hidden border-b border-white/5">
        <img src={product.image_url} alt={product.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 group-hover:saturate-100 filter saturate-90 transition-transform duration-500 will-change-transform" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-2 left-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest z-10 flex items-center gap-1 backdrop-blur-sm">
          <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></span> STOCK
        </div>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1.5">
          <span className="text-cyan-400/70">{product.category === 'carteleria' ? 'Catálogo' : product.category}</span>
          <span>COD-{product.id}</span>
        </div>
        
        <h2 className="text-white font-['Orbitron'] font-bold text-xs sm:text-sm tracking-wider uppercase mb-3 line-clamp-2">
          {product.title}
        </h2>
        
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="block text-[8px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-0.5">Precio</span>
              <p className="text-white font-['Orbitron'] font-black text-base sm:text-lg">${formattedPrice}</p>
            </div>
            {product.medidas && (
              <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{product.medidas}</span>
            )}
          </div>
          
          <a
            href={`${waLink}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#050508] font-bold py-2 px-3 rounded-sm flex items-center justify-center gap-1.5 text-[10px] tracking-widest uppercase transition-colors mt-2"
          >
            <Icon name="bag" size={12} /> COMPRAR
          </a>
        </div>
      </div>
    </article>
  );
}
}

export default ProductCard;