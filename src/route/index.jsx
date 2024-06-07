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
import ProjectPage1 from "@/pages/searchHandler/onSearchClick";
import { useSelector } from "react-redux";
import { routes } from "@/constants/constant";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Suspense fallback>
      <Routes>
        {/* Conditional Routes */}
        <Route
          path={routes.Login}
          element={
            !user?.token ? (
              <LoginPage />
            ) : (
              <Navigate to={routes.MyProfile} replace />
            )
          }
        />
        <Route
          path={routes.TranslatorRegister}
          element={
            !user?.token?.length > 0 ? (
              <RegisterPage />
            ) : (
              <Navigate to={routes.MyProfile} replace />
            )
          }
        />
        <Route
          path={routes.ClientRegister}
          element={
            !user?.token?.length > 0 ? (
              <RegisterPage />
            ) : (
              <Navigate to={routes.MyProfile} replace />
            )
          }
        />
        {/* Publc Routesss */}
        <Route path={routes.Home} element={<HomePage1 />} />
        <Route path={routes.Terms} element={<TermsPage />} />
        <Route path={routes.Contact} element={<ContactPage />} />
        <Route path={routes.Help} element={<HelpPage />} />
        <Route path={routes.About} element={<AboutPage2 />} />
        <Route path={routes.Blog} element={<BlogPage1 />} />
        <Route path={routes.Faq} element={<FaqPage />} />
        {/* Private Routes */}
        <Route
          path={routes.MyProfile}
          element={
            <ProtectedRoute>
              <DasbPageMyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.Dashboard}
          element={
            <ProtectedRoute>
              <DasbPageDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.Jobs}
          element={
            <ProtectedRoute>
              <DasbPageSaved />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.Cards}
          element={
            <ProtectedRoute>
              <DasbPagePayouts />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.Orders}
          element={
            <ProtectedRoute>
              <DasbPageSaved />
            </ProtectedRoute>
          }
        />
        <Route path={routes.Search} element={<ProjectPage1 />} />
        <Route
          path={routes.Payouts}
          element={
            <ProtectedRoute>
              <DasbPagePayouts />
            </ProtectedRoute>
          }
        />
        <Route path={routes.NotFound} element={<NotFound />} />
        <Route
          path={routes.Nothing}
          element={<Navigate to={routes.Home} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
