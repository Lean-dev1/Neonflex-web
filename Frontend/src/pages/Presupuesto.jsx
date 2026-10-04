import React, { useState } from "react";
import bgLadrillos from '../assets/images/fondo.png';
import api from '../api/axios';

const colors = [
  { name: "Blanco frío", value: "#f4fbff" },
  { name: "Blanco cálido", value: "#fff0c2" },
  { name: "Rojo", value: "#ff3b3b" },
  { name: "Azul", value: "#2864ff" },
  { name: "Celeste", value: "#00d9ff" },
  { name: "Verde", value: "#34e86f" },
  { name: "Rosa", value: "#ff3cac" },
  { name: "Amarillo", value: "#ffe52f" },
  { name: "Naranja", value: "#ff7a1a" },
  { name: "Violeta", value: "#a855f7" },
];

const waLink = "https://wa.me/5491164477337";

function ArrowIcon() { return <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CheckIcon() { return <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="m4.5 10 3.25 3.25L15.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function WhatsAppIcon() { return <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M20.5 11.8a8.48 8.48 0 0 1-8.6 8.35 8.72 8.72 0 0 1-4.1-1.03L3.5 20.5l1.4-4.08a8.15 8.15 0 0 1-1.12-4.14A8.48 8.48 0 0 1 12.38 4a8.48 8.48 0 0 1 8.12 7.8Z" stroke="currentColor" strokeWidth="1.6"/><path d="M9.08 8.23c.18-.4.37-.41.64-.42h.54c.16 0 .34.05.44.3.1.25.7 1.68.76 1.8.06.13.1.27.02.42-.08.16-.13.25-.25.38-.13.15-.27.32-.38.43-.13.13-.26.27-.11.52.15.25.68 1.09 1.46 1.76 1 .86 1.84 1.13 2.1 1.26.26.12.4.1.56-.06.16-.17.65-.76.83-1.02.17-.26.35-.22.59-.13.24.08 1.53.72 1.79.85.26.13.43.19.5.3.06.1.06.61-.14 1.2-.2.58-1.15 1.1-1.58 1.17-.43.07-.98.1-1.58-.1-.36-.11-.83-.27-1.43-.53a11.93 11.93 0 0 1-4.55-4.02c-.6-.83-1.23-1.85-1.23-2.87 0-1.02.54-1.52.73-1.73.19-.2.42-.25.56-.25Z" fill="currentColor"/></svg>; }

export default function Presupuesto() {
  const [projectType, setProjectType] = useState("Frase");
  
  // Ahora es un array para permitir múltiples colores
  const [selectedColors, setSelectedColors] = useState([colors[4].value]); 
  
  const [letterStyle, setLetterStyle] = useState("Cursiva");
  const [fileName, setFileName] = useState("");
  const [fileObjeto, setFileObjeto] = useState(null); // Guardamos el archivo físico
  
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    ideaText: "", ancho: "", alto: "", nombre: "", telefono: "", email: ""
  });

  // Lógica para seleccionar y deseleccionar múltiples colores
  const toggleColor = (colorValue) => {
    setSelectedColors((prev) => {
      if (prev.includes(colorValue)) {
        return prev.filter((c) => c !== colorValue); // Si ya está, lo saca
      } else {
        return [...prev, colorValue]; // Si no está, lo agrega
      }
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileObjeto(file);
    } else {
      setFileName("");
      setFileObjeto(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!terminosAceptados) return;
    if (selectedColors.length === 0) {
      setFeedback({ type: 'error', message: 'Por favor selecciona al menos un color.' });
      return;
    }

    setLoading(true);
    setFeedback({ type: '', message: '' });

    // Traducimos los códigos hexadecimales a los nombres legibles
    const colorNames = selectedColors
      .map(hex => colors.find(c => c.value === hex)?.name)
      .join(" + ");

    // Creamos un FormData (Obligatorio para enviar archivos por internet)
    const payload = new FormData();
    payload.append('nombre', formData.nombre);
    payload.append('email', formData.email);
    payload.append('telefono', formData.telefono);
    payload.append('projectType', projectType);
    payload.append('ideaText', formData.ideaText);
    payload.append('colores', colorNames);
    payload.append('estilo', letterStyle);
    payload.append('ancho', formData.ancho);
    payload.append('alto', formData.alto);

    // Adjuntamos la foto si el usuario subió una
    if (fileObjeto && projectType === "Logo") {
      payload.append('attachment', fileObjeto);
    }

    try {
      // Importante: al pasar FormData, Axios ajusta el Content-Type automáticamente a multipart/form-data
      await api.post('/cotizaciones/enviar', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setFeedback({ type: 'success', message: '¡Solicitud enviada exitosamente! Revisá tu correo.' });
      
      // Limpieza
      setFormData({ ideaText: "", ancho: "", alto: "", nombre: "", telefono: "", email: "" });
      setSelectedColors([colors[4].value]);
      setFileObjeto(null);
      setFileName("");
      setTerminosAceptados(false);
    } catch (error) {
      setFeedback({ type: 'error', message: 'Error al enviar. Intenta de nuevo o escribinos al WhatsApp.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Orbitron:wght@500;700;900&display=swap');
      `}</style>

      <main className="relative min-h-screen text-white font-['Rajdhani'] selection:bg-cyan-400 selection:text-black">
        
        {/* FONDO */}
        <div className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgLadrillos})` }}>
          <div className="absolute inset-0 bg-[#050508]/90 backdrop-grayscale-[0.5]"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pt-24 pb-20 md:px-8">
          <section className="flex flex-1 flex-col py-8 lg:py-12">
            
            <div className="mb-10 max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-cyan-400" />
                <p className="text-[11px] font-bold font-['Orbitron'] tracking-[0.24em] text-cyan-400 uppercase">Diseñado para impactar</p>
              </div>
              <h1 className="font-['Orbitron'] text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-4 leading-tight">
                Tu idea. <br className="hidden sm:block" />
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">En neón.</span>
              </h1>
              <p className="max-w-xl text-lg text-gray-400 font-medium">
                Cuéntanos qué imaginas y nuestro equipo creará una cotización a la medida de tu espacio.
              </p>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.85fr)]">
              
              {/* FORMULARIO */}
              <form onSubmit={handleSubmit} className="bg-[#111117]/80 backdrop-blur-md border border-white/5 rounded-sm p-6 sm:p-8 shadow-2xl">
                <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-bold font-['Orbitron'] text-cyan-400 tracking-[0.2em] uppercase">01 / Proyecto</p>
                    <h2 className="font-['Orbitron'] mt-1 text-lg font-bold tracking-wider uppercase text-white">Configura tu letrero</h2>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  
                  {/* Selector Frase o Logo */}
                  <fieldset className="sm:col-span-2">
                    <legend className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">¿Qué quieres crear?</legend>
                    <div className="grid grid-cols-2 gap-4">
                      {["Frase", "Logo"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`py-4 px-2 rounded-sm border flex justify-center items-center gap-2 font-['Orbitron'] text-xs font-bold tracking-widest uppercase transition-all ${projectType === type ? "border-cyan-400 bg-cyan-500/10 text-cyan-400" : "border-white/10 bg-[#0a0a0f] text-gray-500 hover:text-white"}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Input Principal */}
                  <label className="sm:col-span-2">
                    <span className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">
                      {projectType === "Frase" ? "Tu frase" : "Describe tu logo"}
                    </span>
                    <input required name="ideaText" value={formData.ideaText} onChange={handleInputChange} type="text" placeholder={projectType === "Frase" ? "Ej. Good vibes only" : "Ej. Logotipo circular para estudio creativo"} className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm p-4 text-white text-sm focus:border-cyan-400/50 outline-none transition-colors" />
                  </label>

                  {/* Opciones Condicionales */}
                  {projectType === "Frase" ? (
                    <fieldset className="sm:col-span-2">
                      <legend className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">Estilo de letra</legend>
                      <div className="grid grid-cols-3 gap-3">
                        {["Cursiva", "Imprenta", "Minúscula"].map((style) => (
                          <button key={style} type="button" onClick={() => setLetterStyle(style)} className={`py-3 px-2 rounded-sm border font-bold text-xs tracking-wider transition-all ${letterStyle === style ? "border-cyan-400 bg-cyan-500/10 text-cyan-400" : "border-white/10 bg-[#0a0a0f] text-gray-500 hover:text-white"}`}>
                            <span className={style === "Cursiva" ? "italic" : style === "Minúscula" ? "lowercase" : "uppercase"}>{style}</span>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ) : (
                    <label className="sm:col-span-2">
                      <span className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">Sube tu boceto</span>
                      <div className="relative flex items-center bg-[#0a0a0f] border border-white/10 rounded-sm p-3 cursor-pointer hover:border-cyan-400/30 transition-colors">
                        <input type="file" name="attachment" accept=".jpg,.jpeg,.png,.pdf,.svg" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                        <div className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center text-gray-400 mr-4">+</div>
                        <div className="flex-1 min-w-0">
                          <span className="block truncate text-sm font-bold text-white">{fileName || "Seleccionar archivo"}</span>
                          <span className="block text-xs text-gray-500 mt-1">JPG, PNG o PDF · Máx. 10 MB</span>
                        </div>
                        <span className="text-[10px] font-bold font-['Orbitron'] tracking-widest text-cyan-400 uppercase">Explorar</span>
                      </div>
                    </label>
                  )}

                  {/* Medidas */}
                  <label>
                    <span className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">Ancho Aprox.</span>
                    <div className="relative">
                      <input required name="ancho" value={formData.ancho} onChange={handleInputChange} type="number" min="10" placeholder="Ej. 80" className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm p-4 pr-12 text-white text-sm focus:border-cyan-400/50 outline-none transition-colors" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold uppercase">cm</span>
                    </div>
                  </label>
                  <label>
                    <span className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">Alto Aprox.</span>
                    <div className="relative">
                      <input required name="alto" value={formData.alto} onChange={handleInputChange} type="number" min="10" placeholder="Ej. 40" className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm p-4 pr-12 text-white text-sm focus:border-cyan-400/50 outline-none transition-colors" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold uppercase">cm</span>
                    </div>
                  </label>

                  {/* Datos Personales */}
                  <label>
                    <span className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">Tu Nombre</span>
                    <input required name="nombre" value={formData.nombre} onChange={handleInputChange} type="text" placeholder="Tu nombre" className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm p-4 text-white text-sm focus:border-cyan-400/50 outline-none transition-colors" />
                  </label>
                  <label>
                    <span className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">WhatsApp</span>
                    <input required name="telefono" value={formData.telefono} onChange={handleInputChange} type="tel" placeholder="+54 9 11 0000 0000" className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm p-4 text-white text-sm focus:border-cyan-400/50 outline-none transition-colors" />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="block text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-3">Correo electrónico</span>
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="tu@email.com" className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm p-4 text-white text-sm focus:border-cyan-400/50 outline-none transition-colors" />
                  </label>

                  {/* Colores Múltiples */}
                  <fieldset className="sm:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                      <legend className="text-xs font-bold font-['Orbitron'] text-gray-400 uppercase tracking-widest">Colores (Elegí uno o más)</legend>
                      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{selectedColors.length} Seleccionados</span>
                    </div>
                    <div className="flex flex-wrap gap-3 p-4 bg-[#0a0a0f] border border-white/10 rounded-sm">
                      {colors.map((color) => {
                        const isSelected = selectedColors.includes(color.value);
                        return (
                          <button
                            key={color.value}
                            type="button"
                            title={color.name}
                            onClick={() => toggleColor(color.value)}
                            className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${isSelected ? "scale-110 border-white" : "border-transparent opacity-50 hover:opacity-100"}`}
                            style={{
                              backgroundColor: color.value,
                              boxShadow: isSelected ? `0 0 14px ${color.value}90` : 'none',
                            }}
                          />
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
                
                <div className="mt-8 mb-6 flex items-start gap-3 bg-[#050508]/50 p-4 border border-white/5 rounded-sm">
                  <input type="checkbox" id="terminos" checked={terminosAceptados} onChange={(e) => setTerminosAceptados(e.target.checked)} className="mt-0.5 w-4 h-4 accent-cyan-500 cursor-pointer shrink-0" required />
                  <label htmlFor="terminos" className="text-gray-400 text-xs leading-relaxed select-none">
                    He leído y acepto los <a href="/terminos" target="_blank" className="text-cyan-400 hover:underline">Términos y Condiciones</a>.
                  </label>
                </div>

                {feedback.message && (
                  <div className={`mb-6 p-4 rounded-sm text-sm font-bold font-['Orbitron'] tracking-widest uppercase flex items-center gap-2 border ${feedback.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                    {feedback.message}
                  </div>
                )}

                <button type="submit" disabled={!terminosAceptados || loading} className={`w-full font-black font-['Orbitron'] py-4 px-6 rounded-sm uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${!terminosAceptados || loading ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed' : 'bg-cyan-500 hover:bg-white text-[#050508] shadow-[0_0_15px_rgba(0,240,255,0.3)]'}`}>
                  <span>{loading ? 'ENVIANDO...' : 'SOLICITAR COTIZACIÓN'}</span>
                  {!loading && <ArrowIcon />}
                </button>
              </form>

              {/* SIDEBAR DERECHO */}
              <aside className="space-y-6">
                <a href={waLink} target="_blank" rel="noreferrer" className="block bg-[#111117]/80 backdrop-blur-md border border-[#43e77d]/30 hover:border-[#43e77d] rounded-sm p-6 group transition-colors">
                  <div className="mb-6 flex items-start justify-between text-[#43e77d]">
                    <WhatsAppIcon />
                    <span className="flex items-center gap-2 text-[10px] font-bold font-['Orbitron'] tracking-widest uppercase border border-[#43e77d]/30 px-2 py-1 rounded-sm">
                      <span className="w-1.5 h-1.5 bg-[#43e77d] rounded-full animate-pulse" />
                      En línea
                    </span>
                  </div>
                  <h3 className="font-['Orbitron'] mt-2 text-xl font-bold uppercase text-white">¿Prefieres hablar<br />con un experto?</h3>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Escríbenos por WhatsApp</span>
                    <span className="text-[#43e77d] transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
                  </div>
                </a>
              </aside>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}