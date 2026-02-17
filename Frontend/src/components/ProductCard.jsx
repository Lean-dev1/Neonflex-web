import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  // Función para redirigir a WhatsApp con mensaje pre-armado
  const handleConsultar = () => {
    const mensaje = `Hola! Me interesa el cartel "${product.title}" que vi en la web.`;
    const url = `https://wa.me/54911XXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-neon-purple transition-all duration-300 group">
      {/* Imagen con efecto zoom */}
      <div className="h-64 overflow-hidden relative">
        <img 
          src={product.image_url} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>

      {/* Info del producto */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description || "Sin descripción"}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-neon-blue">
            ${parseFloat(product.price).toLocaleString()}
          </span>
          
          <button 
            onClick={handleConsultar}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <FaWhatsapp size={20} />
            Pedir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;