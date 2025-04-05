import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import AccessManagementTable from "./components/access-management-table"
import Services from "./components/Service-page-components/Services"
import Homepage from "./components/landingpages/home"

import OwnerPage from "./components/ownerPage-components/OwnerPage"
import Fullpage from "./components/fullpages/Fullpage"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import MapComponent from "./components/MapComponent"
import AboutUs from "./components/landingpages/Aboutus"
import ContactUs from "./components/landingpages/Contactus"
import PrivacyPolicy from "./components/landingpages/PrivacyPolicy"
import TenancyPolicy from "./components/landingpages/TenancyPolicy"
import HomePage from "./components/blogs/HomePage"

import Loginhome from "./components/Logins/Loginhome"
import Propertmain from "./components/updatedpropertyForms/Propertmain"
import CreateBlogPage from "./components/blogs/CreateBlogPage"

import UsrDashboard from "./components/UsrDasboard/UsrDashboard"

import Admindash from "./components/dashadmin/admdashboard"
import Empapp from "./components/Empdashboaed/Empdasboard"
import Propertydetail from "./components/propertiesdetails/App"
import UserDashboard from "./components/blogs/UserDashboard"
import BlogDetail from "./components/blogs/BlogDetail"
import EditorMenuBar from "./components/editor/EditorMenuBar"
import EmployeeLogin from "./components/Logins/EmployeeLogin"
import Revenue from "./components/dashadmin/components/Revenue"
import BugReportPage from "./components/bug-report/BugReportPage"
import BugDashboard from "./components/bug-dashboard/BugDashboard"
import TenantProperties from "./components/tenantProperties"
import Chatbottt from './components/chatbott/App';
// import PropertyDetailPage from "./components/PropertyDetailPage"
// import {AuthProvider} from "./context/AuthContext";
import { ToastContainer } from "react-toastify"
import ErrorBoundary from "./components/blogs/ErrorBoundary"
import { Toaster } from 'react-hot-toast';

const App = () => {
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is not defined")
  }

  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID

  const storedUser = sessionStorage.getItem("user")
  // console.log(storedUser);

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen w-full bg-white">
        <GoogleOAuthProvider clientId={client_id}>
          <ToastContainer />
          <BrowserRouter>
            {/* <AuthProvider> */}
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
              <Route path="/report-bug" element={<BugReportPage />} />
              <Route path="/bug-dashboard" element={<BugDashboard />} />
              <Route path="/tenantProperties" element={<TenantProperties />} />
              <Route path="/updatePropertyform" element={<Propertmain />} />

              {/* New route for property details with ID parameter */}
              {/* <Route path="/property-details/:id" element={<PropertyDetailPage />} /> */}

              {/* Owner and Tenant Routes */}
              <Route path="/owner-page" element={<OwnerPage />} />
              <Route path="/service-page" element={<Services />} />

              <Route path="/Userdashboard/*" element={<UsrDashboard />} />

              {/* Property and Map Pages */}
              <Route path="/Fullpage/:id" element={<Fullpage />} />
              <Route path="/google" element={<MapComponent propertyId={""} />} />

              {/* Admin Dashboard */}
              <Route path="/admin-dashboard" element={<AccessManagementTable />} />

              {/* Propery details Page*/}

              {/* Admin Dashboard Routes */}
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
              {/* Logins Layout */}
              <Route path="/Login" element={<Loginhome />} />
              <Route path="/chat" element={<Chatbottt />} />
              <Route
                path="/emp-login"
                element={
                  <EmployeeLogin
                    onSwitchToSignup={(): void => {
                      throw new Error("Function not implemented.")
                    }}
                    onLoginSuccess={(_email: string): void => {
                      throw new Error("Function not implemented.")
                    }}
                  />
                }
              />
              <Route path="/blogs" element={<HomePage />} />
              <Route path="/blogs/Create" element={<CreateBlogPage />} />
              <Route path="/blogs/edit/:id" element={<CreateBlogPage />} />
              {/* Dashboard Layout */}
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

              {/* Catch-All Route */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
            {/* </AuthProvider> */}
          </BrowserRouter>
        </GoogleOAuthProvider>
      </div>
    </>
  )
}

export default App
