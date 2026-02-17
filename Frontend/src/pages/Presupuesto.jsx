import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Presupuesto = () => {
  const [form, setForm] = useState({
    texto: '',
    ancho: '',
    color: 'Rosa',
    detalles: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const mensaje = `Hola Diego! 👋 Quiero un presupuesto para un cartel personalizado:
    \n✨ *Texto/Diseño:* ${form.texto}
    \n📏 *Ancho aprox:* ${form.ancho} cm
    \n🎨 *Color:* ${form.color}
    \n📝 *Detalles:* ${form.detalles}`;
    
    // NÚMERO DE DIEGO ACTUALIZADO
    const numero = "5491164477337"; 
    
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-neon-blue/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl -z-10"></div>

      <div className="bg-slate-800/80 p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-lg w-full backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-500">
          Personaliza tu Cartel
        </h2>
        <p className="text-center text-gray-400 mb-8">Cuéntanos tu idea y te la cotizamos al instante.</p>

        <form onSubmit={sendToWhatsApp} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">¿Qué debe decir tu cartel?</label>
            <input type="text" name="texto" onChange={handleChange} placeholder="Ej: Open, Leandro's Bar, Love" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-neon-pink focus:outline-none transition-colors" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ancho aprox (cm)</label>
              <input type="number" name="ancho" onChange={handleChange} placeholder="Ej: 60" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-neon-blue focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Color Principal</label>
              <select name="color" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white">
                <option>Rosa</option>
                <option>Azul</option>
                <option>Rojo</option>
                <option>Amarillo</option>
                <option>Blanco Frío</option>
                <option>Blanco Cálido</option>
                <option>Multicolor (RGB)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Detalles extra / Idea</label>
            <textarea name="detalles" onChange={handleChange} rows="3" placeholder="Quiero una tipografía cursiva..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-purple-500 focus:outline-none"></textarea>
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-green-900/20">
            <FaWhatsapp size={24} />
            Pedir Presupuesto
          </button>
        </form>
      </div>
    </div>
  );
};

export default Presupuesto;