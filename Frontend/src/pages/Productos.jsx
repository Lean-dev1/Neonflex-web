import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-2 text-neon-blue">
        Catálogo de Neón
      </h1>
      <p className="text-center text-gray-400 mb-12">Iluminá tus espacios con nuestros diseños exclusivos</p>
      
      {loading ? (
        <p className="text-center animate-pulse text-neon-purple">Cargando luces...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;