import axios from "axios";
import alertService from "./alertService";

// Client API configured for the Gateway
const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_GATEWAY_URL ||
    "https://api.biotech.159.54.176.254.nip.io/api",
  timeout: 30000, // Increased timeout for AI responses
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding JWT token in each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-storage");
    if (token) {
      try {
        const authData = JSON.parse(token);
        if (authData?.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`;
        }
        
        // Inyectar el farmId si existe una granja seleccionada
        const selectedFarm = authData?.state?.selectedFarm;
        if (selectedFarm && selectedFarm.id) {
          // Limpiar el ID: si viene como "35:1" quedarnos solo con "35"
          const rawFarmId = selectedFarm.id;
          const cleanFarmId = typeof rawFarmId === 'string' ? rawFarmId.split(":")[0] : rawFarmId;

          // Enviar como Header (estándar para microservicios)
          // Solo inyectar si no se está forzando un encabezado específico
          if (!config.headers["X-Farm-Id"]) {
            config.headers["X-Farm-Id"] = cleanFarmId;
          }

          // Opcional: Inyectar también en los params si es una petición GET
          if (config.method === "get") {
            // Verificar que el farmId no venga ya explícito en la URL o params
            const urlHasFarmId = config.url && config.url.includes("farmId=");
            const paramsHasFarmId = config.params && config.params.farmId !== undefined;
            
            if (!urlHasFarmId && !paramsHasFarmId) {
              config.params = {
                ...config.params,
                farmId: cleanFarmId,
              };
            }
          }
        }
      } catch (error) {
        console.error("Error parsing auth token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor for handling authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Only force logout if there is truly no valid token in storage.
      // Resource-level 401s (e.g. feeding-events, HealthEvent lacking farm context)
      // must NOT clear the session — they fail because of missing context,
      // not because the user's JWT is expired or missing.
      const authStorage = localStorage.getItem("auth-storage");
      let hasValidToken = false;
      try {
        const parsed = JSON.parse(authStorage);
        hasValidToken = !!parsed?.state?.token;
      } catch {
        hasValidToken = false;
      }

      // Only logout if there's no token at all (genuine authentication failure)
      if (!hasValidToken) {
        localStorage.removeItem("auth-storage");
        window.dispatchEvent(new Event("auth-change"));
        await alertService.error(
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          "Sesión Expirada"
        );
        window.location.href = "/login";
      }
      // If there IS a valid token, the 401 is a resource-level authorization
      // issue — let the caller handle it gracefully (e.g. Promise.allSettled).
    }
    return Promise.reject(error);
  },
);

export default apiClient;
