import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/AvisoPrivacidad.jsx'; 
import ProtectedRoute from './components/ProtectedRoute';

// 1. Convertimos los imports estáticos en dinámicos (Lazy Loading)
const Home = lazy(() => import('./pages/Home.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const Productos = lazy(() => import('./pages/Productos.jsx'));
const Presupuesto = lazy(() => import('./pages/Presupuesto.jsx'));
const Nosotros = lazy(() => import('./pages/Nosotros.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          {/* 2. Suspense muestra esta pantalla de carga ultraligera mientras se descarga la página solicitada */}
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#050508]">
              <span className="text-cyan-400 font-['Orbitron'] font-black uppercase tracking-widest animate-pulse">
                Cargando...
              </span>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/presupuesto" element={<Presupuesto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="/producto/:id" element={<ProductDetail />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <CookieBanner />
    </BrowserRouter>
  );
}

export default App;