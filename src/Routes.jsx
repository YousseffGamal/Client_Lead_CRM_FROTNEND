import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/dashboard";
import LoginPage from "./Pages/login/login";
import SignUpPage from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./utiliteis/protectedRoute";
import PurchasedLeads from "./Pages/PurchasedLeads/PurchasedLeads";
import LeadView from "./Pages/LeadView/LeadView ";
import Profile from "./Pages/profile/profile";
import PurchasedLeadView from "./Pages/purchasedLeadView/purchasedLeadView"
const ProjectRoutes = () => {
  return (
    // <React.Suspense fallback={<>Loading...</>}>
    <Router>
      <Routes>
        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchasedLeads" element={<PurchasedLeads />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/leadview/:leadId" element={<LeadView />} />{" "}
        <Route path="/purchasedleadview/:leadId" element={<PurchasedLeadView />} />{" "}

        {/* Dynamic route */}
        <Route path="/purchased-leads" element={<PurchasedLeads />} />
        <Route path="/signuppage" element={<SignUpPage />} />
      </Routes>
    </Router>
    // </React.Suspense>
  );
};
export default ProjectRoutes;
