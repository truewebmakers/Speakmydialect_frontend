import { Navigate } from "react-router-dom";

export const handleLogoutClick = () => {
  localStorage.clear();
  sessionStorage.clear();

  Navigate("/login");
};
