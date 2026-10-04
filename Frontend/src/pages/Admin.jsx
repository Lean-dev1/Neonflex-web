import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaPen, FaTimes, FaSignOutAlt, FaCamera, FaArrowLeft } from 'react-icons/fa';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [publishType, setPublishType] = useState('stock'); 

  
  const [form, setForm] = useState({ title: '', price: '', description: '', medidas: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data); 
    } catch (error) { 
      if(error.response && error.response.status === 401) handleLogout(); 
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value }); 
  };
  
  const handleFileChange = (e) => { 
    setFile(e.target.files[0]); 
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    if (product.category === 'portfolio') { 
      setPublishType('portfolio'); 
    } else { 
      setPublishType('stock'); 
    }
    setForm({ 
      title: product.title, 
      price: product.price, 
      description: product.description || '',
      medidas: product.medidas || '' 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null); 
    setForm({ title: '', price: '', description: '', medidas: '' }); 
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    
    if (publishType === 'portfolio') { 
      formData.append('price', 0); 
      formData.append('category', 'portfolio'); 
    } else { 
      formData.append('price', form.price); 
      formData.append('category', 'carteleria'); 
      formData.append('medidas', form.medidas); 
    }
    
    if (file) formData.append('image', file);
    
    try {
      if (editingId) { 
        await api.put(`/products/${editingId}`, formData); 
        alert("¡Actualizado correctamente! ✨"); 
      } else { 
        if (!file) return alert("¡Falta subir la foto!"); 
        await api.post('/products', formData); 
        alert("¡Publicado con éxito! 🚀"); 
      }
      handleCancelEdit(); 
      fetchProducts();
    } catch (error) { 
      alert("Error: " + error.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar esta publicación?")) return;
    try { 
      await api.delete(`/products/${id}`); 
      setProducts(products.filter(p => p.id !== id)); 
    } catch (error) { 
      alert("Error al borrar"); 
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@700;900&display=swap');
      `}</style>
      
      <div className="min-h-screen bg-[#050508] p-4 md:p-8 text-white font-['Rajdhani']">
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER ADMIN */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/10 pb-4 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white font-['Orbitron'] tracking-widest uppercase">
                  PANEL <span className="text-cyan-400">ADMIN</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/" className="text-xs font-bold text-gray-400 hover:text-cyan-400 flex items-center gap-2 uppercase tracking-widest transition-colors">
                  <FaArrowLeft /> Ver Tienda
                </Link>
                <button onClick={handleLogout} className="text-xs font-bold text-gray-400 hover:text-red-400 flex items-center gap-2 uppercase tracking-widest transition-colors">
                  <FaSignOutAlt /> Salir
                </button>
              </div>
          </div>

          {/* SECCIÓN DE CARGA */}
          <div className="bg-[#0a0a0f] p-6 md:p-8 rounded-sm shadow-xl border border-white/5 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center gap-3 text-white uppercase tracking-widest">
                {editingId 
                  ? <><FaPen className="text-cyan-400"/> Editando Publicación</> 
                  : <><FaPlus className="text-cyan-400"/> Nueva Publicación</>}
              </h2>
              {editingId && (
                <button onClick={handleCancelEdit} className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm uppercase tracking-widest transition-colors">
                  <FaTimes /> Cancelar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Selector de Tipo */}
              <div className="md:col-span-2 bg-[#1a1a22] p-4 rounded-sm border border-white/5 flex flex-col sm:flex-row gap-4 sm:gap-8">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" checked={publishType === 'stock'} onChange={() => setPublishType('stock')} className="accent-cyan-400 w-4 h-4"/>
                  <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${publishType === 'stock' ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    Catálogo / Venta
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" checked={publishType === 'portfolio'} onChange={() => setPublishType('portfolio')} className="accent-purple-400 w-4 h-4"/>
                  <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${publishType === 'portfolio' ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    Trabajo a Medida (Portfolio)
                  </span>
                </label>
              </div>

              {/* Título */}
              <div className={`space-y-2 ${publishType === 'portfolio' ? 'md:col-span-2' : ''}`}>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Título / Nombre</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Ej: Cartel Abierto Neón" className="w-full bg-[#1a1a22] p-3 rounded-sm border border-white/5 text-sm text-white focus:border-cyan-400/50 outline-none transition-colors placeholder:text-gray-600" required />
              </div>

              {/* Campos condicionales para Stock */}
              {publishType === 'stock' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Precio ($)</label>
                    <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Ej: 45000" className="w-full bg-[#1a1a22] p-3 rounded-sm border border-white/5 text-sm text-white focus:border-cyan-400/50 outline-none transition-colors placeholder:text-gray-600" required />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Medidas</label>
                    <input name="medidas" type="text" value={form.medidas} onChange={handleChange} placeholder="Ej: 50x30 cm" className="w-full bg-[#1a1a22] p-3 rounded-sm border border-white/5 text-sm text-white focus:border-cyan-400/50 outline-none transition-colors placeholder:text-gray-600" />
                  </div>
                </>
              )}
              
              {/* Foto */}
              <div className="md:col-span-2 space-y-2">
                 <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><FaCamera /> Subir Imagen</label>
                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="w-full bg-[#1a1a22] p-2.5 rounded-sm border border-white/5 text-sm text-gray-400 file:bg-white/5 file:text-white file:border-0 file:rounded-sm file:px-4 file:py-1 file:font-bold file:uppercase file:tracking-widest file:text-[10px] hover:file:bg-white/10 cursor-pointer transition-colors" accept="image/*" />
              </div>
              
              {/* Descripción / Historia */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  {publishType === 'portfolio' ? 'Historia del cartel' : 'Descripción detallada'}
                </label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  placeholder={publishType === 'portfolio' ? 'Contá para quién fue, qué pidió el cliente o los detalles de este trabajo a medida...' : 'Escribí las características de este producto...'}
                  className="w-full bg-[#1a1a22] p-3 rounded-sm border border-white/5 text-sm text-white focus:border-cyan-400/50 outline-none transition-colors placeholder:text-gray-600" 
                  rows="3"
                ></textarea>
              </div>
              
              {/* Botón Guardar */}
              <button 
                type="submit" 
                disabled={loading} 
                className={`md:col-span-2 font-bold py-3.5 rounded-sm transition-all uppercase tracking-widest text-[13px] flex justify-center items-center gap-2 ${
                  loading 
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                    : (publishType === 'stock' 
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-[#050508]' 
                        : 'bg-purple-500 hover:bg-purple-400 text-white')
                }`}
              >
                {loading ? "Procesando..." : (editingId ? "Guardar Cambios" : (publishType === 'stock' ? "Publicar en Catálogo" : "Subir al Portfolio"))}
              </button>
            </form>
          </div>

          {/* LISTADO DE PUBLICACIONES */}
          <h2 className="text-lg font-bold mb-4 text-white uppercase tracking-widest">Inventario & Portfolio ({products.length})</h2>
          <div className="grid gap-3">
            {products.map(prod => (
              <div key={prod.id} className="bg-[#0a0a0f] p-3 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center border border-white/5 group hover:border-white/20 transition-colors gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img src={prod.image_url} alt={prod.title} className="w-14 h-14 object-cover rounded-sm bg-black border border-white/5" />
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-1">{prod.title}</h3>
                    <div className="flex items-center gap-2">
                      {prod.category === 'portfolio' 
                        ? <span className="text-[9px] bg-purple-500/10 border border-purple-500/30 text-purple-400 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-widest">A Medida</span> 
                        : <span className="text-[9px] bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-widest">Catálogo</span>
                      }
                      {prod.category !== 'portfolio' && (
                        <span className="text-gray-400 font-['Orbitron'] text-xs font-black">${Math.round(prod.price).toLocaleString('es-AR')}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0">
                  <button onClick={() => handleEdit(prod)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2.5 rounded-sm transition-colors" title="Editar"><FaPen size={12} /></button>
                  <button onClick={() => handleDelete(prod.id)} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 p-2.5 rounded-sm transition-colors" title="Eliminar"><FaTrash size={12} /></button>
                </div>
              </div>
            ))}
            
            {products.length === 0 && (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-sm">
                <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Aún no hay publicaciones</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Admin;