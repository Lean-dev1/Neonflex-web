import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // <--- Importamos el componente nuevo
import Footer from './components/Footer';
// Páginas
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Productos from './pages/Productos.jsx';
import Presupuesto from './pages/Presupuesto.jsx';
import Nosotros from './pages/Nosotros.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white">
        
        {/* Aquí va la Navbar nueva */}
        <Navbar />

        {/* Contenido Principal */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;