import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Productos from './pages/Productos.jsx';
import Presupuesto from './pages/Presupuesto.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetail from './pages/ProductDetail';
function App() {
  return (
    <BrowserRouter>
      {/* CAMBIO AQUÍ: Fondo blanco por defecto, neutral-950 en modo oscuro */}
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}><Route path="/admin" element={<Admin />} /></Route>
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;