import axios from "axios";
import alertService from "../utils/alertService";

class ApiService {
  static instance = null;

  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    }

    // config axios
    this.client = axios.create({
      baseURL:
        import.meta.env.VITE_API_URL ||
        "https://api-gateway-bio-tech.up.railway.app/api",
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    // config interceptors
    this.setupInterceptors();

    // save instance
    ApiService.instance = this;
  }

  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        // Add token JWT automatically if exists
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log in development
        if (import.meta.env.DEV) {
          console.log(
            `🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`
          );
        }

        return config;
      },
      (error) => {
        console.error("❌ [Request Error]", error);
        return Promise.reject(error);
      }
    );

    // response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log in development
        if (import.meta.env.DEV) {
          console.log(
            `✅ [API Response] ${response.config.method?.toUpperCase()} ${
              response.config.url
            }`,
            response.data
          );
        }
        return response;
      },
      async (error) => {
        return this.handleResponseError(error);
      }
    );
  }

  // get token from localStorage    
  getToken() {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const authData = JSON.parse(authStorage);
        return authData?.state?.token || null;
      }
    } catch (error) {
      console.error("❌ Error parsing auth token:", error);
    }
    return null;
  }

  // handle response error
  async handleResponseError(error) {
    const originalRequest = error.config;
    const status = error.response?.status;

    // 401 - Token invalid or expired
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await this.handleUnauthorized();
      return Promise.reject(error);
    }

    // 403 - Forbidden
    if (status === 403) {
      this.handleForbidden();
    }

    // 404 - Not found
    if (status === 404) {
      this.handleNotFound(error);
    }

    // 500+ - Error server
    if (status >= 500) {
      this.handleServerError(error);
    }

    // Network Error
    if (!error.response) {
      this.handleNetworkError(error);
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.error("❌ [API Error]", {
        status,
        url: error.config?.url,
        method: error.config?.method,
        message: error.message,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }

  // handle unauthorized
  async handleUnauthorized() {
    // Clear authentication
    localStorage.removeItem("auth-storage");

    // Emit event for stores to update
    window.dispatchEvent(new CustomEvent("auth:logout"));
    window.dispatchEvent(new Event("auth-change"));

    // Show alert to user
    await alertService.error(
      "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      "Sesión Expirada"
    );

    // Redirect to login
    window.location.href = "/login";
  }

  // handle forbidden
  handleForbidden() {
    alertService.warning(
      "No tienes permisos para realizar esta acción.",
      "Acceso Denegado"
    );
  }

  // handle not found
  handleNotFound(error) {
    const resource = error.config?.url?.split("/").pop() || "recurso";
    console.warn(`⚠️ Recurso no encontrado: ${resource}`);
  }

  // handle server error
  handleServerError(error) {
    const status = error.response?.status;
    alertService.error(
      `Ocurrió un error en el servidor (${status}). Por favor, intenta nuevamente más tarde.`,
      "Error del Servidor"
    );
  }

  // handle network error
  handleNetworkError(error) {
    alertService.error(
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
      "Error de Conexión"
    );
  }

  //http methods

  // get
  async get(url, config = {}) {
    return this.client.get(url, config);
  }

  // post
  async post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  // put
  async put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  // patch
  async patch(url, data, config = {}) {
    return this.client.patch(url, data, config);
  }

  // delete
  async delete(url, config = {}) {
    return this.client.delete(url, config);
  }

  // post
  async post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  // put
  async put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  // patch
  async patch(url, data, config = {}) {
    return this.client.patch(url, data, config);
  }

  // delete
  async delete(url, config = {}) {
    return this.client.delete(url, config);
  }

  // post
  async post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  // put
  async put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  // patch
  async patch(url, data, config = {}) {
    return this.client.patch(url, data, config);
  }

  // delete
  async delete(url, config = {}) {
    return this.client.delete(url, config);
  }

  // put    
  async put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  // patch
  async patch(url, data, config = {}) {
    return this.client.patch(url, data, config);
  }

  // delete
  async delete(url, config = {}) {
    return this.client.delete(url, config);
  }

  // ==================== SETTERS ====================

  // all
  async all(requests) {
    return Promise.all(requests);
  }

  // cancel pending requests
  cancelPendingRequests() {
    console.log("⚠️ Cancelando peticiones pendientes...");
  }

  // set base url
  setBaseURL(newBaseURL) {
    this.client.defaults.baseURL = newBaseURL;
    console.log(`✅ Base URL actualizada: ${newBaseURL}`);
  }

  // set timeout
  setTimeout(timeout) {
    this.client.defaults.timeout = timeout;
    console.log(`✅ Timeout actualizado: ${timeout}ms`);
  }

  // get axios instance
  getAxiosInstance() {
    return this.client;
  }
}

// Export instance
const apiService = new ApiService();

export default apiService;
