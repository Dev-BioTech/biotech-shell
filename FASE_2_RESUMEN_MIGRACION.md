# 🚀 Resumen de Migración - Fase 2: Unificación de Servicios API

Este documento detalla la finalización exitosa de la Fase 2 del refactor de arquitectura, en la cual se migraron todos los microfrontends del sistema para utilizar el `ApiService` centralizado del Shell, eliminando la duplicación de lógica de conexión HTTP.

---

## 📋 Resumen Ejecutivo

- **Estado**: ✅ Completado
- **Microfrontends Migrados**: 7 de 7
- **Código Eliminado**: ~350 líneas de código duplicado (7 archivos `apiClient.js`).
- **Resultado**: Todos los módulos de la aplicación ahora comparten una única configuración de API, manejo de tokens y gestión de errores.

---

## 🏗️ Arquitectura Implementada

Para permitir que los microfrontends (proyectos independientes) consuman el servicio del Shell sin publicar paquetes NPM privados, implementamos una estrategia de **Alias de Directorio Compartido**:

1.  **Configuración de Vite**: Se modificó el `vite.config.js` de cada microfrontend.
2.  **Alias `@shared-services`**: Apunta físicamente a `../biotech-shell/src/shared/services`.
3.  **Permisos de Sistema de Archivos**: Se habilitó `server.fs.allow: [".."]` para permitir la importación de archivos fuera del root del microfrontend.

Esta solución garantiza que todos los MFs compilen el **mismo código fuente** del `ApiService`, asegurando un comportamiento idéntico en desarrollo y producción.

---

## 📦 Microfrontends Migrados

Se actualizó la capa de servicios de los siguientes proyectos:

| Microfrontend                  | Servicios Actualizados                               | Cambios Realizados                                                                |
| :----------------------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **🔐 biotech-auth-mf**         | `login`, `register`, `profile`, `farm`, `useProfile` | Reemplazo de `apiClient` por `ApiService`. Eliminación de lógica local de tokens. |
| **🐄 biotech-animals-mf**      | `animalService`                                      | Reemplazo de todas las llamadas CRUD (`get`, `post`, `put`, `delete`).            |
| **💉 biotech-health-mf**       | `healthService`, `healthRecordsService`              | Unificación de llamadas de eventos de salud.                                      |
| **🌽 biotech-feeding-mf**      | `feedingService`                                     | Migración de eventos de alimentación y cálculo de costos.                         |
| **💰 biotech-commercial-mf**   | `commercialService`, `salesService`                  | Migración de transacciones y ventas.                                              |
| **📦 biotech-inventory-mf**    | `inventoryService`                                   | Migración de gestión de inventario y movimientos.                                 |
| **🧬 biotech-reproduction-mf** | `reproductionService`                                | Migración de ciclos reproductivos y eventos.                                      |

---

## ✨ Beneficios Inmediatos

1.  **Manejo de Errores Unificado**:

    - Si el token expira (Error 401), **todos** los microfrontends ahora redirigen al login automáticamente gracias al interceptor central del Shell.
    - Errores de red o servidor (500) muestran las mismas alertas estandarizadas (`AlertService`).

2.  **Configuración Centralizada**:

    - Solo es necesario cambiar la URL de la API (`VITE_API_URL`) en un solo lugar (o su variable de entorno) para que afecte a todo el sistema.

3.  **Código Más Limpio**:
    - Los servicios ya no necesitan preocuparse por headers de autorización (`Authorization: Bearer ...`); el `ApiService` lo inyecta automáticamente.
    - Cientos de líneas de configuración de Axios eliminadas.

---

## 🛠️ Guía para el Desarrollador

### ¿Cómo crear un nuevo servicio en un Microfrontend?

Ya **NO** debes importar ni crear instancias de axios locales. Usa el alias configurado:

```javascript
// ✅ CORRECTO
import apiService from "@shared-services/ApiService";

export const miNuevoServicio = {
  obtenerDatos: async () => {
    // No necesitas try/catch si solo quieres que el error global se muestre
    const response = await apiService.get("/endpoint");
    return response.data;
  },
};
```

### ¿Cómo correr el proyecto localmente?

Dado que los microfrontends ahora dependen de archivos del Shell, para desarrollar asegúrate de tener la estructura de carpetas estándar:

```text
/RIWI/biotech-project/
├── biotech-shell/        <-- Aquí vive el ApiService original
├── biotech-auth-mf/      <-- Consume ../biotech-shell
├── biotech-animals-mf/
...
```

---

## 🧪 Verificación

Para verificar que la migración funciona:

1.  Levanta el Shell (`npm run dev` en `biotech-shell`).
2.  Levanta los Microfrontends (usando tu script de arranque o manualmente).
3.  Navega por la aplicación:
    - **Login**: Debe funcionar y guardar el token.
    - **Animales/Salud/etc**: Deben cargar datos.
    - **Logout**: Al hacer logout en el Shell, futuras peticiones de cualquier MF fallarán y manejarán el redireccionamiento correctamente.

---

**¡La arquitectura de comunicación está lista y modernizada! 🚀**
