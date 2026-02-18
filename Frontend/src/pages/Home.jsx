import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        // Solo mostramos los primeros 3 o 6 en la home para no saturar
        setProducts(response.data.slice(0, 6)); 
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <header className="py-20 text-center bg-slate-800/50 mb-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-4">
          NEON FLEX PREMIUM
        </h1>
        <p className="text-gray-300 text-xl mb-8">Carteles luminosos que transforman tu espacio</p>
        <Link to="/presupuesto" className="bg-neon-pink hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,0,170,0.5)] transition-all transform hover:scale-105">
          ¡Pedí tu cartel personalizado!
        </Link>
      </header>

      {/* Productos Destacados */}
      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-neon-blue pl-4">Lo último</h2>
        
        {loading ? (
          <p className="text-white text-center animate-pulse">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
           <Link to="/productos" className="text-neon-blue hover:text-white underline decoration-neon-blue underline-offset-4">
              Ver el catálogo completo &rarr;
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;