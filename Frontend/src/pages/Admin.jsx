import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { FaTrash, FaPlus, FaPen, FaTimes } from 'react-icons/fa';

const Admin = () => {
  const [products, setProducts] = useState([]);
  // Estado para saber si estamos editando (guarda el ID del producto)
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({ title: '', price: '', category: 'carteleria', description: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Referencia para limpiar el input file visualmente
  const fileInputRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      // Ordenamos para ver los nuevos primero
      setProducts(res.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error cargando productos");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // --- FUNCIÓN PARA CARGAR DATOS EN EL FORMULARIO ---
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description || ''
    });
    // Scroll suave hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- FUNCIÓN PARA CANCELAR EDICIÓN ---
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: '', price: '', category: 'carteleria', description: '' });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('description', form.description);
    if (file) formData.append('image', file);

    try {
      if (editingId) {
        // MODO EDICIÓN (PUT)
        await api.put(`/products/${editingId}`, formData);
        alert("¡Cartel actualizado correctamente! ✨");
      } else {
        // MODO CREACIÓN (POST)
        if (!file) return alert("Falta la foto!"); // Foto obligatoria solo al crear
        await api.post('/products', formData);
        alert("¡Cartel publicado! ⚡");
      }

      handleCancelEdit(); // Limpiamos todo
      fetchProducts(); // Recargamos lista
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este cartel?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert("Error al borrar");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-neon-blue">Panel de Administración</h1>

        {/* --- FORMULARIO INTELIGENTE --- */}
        <div className={`p-6 rounded-xl shadow-lg border mb-10 transition-colors ${editingId ? 'bg-slate-800 border-neon-blue' : 'bg-slate-800 border-slate-700'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {editingId ? <><FaPen className="text-neon-blue"/> Editando Cartel</> : <><FaPlus className="text-green-400"/> Nuevo Cartel</>}
            </h2>
            {editingId && (
              <button onClick={handleCancelEdit} className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                <FaTimes /> Cancelar Edición
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Nombre del Cartel" className="bg-slate-700 p-2 rounded border border-slate-600 focus:border-neon-blue outline-none" required />
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Precio ($)" className="bg-slate-700 p-2 rounded border border-slate-600 focus:border-neon-blue outline-none" required />
            
            <div className="md:col-span-2">
               <label className="text-xs text-gray-400 ml-1 block mb-1">
                 {editingId ? "Subir nueva foto (Opcional - dejar vacío para mantener la actual)" : "Foto del producto"}
               </label>
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="w-full bg-slate-700 p-2 rounded border border-slate-600" accept="image/*" />
            </div>
            
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción (medidas, colores, etc)" className="bg-slate-700 p-2 rounded border border-slate-600 md:col-span-2 focus:border-neon-blue outline-none" rows="2"></textarea>
            
            <button type="submit" disabled={loading} className={`md:col-span-2 font-bold py-2 rounded transition-all ${editingId ? 'bg-neon-blue hover:bg-cyan-600 text-slate-900' : 'bg-neon-purple hover:bg-purple-600 text-white'}`}>
              {loading ? "Procesando..." : (editingId ? "Guardar Cambios" : "Publicar Cartel")}
            </button>
          </form>
        </div>

        {/* --- LISTA DE PRODUCTOS --- */}
        <h2 className="text-2xl font-bold mb-4">Carteles Publicados ({products.length})</h2>
        <div className="grid gap-4">
          {products.map(prod => (
            <div key={prod.id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center border border-slate-700 hover:border-neon-blue transition-colors group">
              <div className="flex items-center gap-4">
                <img src={prod.image_url} alt={prod.title} className="w-16 h-16 object-cover rounded bg-black" />
                <div>
                  <h3 className="font-bold text-lg">{prod.title}</h3>
                  <p className="text-green-400 font-mono">${prod.price}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {/* BOTÓN EDITAR */}
                <button onClick={() => handleEdit(prod)} className="bg-blue-900/50 hover:bg-blue-600 text-blue-200 p-3 rounded-full transition-colors" title="Editar">
                  <FaPen size={14} />
                </button>
                {/* BOTÓN BORRAR */}
                <button onClick={() => handleDelete(prod.id)} className="bg-red-900/50 hover:bg-red-600 text-red-200 p-3 rounded-full transition-colors" title="Borrar">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;