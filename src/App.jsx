import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@features/layout/components";
import Dashboard from "@features/dashboard/components/Dashboard";
import "./App.css";

import Landing from "@features/layout/components/Landing";
import { useAuthStore } from "@shared/store/authStore";
import ApiServiceDemo from "@shared/components/ApiServiceDemo";

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, _hasHydrated } = useAuthStore();
  const location = useLocation();

  // Wait for hydration before checking authentication
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-biotech-primary"></div>
      </div>
    );
  }

  // Double check: verify both isAuthenticated flag and token
  const hasAuth = isAuthenticated && token;

  if (!hasAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

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

// Health MF Imports
const RemoteHealthDashboard = lazy(() => import("healthMF/HealthDashboard"));
const RemoteHealthRecords = lazy(() => import("healthMF/HealthRecordsView"));
const RemoteVaccinationCalendar = lazy(() =>
  import("healthMF/VaccinationCalendar")
);
const RemoteDiagnosticHistory = lazy(() =>
  import("healthMF/DiagnosticHistory")
);

// Feeding MF Imports
const FeedingPlans = lazy(() => import("feedingMF/FeedingPlan"));
const FeedingSchedule = lazy(() => import("feedingMF/FeedingSchedule"));

// Reproduction MF Imports
const RemoteReproductionMonitor = lazy(() =>
  import("reproductionMF/ReproductionMonitor")
);

// Commercial/Inventory MF Imports
// NOTE: Shell config defines remote as "inventoryMF"
const RemoteCommercialDashboard = lazy(() =>
  import("inventoryMF/CommercialDashboard")
);

// Wrappers to inject navigation
const HealthDashboardWrapper = () => {
  const navigate = useNavigate();
  return (
    <RemoteHealthDashboard
      onViewRecords={() => navigate("/health/records")}
      onViewCalendar={() => navigate("/health/vaccination")}
      onViewDiagnostics={() => navigate("/health/diagnostics")}
    />
  );
};

const HealthRecordsWrapper = () => {
  return (
    <RemoteHealthRecords
      onCreate={() => console.log("Crear registro")}
      onEdit={(id) => console.log("Editar registro", id)}
    />
  );
};

const VaccinationCalendarWrapper = () => {
  return (
    <RemoteVaccinationCalendar
      onSchedule={() => console.log("Programar vacunación")}
    />
  );
};

const DiagnosticHistoryWrapper = () => {
  return <RemoteDiagnosticHistory />;
};

function App() {
  const { isAuthenticated, _hasHydrated } = useAuthStore();

  // Wait for Zustand to hydrate from localStorage before rendering
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-biotech-primary"></div>
      </div>
    );
  }

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

          {/* API Service Demo - Testing Route */}
          <Route path="/api-test" element={<ApiServiceDemo />} />

          <Route
            path="/farm-selector"
            element={
              <ProtectedRoute>
                <FarmSelector />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Animals Microfrontend Routes */}
          <Route
            path="/animals"
            element={
              <ProtectedRoute>
                <Layout>
                  <AnimalsList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals/create"
            element={
              <ProtectedRoute>
                <Layout>
                  <AnimalForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AnimalDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals/edit/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <AnimalForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Health Microfrontend Routes */}
          <Route
            path="/health"
            element={
              <ProtectedRoute>
                <Layout>
                  <HealthDashboardWrapper />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/health/records"
            element={
              <ProtectedRoute>
                <Layout>
                  <HealthRecordsWrapper />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/health/vaccination"
            element={
              <ProtectedRoute>
                <Layout>
                  <VaccinationCalendarWrapper />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/health/diagnostics"
            element={
              <ProtectedRoute>
                <Layout>
                  <DiagnosticHistoryWrapper />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Feeding Microfrontend Routes */}
          <Route
            path="/feeding"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense
                    fallback={
                      <div className="p-4">
                        Cargando módulo de alimentación...
                      </div>
                    }
                  >
                    <FeedingPlans />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/feeding/schedule"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense
                    fallback={<div className="p-4">Cargando horario...</div>}
                  >
                    <FeedingSchedule />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Reproduction Routes */}
          <Route
            path="/reproduction"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense
                    fallback={
                      <div className="p-4">Cargando reproducción...</div>
                    }
                  >
                    <RemoteReproductionMonitor />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Commercial / Inventory Routes */}
          <Route
            path="/commercial"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense
                    fallback={
                      <div className="p-4">Cargando dashboard comercial...</div>
                    }
                  >
                    <RemoteCommercialDashboard />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Profile WITHOUT Layout (Sidebar) but with Back Button */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
