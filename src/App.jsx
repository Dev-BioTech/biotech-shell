import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@features/layout/components";
import Dashboard from "@features/dashboard/components/Dashboard";
import "./App.css";

import Landing from "@features/layout/components/Landing";
import { useAuthStore } from "@shared/store/authStore";
import ApiServiceDemo from "@shared/components/ApiServiceDemo";

import { isTokenExpired, parseJwt } from "@shared/utils/jwt";

import { ModuleSkeleton } from "@shared/components/ui/ModuleSkeleton";

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, logout } = useAuthStore();
  const location = useLocation();

  // Si no hay token o está expirado, redirigir al login inmediatamente
  const isExpired = token ? isTokenExpired(token) : true;

  if (!isAuthenticated || !token || isExpired) {
    if (isAuthenticated || token) {
      console.warn("Shell: ProtectedRoute - Session invalid or expired, forcing logout");
      logout();
    }
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children || <Outlet />;
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
const CatalogsManager = lazy(() => import("animalsMF/CatalogsManager"));

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
const FeedingEventsList = lazy(() => import("feedingMF/FeedingEventsList"));

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
      const state = useAuthStore.getState();
      
      if (state.isAuthenticated && state.token) {
        if (isTokenExpired(state.token)) {
          console.warn("Shell: Session expired during periodic check, logging out...");
          state.logout();
          window.dispatchEvent(new Event("auth-change"));
          // Redirigir a login si es necesario para asegurar limpieza
          window.location.href = "/login";
        }
      }
    }, 15000); // Check every 15s to be efficient

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const handleAuthChange = async () => {
      console.log("Shell: Auth change detected, syncing...");
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
          <div className="min-h-screen bg-white">
            <Layout>
              <ModuleSkeleton />
            </Layout>
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

          {/* Protected Routes with Persistent Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="animals" element={<AnimalsList />} />
              <Route path="animals/create" element={<AnimalForm />} />
              <Route path="animals/:id" element={<AnimalDetail />} />
              <Route path="animals/edit/:id" element={<AnimalForm />} />
              <Route path="catalogs" element={<CatalogsManager />} />
              <Route path="health" element={<HealthDashboardWrapper />} />
              <Route path="health/records" element={<HealthRecordsWrapper />} />
              <Route
                path="health/vaccination"
                element={<VaccinationCalendarWrapper />}
              />
              <Route
                path="health/diagnostics"
                element={<DiagnosticHistoryWrapper />}
              />
              <Route
                path="feeding"
                element={
                  <Suspense fallback={<div>Cargando...</div>}>
                    <FeedingEventsList />
                  </Suspense>
                }
              />
              <Route
                path="reproduction"
                element={
                  <Suspense fallback={<div>Cargando...</div>}>
                    <RemoteReproductionMonitor />
                  </Suspense>
                }
              />
              <Route
                path="inventory"
                element={
                  <Suspense fallback={<div>Cargando...</div>}>
                    <RemoteInventoryList />
                  </Suspense>
                }
              />
              <Route
                path="commercial"
                element={
                  <Suspense fallback={<div>Cargando...</div>}>
                    <RemoteCommercialDashboard />
                  </Suspense>
                }
              />
            </Route>

            {/* Other protected routes without sidebars */}
            <Route path="farm-selector" element={<FarmSelector />} />
            <Route
              path="profile"
              element={
                <div className="relative min-h-screen bg-gray-50/30">
                  <UserProfile />
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="relative min-h-screen bg-gray-50/30">
                  <SettingsPage />
                </div>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
