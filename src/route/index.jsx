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
import SearchPage from "@/pages/searchHandler/searchPage";
import { useSelector } from "react-redux";
import { routes } from "@/constants/constant";
import TranslatorsProfile from "@/pages/profiles/translatorProfile";
import HireNowPage from "@/pages/hire";
import InvoiceComponent from "@/pages/dashboard/invoices";
import UserApprovals from "@/pages/admin/userApproval";
import ChooseUserType from "@/pages/auth/register/chooseUserType";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  let routeProfile = sessionStorage.getItem("redirectAfterLogin");
  return (
    <Suspense fallback>
      <Routes>
        {/* Conditional Routes */}
        <Route
          path={routes.Login}
          element={
            !user?.token ? (
              <LoginPage />
            ) : routeProfile ? (
              <Navigate to={routeProfile} replace />
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
        <Route
          path={routes.Register}
          element={
            !user?.token?.length > 0 ? (
              <ChooseUserType />
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
          path={routes.Bookings}
          element={
            <ProtectedRoute>
              <DasbPageSaved />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.UserApprovals}
          element={
            <ProtectedRoute>
              <UserApprovals />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.PayoutManagement}
          element={
            <ProtectedRoute>
              <DasbPagePayouts />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.Invoice}
          element={
            <ProtectedRoute>
              <InvoiceComponent />
            </ProtectedRoute>
          }
        />

        <Route path={routes.Search} element={<SearchPage />} />
        <Route path={routes.HireNow} element={<HireNowPage />} />

        <Route
          path={routes.TranslatorProfile}
          element={<TranslatorsProfile />}
        />
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
