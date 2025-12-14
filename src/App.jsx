import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./features/layout/components";
import Dashboard from "./features/dashboard/components/Dashboard";
import "./App.css";

import Landing from "./features/layout/components/Landing";
import { useAuthStore } from "./shared/store/authStore";

// Lazy load remote components
const UserProfile = lazy(() => import("authMF/UserProfile"));
const LoginForm = lazy(() => import("authMF/Login"));
const RegisterForm = lazy(() => import("authMF/Register"));
const FarmSelector = lazy(() => import("authMF/FarmSelector"));
const ForgotPassword = lazy(() => import("authMF/ForgotPassword"));
const ResetPassword = lazy(() => import("authMF/ResetPassword"));

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-biotech-primary"></div>
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Landing />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/farm-selector" element={<FarmSelector />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
