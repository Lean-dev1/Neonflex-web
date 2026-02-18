import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

const Productos = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      const productosDeStock = res.data.filter(p => p.category !== 'portfolio');
      setProducts(productosDeStock);
    } catch (error) {
      console.error("Error cargando productos");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-10 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">
            CATÁLOGO DE CARTELES
          </h1>
          <p className="text-neutral-400 text-lg">Stock disponible para entrega inmediata.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-neutral-800 border-dashed">
            <FaSearch className="text-4xl text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500 text-xl">Cargando carteles disponibles... ⚡</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((prod) => (
              <div key={prod.id} className="bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group border border-neutral-800 hover:border-neon-blue/50 flex flex-col">
                
                <div className="h-64 overflow-hidden relative bg-black">
                   <img src={prod.image_url} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wide">Stock</div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-neon-blue transition-colors capitalize">{prod.title}</h3>
                  <p className="text-neutral-400 text-xs mb-4 line-clamp-2">{prod.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-800">
                      <div className="flex flex-col">
                        <span className="text-xs text-neutral-500">Precio</span>
                        <span className="text-2xl font-bold text-white">${prod.price}</span>
                      </div>
                      <a href={`https://wa.me/5491164477337?text=Hola! Me interesa comprar el cartel "${prod.title}" de $${prod.price}.`} target="_blank" rel="noreferrer" className="bg-neon-blue hover:bg-cyan-400 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110" title="Comprar por WhatsApp">
                        <FaShoppingCart />
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Productos;