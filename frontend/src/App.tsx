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
import PropertyDetails from "./components/PropertyDetails";
import AboutUs from "./components/landingpages/Aboutus";
import ContactUs from "./components/landingpages/Contactus";
import PrivacyPolicy from "./components/landingpages/PrivacyPolicy";
import TenancyPolicy from "./components/landingpages/TenancyPolicy";
import PropertyDashboard from "./components/Empdashboard/Empdasboard";

const App = () => {
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is not defined");
  }
  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Homepage" replace />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/admin-dashboard" element={<AccessManagementTable />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/Privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/Tenancypolicy" element={<TenancyPolicy />} />
          <Route path="/owner-page" element={<OwnerPage />} />
          <Route path="/service-page" element={<Services />} />
          <Route path="/Tenanthome" element={<Tenanthome />} />
          <Route path="/Fullpage/:id" element={<Fullpage propertyId={""} />} />
          <Route path="/google" element={<MapComponent />} />
          <Route path="/property-page/:id" element={<PropertyDetails />} />
          <Route path="/Empdashboard" element={<PropertyDashboard />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
