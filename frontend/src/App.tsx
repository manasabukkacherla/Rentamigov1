import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import Notifications from './components/Empdashboaed/components/Notifications';


// Import all your components
import AccessManagementTable from "./components/access-management-table";
import Services from "./components/Service-page-components/Services";
import Homepage from "./components/landingpages/home";
import OwnerPage from "./components/ownerPage-components/OwnerPage";
import Fullpage from "./components/fullpages/Fullpage";
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
import Revenue from "./components/dashadmin/components/Revenue";
import BugReportPage from "./components/bug-report/BugReportPage";
import BugDashboard from "./components/bug-dashboard/BugDashboard";
import TenantProperties from "./components/tenantProperties";
import ErrorBoundary from "./components/blogs/ErrorBoundary";
import Chatbottt from './components/chatbott/App';
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
 
  const [isEmployee, setIsEmployee] = useState(false);

  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is not defined");
  }

  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const storedUser = sessionStorage.getItem("user");
  const toggleView = () => setIsEmployee(!isEmployee);

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <ToastContainer />
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
         
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/Privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/Tenancypolicy" element={<TenancyPolicy />} />
          <Route path="/propertydetails" element={<Propertydetail />} />
          <Route path="/report-bug" element={<BugReportPage />} />
          <Route path="/bug-dashboard" element={<BugDashboard />} />
          <Route path="/tenantProperties" element={<TenantProperties/>} />
          <Route path="/updatePropertyform" element={<Propertmain />} />
          <Route path="/owner-page" element={<OwnerPage />} />
          <Route path="/service-page" element={<Services />} />
          <Route path="/Userdashboard/*" element={<UsrDashboard />} />
          <Route path="/Fullpage/:id" element={<Fullpage />} />
          <Route path="/google" element={<MapComponent propertyId={""} />} />
          <Route path="/admin-dashboard" element={<AccessManagementTable />} />
          <Route path="/admindash" element={<Admindash />} />
          <Route path="/admindash/dashboard" element={<Admindash defaultSection="dashboard" />} />
          <Route path="/admindash/properties" element={<Admindash defaultSection="properties" />} />
          <Route path="/admindash/revenue" element={<Admindash defaultSection="revenue" />} />
          <Route path="/admindash/employees" element={<Admindash defaultSection="employees" />} />
          <Route path="/admindash/analytics" element={<Admindash defaultSection="analytics" />} />
          <Route path="/admindash/users" element={<Admindash defaultSection="users" />} />
          <Route path="/admindash/bug-reports" element={<Admindash defaultSection="bug-reports" />} />
          <Route path="/admindash/notifications" element={<Admindash defaultSection="notifications" />} />
          <Route path="/admindash/settings" element={<Admindash defaultSection="settings" />} />
          <Route path="/empdash" element={<Empapp />} />
          <Route path="/propertypage" element={<Propertydetail />} />
          <Route path="/Login" element={<Loginhome />} />
          {/*chatbot*/}
          <Route path="/chatbot" element={<Chatbottt />} />
          <Route
          
            path="/emp-login"
            element={
              <EmployeeLogin
                onSwitchToSignup={(): void => {
                  throw new Error("Function not implemented.");
                }}
                onLoginSuccess={(_email: string): void => {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route path="/blogs" element={<HomePage />} />
          <Route path="/blogs/Create" element={<CreateBlogPage />} />
          <Route path="/blogs/edit/:id" element={<CreateBlogPage />} />
          <Route path="/blogs/Dashboard" element={<UserDashboard />} />
          <Route path="/blogs/edit/:id" element={<EditorMenuBar editor={null} />} />
          <Route path="revenue" element={<Revenue />} />
          <Route
            path="/blogs/:id"
            element={
              <ErrorBoundary>
                <BlogDetail />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;