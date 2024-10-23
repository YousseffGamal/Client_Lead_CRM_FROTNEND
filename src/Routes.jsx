import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/dashboard";
import LoginPage from "./Pages/login/login";
import SignUpPage from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./utiliteis/protectedRoute";
import BlogsArticles from "./Pages/BlogsArticles/BlogsArticles";
import LeadView from "./Pages/LeadView/LeadView ";
import Profile from "./Pages/profile/profile";

const ProjectRoutes = () => {
  return (
    // <React.Suspense fallback={<>Loading...</>}>
    <Router>
      <Routes>
        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/blogsarticles" element={<BlogsArticles />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="leadview" element={<LeadView />} />

        <Route path="/signuppage" element={<SignUpPage />} />
      </Routes>
    </Router>
    // </React.Suspense>
  );
};
export default ProjectRoutes;
