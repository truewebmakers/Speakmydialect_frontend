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

const AppRoutes = () => {
  const { token } = useAuth();
  console.log(token, "tokennn");
  return (
    <Routes>
      <Route path="/" element={<HomePage1 />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/about-2" element={<AboutPage2 />} />
      <Route path="/blog-1" element={<BlogPage1 />} />
      <Route path="/faq" element={<FaqPage />} />

      {token ? (
        (console.log("hiii"),
        (
          <>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="my-profile" element={<DasbPageMyProfile />} />
              <Route path="dashboard" element={<DasbPageDashboard />} />
            </Route>
          </>
        ))
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-translator" element={<RegisterPage />} />
          <Route path="/register-client" element={<RegisterPage />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
