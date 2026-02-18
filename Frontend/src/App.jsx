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

function App() {
  return (
    <BrowserRouter>
      {/* QUITAMOS 'bg-neutral-950' de aquí. Ahora el fondo es transparente por defecto. */}
      <div className="flex flex-col min-h-screen text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute />}>
               <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;