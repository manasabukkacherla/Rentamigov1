import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccessManagementTable from "./components/access-management-table";
import Services from "./components/Service-page-components/Services";
import Homepage from "./components/landingpages/home";

import OwnerPage from "./components/ownerPage-components/OwnerPage";
import Fullpage from "./components/fullpages/Fullpage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MapComponent from "./components/MapComponent";
import AboutUs from "./components/landingpages/Aboutus";
import ContactUs from "./components/landingpages/Contactus";
import PrivacyPolicy from "./components/landingpages/PrivacyPolicy";
import TenancyPolicy from "./components/landingpages/TenancyPolicy";
import HomePage from "./components/blogs/HomePage";

import Loginhome from "./components/Logins/Loginhome";
import Propertmain from "./components/updatedpropertyForms/Propertmain";
import CreateBlogPage from "./components/blogs/CreateBlogPage";

import UsrDashboard from "./components/UsrDasboard/UsrDashboard";

import Admindash from "./components/dashadmin/admdashboard";
import Empapp from "./components/Empdashboaed/Empdasboard";
import Propertydetail from "./components/propertiesdetails/App";
import UserDashboard from "./components/blogs/UserDashboard";
import BlogDetail from "./components/blogs/BlogDetail";
import EditorMenuBar from "./components/editor/EditorMenuBar";
import EmployeeLogin from "./components/Logins/EmployeeLogin";

const App = () => {
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is not defined");
  }

  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const storedUser = sessionStorage.getItem("user");
  console.log(storedUser);

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              storedUser && JSON.parse(storedUser)?.role === "manager" ? (
                <Navigate to="/empdash" replace />
              ) : (
                <Homepage />
              )
            }
          />
          {/* Redirect "/" to "/Homepage" */}
          <Route path="/" element={<Navigate to="/Homepage" replace />} />
          {/* Public Routes */}
          <Route path="/Homepage" element={<Homepage />} />

          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/Privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/Tenancypolicy" element={<TenancyPolicy />} />
          <Route path="/propertydetails" element={<Propertydetail />} />

          <Route path="/updatePropertyform" element={<Propertmain />} />

          {/* Owner and Tenant Routes */}
          <Route path="/owner-page" element={<OwnerPage />} />
          <Route path="/service-page" element={<Services />} />

          <Route path="/Userdashboard/" element={<UsrDashboard />} />

          {/* Property and Map Pages */}
          <Route path="/Fullpage/:id" element={<Fullpage />} />
          <Route path="/google" element={<MapComponent propertyId={""} />} />

          {/* Admin Dashboard */}
          <Route path="/admin-dashboard" element={<AccessManagementTable />} />

          {/* Propery details Page*/}

          {/* new admin dashboard*/}
          <Route path="/admindash" element={<Admindash />} />
          <Route path="/empdash" element={<Empapp />} />
          <Route path="/propertypage" element={<Propertydetail />} />
          {/* Logins Layout */}
          <Route path="/Login" element={<Loginhome />} />
          <Route path="/emp-login" element={<EmployeeLogin onSwitchToSignup={function (): void {
            throw new Error("Function not implemented.");
          } } onLoginSuccess={function (): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="/blogs" element={<HomePage />} />
          <Route path="/blogs/Create" element={<CreateBlogPage />} />
          {/* Dashboard Layout */}
          <Route path="/blogs/Dashboard" element={<UserDashboard />} />
          <Route
            path="/blogs/edit/:id"
            element={<EditorMenuBar editor={null} />}
          />

          <Route path="/blogs/:id" element={<BlogDetail />} />

          {/* Catch-All Route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
          {/* Redirect to dashboard on load */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Admindash />} />
        <Route path="/properties" element={<Admindash activeSection="properties" />} />
        <Route path="/revenue" element={<Admindash activeSection="revenue" />} />
        <Route path="/employees" element={<Admindash activeSection="employees" />} />
        <Route path="/analytics" element={<Admindash activeSection="analytics" />} />
        <Route path="/users" element={<Admindash activeSection="users" />} />
        <Route path="/notifications" element={<Admindash activeSection="notifications" />} />
        <Route path="/settings" element={<Admindash activeSection="settings" />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
