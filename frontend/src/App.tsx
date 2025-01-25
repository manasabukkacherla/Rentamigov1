import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUpForm from "./components/signup-form";
import { LoginForm } from "./components/signin-form";
import AccessManagementTable from "./components/access-management-table";
import Services from "./components/Service-page-components/Services";
import Homepage from "./components/landingpages/home";
import Tenanthome from "./components/tenantspages/tenanthome";
import OwnerPage from "./components/ownerPage-components/OwnerPage";
import Fullpage from "./components/fullpages/Fullpage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MapComponent from "./components/MapComponent";
import AboutUs from "./components/landingpages/Aboutus";
import ContactUs from "./components/landingpages/Contactus";
import PrivacyPolicy from "./components/landingpages/PrivacyPolicy";
import TenancyPolicy from "./components/landingpages/TenancyPolicy";
import PropertyDashboard from "./components/Empdashboard/Empdasboard";
import PropertyPage from "./components/layouts/base";

const App = () => {
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is not defined");
  }

  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <BrowserRouter>
        <Routes>
          {/* Redirect "/" to "/Homepage" */}
          <Route path="/" element={<Navigate to="/Homepage" replace />} />

          {/* Public Routes */}
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/Privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/Tenancypolicy" element={<TenancyPolicy />} />

          {/* Owner and Tenant Routes */}
          <Route path="/owner-page" element={<OwnerPage />} />
          <Route path="/service-page" element={<Services />} />
          <Route path="/Tenanthome" element={<Tenanthome />} />

          {/* Property and Map Pages */}
          <Route path="/Fullpage/:id" element={<Fullpage />} />
          <Route path="/google" element={<MapComponent propertyId={""} />} />

          {/* Admin Dashboard */}
          <Route path="/admin-dashboard" element={<AccessManagementTable />} />
          <Route path="/Empdashboard" element={<PropertyDashboard />} />

          <Route path="/property-listing-form" element={<PropertyPage/>} />
          {/* Base Layout */}
          <Route path="/base" element={<PropertyPage />} />

          {/* Catch-All Route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
