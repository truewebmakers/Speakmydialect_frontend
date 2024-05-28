import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
