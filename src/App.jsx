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

import { isTokenExpired, parseJwt } from "@shared/utils/jwt";

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, logout } = useAuthStore();
  const location = useLocation();

  // Si no está autenticado o el token expiró, redirigir
  if (!isAuthenticated || !token || isTokenExpired(token)) {
    if (isAuthenticated) {
      console.warn("Session expired or token missing, logging out...");
      logout();
    }
    return <Navigate to="/login" replace state={{ from: location }} />;
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
const SettingsPage = lazy(() => import("authMF/SettingsPage"));
import ToastContainer from "@shared/components/ui/ToastContainer";

// Animals MF Import
const AnimalsList = lazy(() => import("animalsMF/AnimalsList"));
const AnimalDetail = lazy(() => import("animalsMF/AnimalDetail"));
const AnimalForm = lazy(() => import("animalsMF/AnimalForm"));

// Health MF Imports
const RemoteHealthDashboard = lazy(() => import("healthMF/HealthDashboard"));
const RemoteHealthRecords = lazy(() => import("healthMF/HealthRecordsView"));
const RemoteVaccinationCalendar = lazy(
  () => import("healthMF/VaccinationCalendar"),
);
const RemoteDiagnosticHistory = lazy(
  () => import("healthMF/DiagnosticHistory"),
);

// Feeding MF Imports
const FeedingPlans = lazy(() => import("feedingMF/FeedingPlan"));
const FeedingSchedule = lazy(() => import("feedingMF/FeedingSchedule"));

// Reproduction MF Imports
const RemoteReproductionMonitor = lazy(
  () => import("reproductionMF/ReproductionMonitor"),
);

// Commercial/Inventory MF Imports
const RemoteCommercialDashboard = lazy(
  () => import("commercialMF/CommercialDashboard"),
);

// Inventory MF Import (NEW)
const RemoteInventoryList = lazy(
  () => import("inventoryMF/InventoryDashboard"),
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
  const { isAuthenticated, selectedFarm } = useAuthStore();
  const [authChecked, setAuthChecked] = React.useState(false);

  // Check authentication when mounting
  React.useEffect(() => {
    const validateToken = () => {
      const { token, logout } = useAuthStore.getState();

      if (token && isTokenExpired(token)) {
        console.warn("Shell: Token expired on mount, logging out...");
        logout();
      }
      setAuthChecked(true);
    };

    validateToken();

    // Verificación periódica cada 10 segundos
    const interval = setInterval(() => {
      const { isTokenValid, logout, isAuthenticated, token } =
        useAuthStore.getState();

      if (isAuthenticated && token && !isTokenValid()) {
        const decoded = parseJwt(token);
        if (decoded && decoded.exp) {
          console.warn("Shell: Session expired during periodic check");
          logout();
          window.dispatchEvent(new Event("auth-change"));
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ÚNICO CAMBIO MANTENIDO: Sincronización inteligente sin parpadeo
  React.useEffect(() => {
    const handleAuthChange = async () => {
      console.log("Shell: Auth change detected, syncing...");
      // Forzamos a Zustand a re-leer el localStorage sin desmontar la App
      await useAuthStore.persist.rehydrate();
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", (e) => {
      if (e.key === "auth-storage") {
        handleAuthChange();
      }
    });

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Wait for authentication to be verified before rendering
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* ToastContainer local — no rompe el layout */}
      <ToastContainer />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                selectedFarm ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/farm-selector" replace />
                )
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
              ) : selectedFarm ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/farm-selector" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <RegisterForm />
              ) : selectedFarm ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/farm-selector" replace />
              )
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

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

          {/* Inventory Route (NEW) */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense
                    fallback={<div className="p-4">Cargando inventario...</div>}
                  >
                    <RemoteInventoryList />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Commercial Route */}
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

          {/* Profile WITHOUT Layout (Sidebar) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="relative min-h-screen bg-gray-50/30">
                  <UserProfile />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Settings / Preferencias WITHOUT Layout */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div className="relative min-h-screen bg-gray-50/30">
                  <SettingsPage />
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
