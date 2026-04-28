import React, { useState } from 'react';
import { FaWhatsapp, FaRulerHorizontal, FaRulerVertical, FaPalette, FaFont, FaImage, FaPaperPlane, FaCloudUploadAlt } from 'react-icons/fa';

import bgImage from '../assets/images/neon.jpg';

const Presupuesto = () => {
  const [formData, setFormData] = useState({
    tipo: 'texto',
    textoCartel: '',
    tipografia: 'Cursive',
    color: 'Rosa',
    ancho: '',
    alto: '',
    observaciones: '',
    nombre: '',
    email: '',
    telefono: ''
  });

  const colores = [
    { nombre: 'Blanco Frío', hex: '#E0F7FA' },
    { nombre: 'Blanco Cálido', hex: '#FFF3E0' },
    { nombre: 'Amarillo', hex: '#FFEB3B' },
    { nombre: 'Naranja', hex: '#FF9800' },
    { nombre: 'Rojo', hex: '#FF0000' },
    { nombre: 'Rosa', hex: '#E91E63' },
    { nombre: 'Violeta', hex: '#9C27B0' },
    { nombre: 'Azul', hex: '#0066FF' },
    { nombre: 'Celeste', hex: '#03A9F4' },
    { nombre: 'Verde', hex: '#4CAF50' },
  ];

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const handleColorSelect = (nombreColor) => { setFormData({ ...formData, color: nombreColor }); };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 font-sans relative transition-colors duration-300 text-gray-900 dark:text-white">
      
      {/* --- FONDO ESTÁTICO CON VIDRIO ESMERILADO DINÁMICO --- */}
      <div className="fixed inset-0 w-full h-full -z-50">
        <img src={bgImage} alt="Fondo Neon" className="w-full h-full object-cover" />
        {/* Aquí está la magia: bg-white/90 en claro, bg-neutral-950/85 en oscuro */}
        <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/85 backdrop-blur-sm transition-colors duration-300"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* --- COLUMNA IZQUIERDA: EL COTIZADOR --- */}
        <div className="animate-fade-in-up">
          <div className="mb-8">
             <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-red drop-shadow-lg">
               COTIZADOR ONLINE
             </h1>
             <p className="text-gray-600 dark:text-gray-300 font-medium">Diseña tu cartel y recibí el precio por mail.</p>
          </div>

          {/* Formulario Translúcido */}
          <form 
            action="https://formsubmit.co/neonflex.arg@gmail.com" 
            method="POST" 
            encType="multipart/form-data"
            className="bg-white/80 dark:bg-neutral-900/80 p-8 rounded-3xl border border-gray-200 dark:border-neutral-700 shadow-2xl space-y-8 backdrop-blur-md transition-colors duration-300"
          >
            <input type="hidden" name="_subject" value={`Nueva Cotización: ${formData.textoCartel || 'Diseño Personalizado'} (${formData.nombre})`} />
            <input type="hidden" name="_replyto" value={formData.email} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="http://localhost:5173/presupuesto" />
            <input type="hidden" name="_captcha" value="false" />

            {/* PASO 1 */}
            <div>
              <label className="text-sm font-bold text-neon-blue uppercase mb-3 block tracking-wider">1. ¿Qué querés hacer?</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, tipo: 'texto'})}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.tipo === 'texto' ? 'bg-gray-100 dark:bg-neutral-800 border-neon-blue text-gray-900 dark:text-white shadow-[0_0_10px_rgba(0,240,255,0.2)]' : 'border-gray-300 dark:border-neutral-700 text-gray-500 hover:border-gray-400 dark:hover:border-gray-500'}`}
                >
                  <FaFont size={24} />
                  <span className="font-bold">Frase / Texto</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, tipo: 'logo'})}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.tipo === 'logo' ? 'bg-gray-100 dark:bg-neutral-800 border-neon-red text-gray-900 dark:text-white shadow-[0_0_10px_rgba(255,23,68,0.2)]' : 'border-gray-300 dark:border-neutral-700 text-gray-500 hover:border-gray-400 dark:hover:border-gray-500'}`}
                >
                  <FaImage size={24} />
                  <span className="font-bold">Logo / Dibujo</span>
                </button>
              </div>
            </div>

            {/* PASO 2 */}
            {formData.tipo === 'texto' ? (
               <div className="animate-fade-in-up">
                 <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 block">Tu Frase</label>
                 <input 
                    type="text" name="textoCartel" value={formData.textoCartel} onChange={handleChange}
                    placeholder="Escribí aquí (Ej: Better Together)" 
                    className="w-full bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-4 text-lg text-gray-900 dark:text-white focus:border-neon-blue outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors"
                    required
                 />
                 <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase mt-4 mb-2 block">Estilo de Letra</label>
                 <select 
                    name="tipografia" value={formData.tipografia} onChange={handleChange}
                    className="w-full bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-4 text-gray-900 dark:text-white focus:border-neon-blue outline-none transition-colors"
                 >
                   <option value="Cursive">Cursiva (Estilo Firma)</option>
                   <option value="Block">Imprenta (Mayúsculas)</option>
                   <option value="DoubleLine">Doble Línea (Retro)</option>
                   <option value="Minimal">Minimalista</option>
                 </select>
               </div>
            ) : (
              <div className="animate-fade-in-up space-y-4">
                <div>
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 block">Descripción</label>
                    <textarea 
                    name="observaciones" rows="2"
                    className="w-full bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-4 text-gray-900 dark:text-white focus:border-neon-red outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors"
                    placeholder="Contanos tu idea..."
                    ></textarea>
                </div>
                <div>
                    <label className="text-sm font-bold text-neon-red uppercase mb-2 block flex items-center gap-2">
                        <FaCloudUploadAlt size={18} /> Subir Boceto / Logo
                    </label>
                    <input 
                        type="file" name="attachment" accept="image/png, image/jpeg, image/jpg"
                        className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-red/10 file:text-neon-red hover:file:bg-neon-red/20 cursor-pointer border border-gray-300 dark:border-neutral-700 rounded-xl bg-white/50 dark:bg-neutral-950/30 p-2 transition-colors"
                    />
                </div>
              </div>
            )}

            {/* PASO 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="text-sm font-bold text-neon-blue uppercase mb-3 block tracking-wider flex items-center gap-2"><FaPalette/> Color</label>
                 <div className="flex flex-wrap gap-3">
                   {colores.map((c) => (
                     <div 
                        key={c.nombre} onClick={() => handleColorSelect(c.nombre)}
                        className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-125 border-2 ${formData.color === c.nombre ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: c.hex, boxShadow: formData.color === c.nombre ? `0 0 10px ${c.hex}` : 'none' }}
                        title={c.nombre}
                     ></div>
                   ))}
                 </div>
                 <input type="hidden" name="color_seleccionado" value={formData.color} />
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Seleccionado: <span className="text-gray-900 dark:text-white font-bold">{formData.color}</span></p>
              </div>

              <div>
                <label className="text-sm font-bold text-neon-blue uppercase mb-3 block tracking-wider flex items-center gap-2"> Medidas</label>
                <div className="flex gap-2">
                    <div className="relative w-full">
                        <FaRulerHorizontal className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
                        <input 
                        type="text" name="ancho" placeholder="Ancho (cm)" onChange={handleChange}
                        className="w-full bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-3 pl-9 text-gray-900 dark:text-white focus:border-neon-blue outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors" required
                        />
                    </div>
                    <div className="relative w-full">
                        <FaRulerVertical className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
                        <input 
                        type="text" name="alto" placeholder="Alto (cm)" onChange={handleChange}
                        className="w-full bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-3 pl-9 text-gray-900 dark:text-white focus:border-neon-blue outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors"
                        />
                    </div>
                </div>
              </div>
            </div>

            {/* PASO 4 */}
            <div className="pt-6 border-t border-gray-200 dark:border-neutral-700">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4 block">Tus Datos</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input type="text" name="nombre" placeholder="Tu Nombre" onChange={handleChange} className="bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-3 text-gray-900 dark:text-white focus:border-neon-blue outline-none transition-colors" required />
                 <input type="text" name="telefono" placeholder="WhatsApp" onChange={handleChange} className="bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-3 text-gray-900 dark:text-white focus:border-neon-blue outline-none transition-colors" />
                 <input type="email" name="email" placeholder="Tu Email" onChange={handleChange} className="col-span-1 md:col-span-2 bg-white/50 dark:bg-neutral-950/50 border border-gray-300 dark:border-neutral-600 rounded-xl p-3 text-gray-900 dark:text-white focus:border-neon-blue outline-none transition-colors" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-neon-blue to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white dark:text-neutral-950 font-black py-4 rounded-xl text-lg uppercase tracking-widest shadow-lg shadow-neon-blue/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
               <FaPaperPlane /> Solicitar Cotización
            </button>

          </form>
        </div>

        {/* --- COLUMNA DERECHA --- */}
        <div className="flex flex-col justify-center space-y-8">
           <div className="bg-white/80 dark:bg-neutral-900/80 p-8 rounded-3xl border border-gray-200 dark:border-neutral-700 relative overflow-hidden backdrop-blur-md transition-colors duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-red/10 rounded-full blur-3xl -z-10"></div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">¿Preferís hablar directo?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Si tenés un archivo complejo o querés atención personalizada, escribinos al WhatsApp.</p>
              <a href="https://wa.me/5491164477337" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-green-500/30">
                <FaWhatsapp size={24} /> Chat con Diego
              </a>
           </div>
           
           <div className="space-y-6 pl-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-neon-blue pl-4">¿Por qué Neon Flex?</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue text-xs font-bold">✓</div>
                   <span>Diseño digital previo sin cargo.</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue text-xs font-bold">✓</div>
                   <span>Base de acrílico importado.</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue text-xs font-bold">✓</div>
                   <span>Garantía escrita.</span>
                 </li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Presupuesto;