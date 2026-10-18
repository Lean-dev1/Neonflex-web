import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = () => {
  // Si el token es válido y no expiró, renderiza el componente hijo. 
  // Si es falso, corrupto o vencido, te manda al login reemplazando el historial.
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;