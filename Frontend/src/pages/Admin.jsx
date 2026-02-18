import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaPen, FaTimes, FaSignOutAlt, FaCamera } from 'react-icons/fa';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [publishType, setPublishType] = useState('stock'); 

  const [form, setForm] = useState({ title: '', price: '', description: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login'); };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data); 
    } catch (error) { if(error.response && error.response.status === 401) handleLogout(); }
  };

  useEffect(() => { fetchProducts(); }, []);
  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };
  const handleFileChange = (e) => { setFile(e.target.files[0]); };

  const handleEdit = (product) => {
    setEditingId(product.id);
    if (product.category === 'portfolio') { setPublishType('portfolio'); } else { setPublishType('stock'); }
    setForm({ title: product.title, price: product.price, description: product.description || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null); setForm({ title: '', price: '', description: '' }); setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    const formData = new FormData();
    formData.append('title', form.title);
    if (publishType === 'portfolio') { formData.append('price', 0); formData.append('category', 'portfolio'); } 
    else { formData.append('price', form.price); formData.append('category', 'carteleria'); }
    formData.append('description', form.description);
    if (file) formData.append('image', file);
    try {
      if (editingId) { await api.put(`/products/${editingId}`, formData); alert("¡Actualizado! ✨"); } 
      else { if (!file) return alert("Falta la foto!"); await api.post('/products', formData); alert("¡Publicado! 🚀"); }
      handleCancelEdit(); fetchProducts();
    } catch (error) { alert("Error: " + error.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro?")) return;
    try { await api.delete(`/products/${id}`); setProducts(products.filter(p => p.id !== id)); } catch (error) { alert("Error al borrar"); }
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-8 text-white font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
            <div><h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-red">PANEL DE CONTROL</h1></div>
            <button onClick={handleLogout} className="text-sm font-bold text-neutral-500 hover:text-white flex items-center gap-2"><FaSignOutAlt /> Salir</button>
        </div>

        {/* SECCIÓN DE CARGA  */}
        <div className="bg-neutral-900 p-8 rounded-2xl shadow-2xl border border-neutral-800 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-3 text-white">
              {editingId ? <><FaPen className="text-neon-blue"/> Editando</> : <><FaPlus className="text-neon-blue"/> Nueva Publicación</>}
            </h2>
            {editingId && (<button onClick={handleCancelEdit} className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 bg-neutral-800 px-3 py-1 rounded-full"><FaTimes /> Cancelar</button>)}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 bg-neutral-950/50 p-4 rounded-xl border border-neutral-800 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={publishType === 'stock'} onChange={() => setPublishType('stock')} className="accent-neon-blue w-5 h-5"/>
                <span className={`font-bold ${publishType === 'stock' ? 'text-white' : 'text-neutral-500'}`}>Stock (Para Vender)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={publishType === 'portfolio'} onChange={() => setPublishType('portfolio')} className="accent-neon-red w-5 h-5"/>
                <span className={`font-bold ${publishType === 'portfolio' ? 'text-white' : 'text-neutral-500'}`}>Portafolio (Solo mostrar)</span>
              </label>
            </div>

            <div className={`space-y-2 ${publishType === 'portfolio' ? 'md:col-span-2' : ''}`}>
              <label className="text-xs font-bold text-neutral-500 uppercase">Título</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full bg-neutral-950 p-3 rounded-lg border border-neutral-700 focus:border-neon-blue outline-none" required />
            </div>

            {publishType === 'stock' && (
              <div className="space-y-2 animate-fade-in-up">
                <label className="text-xs font-bold text-neutral-500 uppercase">Precio ($)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full bg-neutral-950 p-3 rounded-lg border border-neutral-700 focus:border-neon-blue outline-none" required />
              </div>
            )}
            
            <div className="md:col-span-2 space-y-2">
               <label className="text-xs font-bold text-neutral-500 uppercase flex items-center gap-2"><FaCamera /> Foto</label>
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="w-full bg-neutral-950 p-3 rounded-lg border border-neutral-700 file:bg-neon-blue/10 file:text-neon-blue file:border-0 file:rounded-full file:px-4 file:font-bold hover:file:bg-neon-blue/20 cursor-pointer" accept="image/*" />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase">Descripción</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full bg-neutral-950 p-3 rounded-lg border border-neutral-700 focus:border-neon-blue outline-none" rows="2"></textarea>
            </div>
            
            <button type="submit" disabled={loading} className={`md:col-span-2 font-bold py-4 rounded-xl transition-all uppercase tracking-wide shadow-lg ${loading ? 'bg-neutral-800' : (publishType === 'stock' ? 'bg-neon-blue hover:bg-cyan-600 text-slate-900' : 'bg-neon-red hover:bg-red-700 text-white')}`}>
              {loading ? "Procesando..." : (editingId ? "Guardar Cambios" : (publishType === 'stock' ? "Publicar Cartel" : "Subir Foto"))}
            </button>
          </form>
        </div>

        {/* LISTADO */}
        <h2 className="text-2xl font-bold mb-6 text-white">Tus Publicaciones ({products.length})</h2>
        <div className="grid gap-4">
          {products.map(prod => (
            <div key={prod.id} className="bg-neutral-900 p-4 rounded-xl flex justify-between items-center border border-neutral-800 group hover:border-neutral-600">
              <div className="flex items-center gap-4">
                <img src={prod.image_url} alt={prod.title} className="w-16 h-16 object-cover rounded-lg bg-black" />
                <div>
                  <h3 className="font-bold text-white">{prod.title}</h3>
                  {prod.category === 'portfolio' ? (<span className="text-[10px] bg-neon-red text-white px-2 py-1 rounded font-bold uppercase">Portafolio</span>) : (<span className="text-[10px] bg-neon-blue text-slate-900 px-2 py-1 rounded font-bold uppercase">En Venta</span>)}
                  {prod.category !== 'portfolio' && (<span className="text-neutral-400 text-sm ml-2">${prod.price}</span>)}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(prod)} className="bg-neutral-800 hover:bg-blue-600 text-white p-2 rounded transition-colors"><FaPen /></button>
                <button onClick={() => handleDelete(prod.id)} className="bg-neutral-800 hover:bg-red-600 text-white p-2 rounded transition-colors"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Admin;