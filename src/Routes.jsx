import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/dashboard";
import LoginPage from "./Pages/login/login";
import SignUpPage from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./utiliteis/protectedRoute";


import Profile from "./Pages/profile/profile"

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute redirectTo="/" roles={["Admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          
          </Route>
          
          <Route
            element={
              <ProtectedRoute redirectTo="/" roles={["Marketer", "Admin"]} />
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
