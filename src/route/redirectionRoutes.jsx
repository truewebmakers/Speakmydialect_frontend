import { Navigate } from "react-router-dom";

const RedirectRoute = ({ to, condition, redirectTo, children }) => {
  return condition ? <Navigate to={redirectTo} /> : children;
};

export default RedirectRoute;
