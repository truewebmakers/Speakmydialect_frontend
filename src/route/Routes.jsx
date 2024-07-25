import { Routes, Route } from "react-router-dom";
import ServicePage1 from "../pages/service/service-1";
import ServicePage2 from "../pages/service/service-2";
import ServicePage4 from "../pages/service/service-4";
import ServicePage3 from "../pages/service/service-3";
import ServicePage5 from "../pages/service/service-5";
import ServicePage6 from "../pages/service/service-6";
import ServicePage7 from "../pages/service/service-7";
import ServicePageSingle1 from "../pages/service/service-single";
import ServicePageSingle11 from "../pages/service/service-single/[id]";
import ServicePageSingle2 from "../pages/service/service-single-v2";
import ServicePageSingle22 from "../pages/service/service-single-v2/[id]";
import ServicePageSingle3 from "../pages/service/service-single-v3";
import ServicePageSingle33 from "../pages/service/service-single-v3/[id]";
import ServicAllePage from "../pages/service/service-all";
import ProjectPage1 from "../pages/project/project-1";
import ProjectPage2 from "../pages/project/project-2";
import ProjectPage3 from "../pages/project/project-3";
import ProjectPage4 from "../pages/project/project-4";
import ProjectPageSingle1 from "../pages/project/project-single";
import ProjectPageSingle11 from "../pages/project/project-single/[id]";
import ProjectPageSingle2 from "../pages/project/project-single-v2";
import ProjectPageSingle22 from "../pages/project/project-single-v2/[id]";
import ProjectPageSingle3 from "../pages/project/project-single-v3";
import ProjectPageSingle33 from "../pages/project/project-single-v3/[id]";
import JobPage1 from "../pages/job/job-1";
import JobPage2 from "../pages/job/job-2";
import JobPage3 from "../pages/job/job-3";
import JobPageSingle1 from "../pages/job/job-single";
import JobPageSingle11 from "../pages/job/job-single/[id]";
import DasbPageDashboard from "../pages/dashboard/dashboard";
import DasbPageProposal from "../pages/dashboard/proposal";
import DasbPageSaved from "../pages/dashboard/saved";
import DasbPageMessage from "../pages/dashboard/message";
import DasbPageReviews from "../pages/dashboard/reviews";
import DasbPageInvoice from "../pages/dashboard/invoice";
import DasbPagePayouts from "../pages/dashboard/payouts";
import DasbPageStatements from "../pages/dashboard/statements";
import DasbPageManageJobs from "../pages/dashboard/manage-jobs";
import DasbPageManageService from "../pages/dashboard/manage-services";
import DasbPageManageProjects from "../pages/dashboard/manage-projects";
import DasbPageCreateProject from "../pages/dashboard/create-projects";
import DasbPageMyProfile from "../pages/dashboard/my-profile";
import LoginPage from "../pages/auth/login";
import EmploeePage1 from "../pages/employee/employee-1";
import EmploeePage2 from "../pages/employee/employee-2";
import EmploeePageSingle1 from "../pages/employee/employee-single";
import EmploeePageSingle11 from "../pages/employee/employee-single/[id]";
import FreelancerPage1 from "../pages/freelancer/freelancer-1";
import FreelancerPage2 from "../pages/freelancer/freelancer-2";
import FreelancerPage3 from "../pages/freelancer/freelancer-3";
import FreelancerPageSingle1 from "../pages/freelancer/freelancer-single";
import FreelancerPageSingle11 from "../pages/freelancer/freelancer-single/[id]";
import FreelancerPageSingle2 from "../pages/freelancer/freelancer-single-v2";
import FreelancerPageSingle22 from "../pages/freelancer/freelancer-single-v2/[id]";
import FreelancerPageSingle3 from "../pages/freelancer/freelancer-single-v3";
import FreelancerPageSingle33 from "../pages/freelancer/freelancer-single-v3/[id]";
import BecameSellerPage from "../pages/become-seller";
import AboutPage1 from "../pages/about/about-1";
import AboutPage2 from "../pages/about/about-2";
import BlogPage1 from "../pages/blog/blog-1";
import BlogPage2 from "../pages/blog/blog-2";
import BlogPage3 from "../pages/blog/blog-3";
import BlogSinglePage1 from "../pages/blog/blog-single";
import BlogSinglePage11 from "../pages/blog/blog-single/[id]";
import ShopPageList from "../pages/shop/shop-list";
import ShopPageCart from "../pages/shop/shop-cart";
import ShopPageCheckout from "../pages/shop/shop-checkout";
import ShopPageOrder from "../pages/shop/shop-order";
import ShopPageSingle1 from "../pages/shop/shop-single";
import ShopPageSingle11 from "../pages/shop/shop-single/[id]";
import ContactPage from "../pages/contact";
import NotFound from "../pages/not_found";
import FaqPage from "../pages/faq";
import HelpPage from "../pages/help";
import InvoicePage from "../pages/invoices";
import PricingPage from "../pages/pricing";
import RegisterPage from "../pages/auth/register";
import TermsPage from "../pages/terms";
import PrivacyPage from "../pages/privacy";


import UIElementsPage from "../pages/ui-elements";
import HomePage1 from "../pages/home";
import PrivacyPolicy from "@/components/section/privacyPolicy";

export default function RoutesComponent() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<NotFound />} /> */}
        <Route path="/">
          <Route index element={<HomePage1 />} />
          <Route path="/" element={<HomePage1 />} />
          <Route path="service-1" element={<ServicePage1 />} />
          <Route path="service-2" element={<ServicePage2 />} />
          <Route path="service-3" element={<ServicePage3 />} />
          <Route path="service-4" element={<ServicePage4 />} />
          <Route path="service-5" element={<ServicePage5 />} />
          <Route path="service-6" element={<ServicePage6 />} />
          <Route path="service-7" element={<ServicePage7 />} />
          <Route path="service-single" element={<ServicePageSingle1 />} />
          <Route path="service-single/:id" element={<ServicePageSingle11 />} />
          <Route path="service-single-v2" element={<ServicePageSingle2 />} />
          <Route
            path="service-single-v2/:id"
            element={<ServicePageSingle22 />}
          />
          <Route path="service-single-v3" element={<ServicePageSingle3 />} />
          <Route
            path="service-single-v3/:id"
            element={<ServicePageSingle33 />}
          />
          <Route path="service-all" element={<ServicAllePage />} />
          <Route path="project-1" element={<ProjectPage1 />} />
          <Route path="project-2" element={<ProjectPage2 />} />
          <Route path="project-3" element={<ProjectPage3 />} />
          <Route path="project-4" element={<ProjectPage4 />} />
          <Route path="project-single" element={<ProjectPageSingle1 />} />
          <Route path="project-single/:id" element={<ProjectPageSingle11 />} />
          <Route path="project-single-v2" element={<ProjectPageSingle2 />} />
          <Route
            path="project-single-v2/:id"
            element={<ProjectPageSingle22 />}
          />
          <Route path="project-single-v3" element={<ProjectPageSingle3 />} />
          <Route
            path="project-single-v3/:id"
            element={<ProjectPageSingle33 />}
          />
          <Route path="job-1" element={<JobPage1 />} />
          <Route path="job-2" element={<JobPage2 />} />
          <Route path="job-3" element={<JobPage3 />} />
          <Route path="job-single" element={<JobPageSingle1 />} />
          <Route path="job-single/:id" element={<JobPageSingle11 />} />

          <Route path="dashboard" element={<DasbPageDashboard />} />
          <Route path="proposal" element={<DasbPageProposal />} />
          <Route path="jobs" element={<DasbPageSaved />} />
          <Route path="message" element={<DasbPageMessage />} />
          <Route path="reviews" element={<DasbPageReviews />} />
          <Route path="invoice" element={<DasbPageInvoice />} />
          <Route path="payouts" element={<DasbPagePayouts />} />
          <Route path="statements" element={<DasbPageStatements />} />
          <Route path="manage-services" element={<DasbPageManageService />} />
          <Route path="manage-jobs" element={<DasbPageManageJobs />} />
          <Route path="manage-projects" element={<DasbPageManageProjects />} />
          <Route path="add-services" element={<DasbPageDashboard />} />
          <Route path="create-projects" element={<DasbPageCreateProject />} />
          <Route path="my-profile" element={<DasbPageMyProfile />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="employee-1" element={<EmploeePage1 />} />
          <Route path="employee-2" element={<EmploeePage2 />} />
          <Route path="employee-single" element={<EmploeePageSingle1 />} />
          <Route path="employee-single/:id" element={<EmploeePageSingle11 />} />
          <Route path="freelancer-1" element={<FreelancerPage1 />} />
          <Route path="freelancer-2" element={<FreelancerPage2 />} />
          <Route path="freelancer-3" element={<FreelancerPage3 />} />
          <Route path="freelancer-single" element={<FreelancerPageSingle1 />} />
          <Route
            path="freelancer-single/:id"
            element={<FreelancerPageSingle11 />}
          />
          <Route
            path="freelancer-single-v2"
            element={<FreelancerPageSingle2 />}
          />
          <Route
            path="freelancer-single-v2/:id"
            element={<FreelancerPageSingle22 />}
          />
          <Route
            path="freelancer-single-v3"
            element={<FreelancerPageSingle3 />}
          />
          <Route
            path="freelancer-single-v3/:id"
            element={<FreelancerPageSingle33 />}
          />
          <Route path="become-seller" element={<BecameSellerPage />} />
          <Route path="about-1" element={<AboutPage1 />} />
          <Route path="about-2" element={<AboutPage2 />} />
          <Route path="blog-1" element={<BlogPage1 />} />
          <Route path="blog-2" element={<BlogPage2 />} />
          <Route path="blog-3" element={<BlogPage3 />} />
          <Route path="blog-single" element={<BlogSinglePage1 />} />
          <Route path="blog-single/:id" element={<BlogSinglePage11 />} />
          <Route path="shop-list" element={<ShopPageList />} />
          <Route path="shop-cart" element={<ShopPageCart />} />
          <Route path="shop-checkout" element={<ShopPageCheckout />} />
          <Route path="shop-order" element={<ShopPageOrder />} />
          <Route path="shop-single" element={<ShopPageSingle1 />} />
          <Route path="shop-single/:id" element={<ShopPageSingle11 />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="invoices" element={<InvoicePage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="ui-elements" element={<UIElementsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
