import { Navigate, Outlet } from "react-router-dom";
import UseAuthStore from "../stores/useAuthStore"
const ProtectedRoute = () => {
    const user = UseAuthStore((state) => state.user);
    return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute