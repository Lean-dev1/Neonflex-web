import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  // Si no hay token, te manda al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, te deja pasar (renderiza la ruta hija)
  return <Outlet />;
};

export default ProtectedRoute;