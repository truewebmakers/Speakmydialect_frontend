import { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user?.token?.length > 0 ? children : <Navigate to="/login" replace />;
};

export default memo(ProtectedRoute);
