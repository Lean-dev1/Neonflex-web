import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaWhatsapp, FaArrowLeft, FaTruck, FaShieldAlt, FaTools, FaStar } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get('/products');
        const foundProduct = res.data.find(p => p.id.toString() === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          navigate('/productos');
        }
      } catch (error) {
        console.error("Error cargando el producto", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-neutral-800 border-t-blue-600 dark:border-t-neon-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white pt-28 pb-24 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- NAVEGACIÓN SUPERIOR --- */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500 mb-10">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-gray-900 dark:hover:text-white transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate">{product.title}</span>
        </nav>

        {/* --- CONTENEDOR PRINCIPAL (LAYOUT 60/40) --- */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* COLUMNA IZQUIERDA: Imagen Gigante (Limpia y a borde completo) */}
          <div className="w-full lg:w-3/5 lg:sticky lg:top-32 relative">
             <div className="w-full aspect-square md:aspect-[4/3] bg-black rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-xl relative">
                
                {/* Imagen limpia ocupando 100% del encuadre, sin zoom ni brillos */}
                <img 
                  src={product.image_url} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Insignia Premium */}
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md text-gray-900 dark:text-white text-[10px] font-black px-4 py-2 rounded-lg border border-gray-200/50 dark:border-neutral-700/50 uppercase tracking-widest z-20 shadow-lg flex items-center gap-2">
                   <FaStar className="text-yellow-500" /> Premium Quality
                </div>
             </div>
          </div>

          {/* COLUMNA DERECHA: Información y Compra */}
          <div className="w-full lg:w-2/5 flex flex-col">
            
            {/* Título y Precio */}
            <div className="mb-10">
               <h1 className="text-4xl md:text-5xl font-black uppercase text-gray-900 dark:text-white tracking-tight mb-4 leading-[1.1]">
                 {product.title}
               </h1>
               <div className="flex flex-col gap-1">
                 <span className="text-5xl font-black text-blue-700 dark:text-neon-blue tracking-tighter">
                   ${product.price}
                 </span>
                 <span className="text-sm font-bold text-gray-500 dark:text-neutral-500 uppercase tracking-widest mt-2">
                   Precio final. Efectivo o Transferencia.
                 </span>
               </div>
            </div>

            {/* Descripción */}
            <div className="mb-10">
               <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-neutral-800 pb-2">
                 Sobre este diseño
               </h3>
               <p className="text-gray-600 dark:text-neutral-400 text-base leading-relaxed">
                 {product.description || 'Diseño fabricado con base de acrílico cristal de 4mm y tecnología Neón Flex LED de última generación. Listo para enchufar y colgar. Transformá la vibra de tu espacio en minutos.'}
               </p>
            </div>

            {/* Botón de Compra Gigante */}
            <div className="mb-12 bg-gray-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-gray-200 dark:border-neutral-800">
               <p className="text-center text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest mb-4">
                 Compra directa y personalizada
               </p>
               <a 
                 href={`https://wa.me/5491164477337?text=Hola! Quiero avanzar con la compra del cartel: "${product.title}" ($${product.price}).`}
                 target="_blank" rel="noreferrer" 
                 className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg uppercase tracking-widest text-sm md:text-base"
               >
                 <FaWhatsapp size={24} />
                 Comprar por WhatsApp
               </a>
            </div>

            {/* --- BLOQUES DE SEGURIDAD (TRUST BADGES) --- */}
            <div className="space-y-4">
               
               {/* Garantía */}
               <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-neon-blue p-3 rounded-xl">
                     <FaShieldAlt size={24} />
                  </div>
                  <div>
                     <h4 className="font-black text-gray-900 dark:text-white uppercase text-sm mb-1">Garantía de 6 Meses</h4>
                     <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed">Cobertura total sobre fallas técnicas o de iluminación. Tu inversión está protegida.</p>
                  </div>
               </div>

               {/* Envíos */}
               <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl items-start">
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-neon-red p-3 rounded-xl">
                     <FaTruck size={24} />
                  </div>
                  <div>
                     <h4 className="font-black text-gray-900 dark:text-white uppercase text-sm mb-1">Envíos a todo el país</h4>
                     <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed">Despachamos mediante Correo Argentino con embalaje especial anti-roturas de madera.</p>
                  </div>
               </div>

               {/* Instalación */}
               <div className="flex gap-4 p-5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 rounded-xl">
                     <FaTools size={24} />
                  </div>
                  <div>
                     <h4 className="font-black text-gray-900 dark:text-white uppercase text-sm mb-1">Listo para usar</h4>
                     <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed">Incluye fuente de 12v a 220v y sistema de colgado fácil. Se instala como un cuadro en minutos.</p>
                  </div>
               </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;