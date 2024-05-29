export const handleLogoutClick = () => {
  localStorage.clear();
  Navigate("/login");
};
