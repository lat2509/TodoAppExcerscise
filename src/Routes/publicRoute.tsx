import UseAuthStore from "../stores/useAuthStore"
import { Navigate, Outlet } from "react-router-dom";


const PublicRoute = () => {
    const user = UseAuthStore((state) => state.user);
    return user ? <Navigate to="/todo" replace /> : <Outlet />
}

export default PublicRoute