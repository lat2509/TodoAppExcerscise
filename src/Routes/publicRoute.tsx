import useAuthStore from '../stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const user = useAuthStore(state => state.user);
  return user ? <Navigate to="/todo" replace /> : <Outlet />;
};

export default PublicRoute;
