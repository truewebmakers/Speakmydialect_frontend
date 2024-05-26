import { useAuth } from "@/context/authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import DasbPageMyProfile from "@/pages/dashboard/my-profile";
import HomePage1 from "@/pages/home";
import { DasbPageDashboard } from "@/pages/dashboard/dashboard";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import TermsPage from "@/pages/terms";
import ContactPage from "@/pages/contact";
import HelpPage from "@/pages/help";
import AboutPage2 from "@/pages/about/about-2";
import BlogPage1 from "@/pages/blog/blog-1";
import FaqPage from "@/pages/faq";
import RedirectRoute from "./redirectionRoutes";

const AppRoutes = () => {
  const { token } = useAuth();
  console.log(token);

  const routesForPublic = [
    { path: "/", element: <HomePage1 /> },
    { path: "/terms", element: <TermsPage /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/help", element: <HelpPage /> },
    { path: "/about-2", element: <AboutPage2 /> },
    { path: "/blog-1", element: <BlogPage1 /> },
    { path: "/faq", element: <FaqPage /> },
  ];

  const routesForAuthenticatedOnly = [
    { path: "dashboard", element: <DasbPageDashboard /> },
    { path: "my-profile", element: <DasbPageMyProfile /> },
  ];

  const routesForNotAuthenticatedOnly = [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ];

  return (
    <Routes>
      {routesForPublic.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {token ? (
        <Route path="/" element={<ProtectedRoute />}>
          {routesForAuthenticatedOnly.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      ) : (
        routesForNotAuthenticatedOnly.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RedirectRoute
                to="/dashboard"
                condition={token}
                redirectTo="/login"
              >
                {route.element}
              </RedirectRoute>
            }
          />
        ))
      )}

      <Route
        path="/login"
        element={
          <RedirectRoute to="/dashboard" condition={token} redirectTo="/login">
            <LoginPage />
          </RedirectRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
