import { useAuth } from "@/context/authContext";
import { memo } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  return token?.length > 0 ? children : <Navigate to="/login" replace />;
};

export default memo(ProtectedRoute);
