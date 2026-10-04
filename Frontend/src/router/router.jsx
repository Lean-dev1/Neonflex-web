import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/Home.jsx';
import Admin from '../pages/Admin.jsx';
import Productos from '../pages/Productos.jsx';
import Presupuesto from '../pages/Presupuesto.jsx';
import Nosotros from '../pages/Nosotros.jsx';
import Login from '../pages/Login.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import ProductDetail from '../pages/ProductDetail.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos', element: <Productos /> },
      { path: 'presupuesto', element: <Presupuesto /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'login', element: <Login /> },
      { path: 'producto/:id', element: <ProductDetail /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'admin', element: <Admin /> },
        ],
      },
    ],
  },
]);