// Barrel export para servicios compartidos
// Facilita las importaciones en los microfrontends

export { default as apiService } from "./ApiService";

// Exportar también el apiClient legacy para compatibilidad
export { default as apiClient } from "../utils/apiClient";
