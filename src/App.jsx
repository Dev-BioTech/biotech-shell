import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

// Animals MF Import
const AnimalsList = lazy(() => import("animalsMF/AnimalsList"));
const AnimalDetail = lazy(() => import("animalsMF/AnimalDetail"));
const AnimalForm = lazy(() => import("animalsMF/AnimalForm"));

function App() {
  const { isAuthenticated } = useAuthStore();

  React.useEffect(() => {
    const handleAuthChange = () => {
      // Force reload to sync state from localStorage
      window.location.reload();
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  return (
    <BrowserRouter>
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
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Landing />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginForm />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <RegisterForm />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/farm-selector"
            element={
              isAuthenticated ? (
                <Layout>
                  <FarmSelector />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Animals Microfrontend Routes */}
          <Route
            path="/animals"
            element={
              isAuthenticated ? (
                <Layout>
                  <AnimalsList />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/animals/create"
            element={
              isAuthenticated ? (
                <Layout>
                  <AnimalForm />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/animals/:id"
            element={
              isAuthenticated ? (
                <Layout>
                  <AnimalDetail />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/animals/edit/:id"
            element={
              isAuthenticated ? (
                <Layout>
                  <AnimalForm />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Profile WITHOUT Layout (Sidebar) but with Back Button */}
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <div className="relative min-h-screen bg-gray-50/30">
                  <Link
                    to="/dashboard"
                    className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white text-green-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium border border-green-100 group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Volver al Dashboard
                  </Link>
                  <UserProfile />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
