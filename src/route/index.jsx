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
import NotFound from "@/pages/not_found";
import { Suspense } from "react";
import DasbPageSaved from "@/pages/dashboard/saved";
import DasbPagePayouts from "@/pages/dashboard/payouts";
import FreelancerPage1 from "@/pages/searchHandler/onSearchClick";

const AppRoutes = () => {
  const { token } = useAuth();
  console.log(token, "tokennn");
  return (
    <Suspense fallback>
      <Routes>
        {/* Conditional Routes */}
        <Route
          path="/login"
          element={
            !token?.length > 0 ? (
              <LoginPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/register-translator"
          element={
            !token?.length > 0 ? (
              <RegisterPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/register-client"
          element={
            !token?.length > 0 ? (
              <RegisterPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        {/* Publc Routesss */}
        <Route path="/" element={<HomePage1 />} />
        <Route path="/" element={<HomePage1 />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/about-2" element={<AboutPage2 />} />
        <Route path="/blog-1" element={<BlogPage1 />} />
        <Route path="/faq" element={<FaqPage />} />
        {/* Private Routes */}
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <DasbPageMyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DasbPageDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <DasbPageSaved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <DasbPagePayouts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <DasbPageSaved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <FreelancerPage1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payouts"
          element={
            <ProtectedRoute>
              <DasbPagePayouts />
            </ProtectedRoute>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
