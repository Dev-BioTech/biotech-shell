# 📘 ApiService - Guía Completa de Uso

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [¿Qué es ApiService?](#qué-es-apiservice)
3. [Características](#características)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Uso Básico](#uso-básico)
6. [Uso Avanzado](#uso-avanzado)
7. [Manejo de Errores](#manejo-de-errores)
8. [Autenticación](#autenticación)
9. [Testing](#testing)
10. [Migración desde apiClient](#migración-desde-apiclient)
11. [Mejores Prácticas](#mejores-prácticas)
12. [FAQ](#faq)

---

## Introducción

`ApiService` es un servicio HTTP Singleton que centraliza todas las peticiones HTTP en la aplicación BioTech. Implementa el patrón Singleton para garantizar una única instancia compartida en toda la aplicación, proporcionando consistencia, mantenibilidad y facilidad de uso.

### ¿Por qué ApiService?

**Antes (apiClient duplicado):**

- ❌ 8 archivos `apiClient.js` duplicados (uno por microfrontend)
- ❌ Cambiar configuración = modificar 8 archivos
- ❌ Manejo de errores inconsistente
- ❌ Sin logging centralizado
- ❌ Difícil de mantener

**Después (ApiService Singleton):**

- ✅ 1 solo archivo `ApiService.js`
- ✅ Cambiar configuración = modificar 1 archivo
- ✅ Manejo de errores centralizado
- ✅ Logging automático en desarrollo
- ✅ Fácil de mantener y escalar

---

## ¿Qué es ApiService?

`ApiService` es una clase JavaScript que implementa el patrón de diseño **Singleton**, asegurando que solo exista una instancia del servicio HTTP en toda la aplicación. Esta instancia es compartida por todos los microfrontends de BioTech.

### Patrón Singleton

```javascript
class ApiService {
  static instance = null;

  constructor() {
    // Si ya existe una instancia, retornarla
    if (ApiService.instance) {
      return ApiService.instance;
    }

    // Configurar el servicio
    this.client = axios.create({
      /* ... */
    });

    // Guardar la instancia
    ApiService.instance = this;
  }
}

// Exportar instancia única
export default new ApiService();
```

---

## Características

### ✅ Características Principales

| Característica                     | Descripción                                            |
| ---------------------------------- | ------------------------------------------------------ |
| **Singleton Pattern**              | Una única instancia compartida en toda la aplicación   |
| **Autenticación Automática**       | Agrega JWT tokens automáticamente a cada request       |
| **Manejo de Errores Centralizado** | Gestión unificada de errores HTTP (401, 403, 404, 500) |
| **Interceptores Configurados**     | Request y response interceptors pre-configurados       |
| **Logging en Desarrollo**          | Logs detallados automáticos en modo desarrollo         |
| **Alertas al Usuario**             | Integración con `alertService` para notificaciones     |
| **Configuración Dinámica**         | Permite cambiar baseURL y timeout en runtime           |
| **TypeScript Ready**               | Documentación JSDoc completa                           |

### 🎯 Métodos HTTP Disponibles

- `get(url, config)` - Peticiones GET
- `post(url, data, config)` - Peticiones POST
- `put(url, data, config)` - Peticiones PUT
- `patch(url, data, config)` - Peticiones PATCH
- `delete(url, config)` - Peticiones DELETE

### 🔧 Métodos Avanzados

- `all(requests)` - Ejecutar múltiples peticiones en paralelo
- `setBaseURL(url)` - Cambiar la URL base dinámicamente
- `setTimeout(ms)` - Cambiar el timeout dinámicamente
- `getAxiosInstance()` - Obtener instancia de Axios para casos avanzados

---

## Instalación y Configuración

### 1. Importación

El servicio ya está disponible en `biotech-shell`. Solo necesitas importarlo:

```javascript
// Opción 1: Importación directa
import apiService from "@/shared/services/ApiService";

// Opción 2: Importación desde barrel export
import { apiService } from "@/shared/services";
```

### 2. Variables de Entorno

Configura la URL del API en tu archivo `.env`:

```env
# .env
VITE_API_URL=https://api-gateway-bio-tech.up.railway.app/api
```

Si no se define, el servicio usa la URL por defecto configurada.

### 3. Configuración Actual

Para verificar la configuración actual:

```javascript
const instance = apiService.getAxiosInstance();
console.log("Base URL:", instance.defaults.baseURL);
console.log("Timeout:", instance.defaults.timeout);
```

---

## Uso Básico

### GET Request

```javascript
import apiService from "@/shared/services/ApiService";

// Obtener lista de animales
const getAnimals = async (farmId) => {
  try {
    const response = await apiService.get(`/v1/animals?farmId=${farmId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};

// Uso
const animals = await getAnimals(1);
console.log(animals);
```

### POST Request

```javascript
// Crear un nuevo animal
const createAnimal = async (animalData) => {
  try {
    const response = await apiService.post("/v1/animals", animalData);
    return response.data;
  } catch (error) {
    console.error("Error creating animal:", error);
    throw error;
  }
};

// Uso
const newAnimal = await createAnimal({
  name: "Vaca 001",
  type: "Bovino",
  breed: "Holstein",
  weight: 450,
});
```

### PUT Request

```javascript
// Actualizar un animal
const updateAnimal = async (id, animalData) => {
  try {
    const response = await apiService.put(`/v1/animals/${id}`, animalData);
    return response.data;
  } catch (error) {
    console.error("Error updating animal:", error);
    throw error;
  }
};

// Uso
const updated = await updateAnimal(1, { weight: 480 });
```

### DELETE Request

```javascript
// Eliminar un animal
const deleteAnimal = async (id) => {
  try {
    const response = await apiService.delete(`/v1/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting animal:", error);
    throw error;
  }
};

// Uso
await deleteAnimal(1);
```

---

## Uso Avanzado

### Peticiones en Paralelo

Ejecuta múltiples peticiones simultáneamente y espera a que todas se completen:

```javascript
const loadDashboardData = async (farmId) => {
  try {
    const [animals, health, feeding] = await apiService.all([
      apiService.get(`/v1/animals?farmId=${farmId}`),
      apiService.get(`/HealthEvent?farmId=${farmId}`),
      apiService.get(`/v1/FeedingEvents?farmId=${farmId}`),
    ]);

    return {
      animals: animals.data,
      health: health.data,
      feeding: feeding.data,
    };
  } catch (error) {
    console.error("Error loading dashboard:", error);
    throw error;
  }
};
```

### Configuración Personalizada por Request

```javascript
// Cambiar timeout para una petición específica
const uploadLargeFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiService.post("/upload", formData, {
    timeout: 60000, // 60 segundos
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
```

### Cambiar Configuración Dinámicamente

```javascript
// Cambiar Base URL (útil para testing o múltiples ambientes)
apiService.setBaseURL("https://staging-api.biotech.com/api");

// Cambiar Timeout
apiService.setTimeout(60000); // 60 segundos
```

### Integración en Servicios de Dominio

Crea servicios específicos por dominio que usen ApiService:

```javascript
// services/animalService.js
import apiService from "@/shared/services/ApiService";

class AnimalService {
  static instance = null;

  constructor() {
    if (AnimalService.instance) {
      return AnimalService.instance;
    }
    AnimalService.instance = this;
  }

  async getAll(farmId) {
    const response = await apiService.get(`/v1/animals?farmId=${farmId}`);
    return response.data;
  }

  async getById(id) {
    const response = await apiService.get(`/v1/animals/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await apiService.post("/v1/animals", data);
    return response.data;
  }

  async update(id, data) {
    const response = await apiService.put(`/v1/animals/${id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await apiService.delete(`/v1/animals/${id}`);
    return response.data;
  }

  async updateWeight(id, weight) {
    const response = await apiService.put(`/v1/animals/${id}/weight`, {
      weight,
    });
    return response.data;
  }
}

export default new AnimalService();
```

**Uso del servicio de dominio:**

```javascript
import animalService from "./services/animalService";

// Mucho más limpio y semántico
const animals = await animalService.getAll(farmId);
const animal = await animalService.getById(1);
await animalService.updateWeight(1, 500);
```

---

## Manejo de Errores

### Errores HTTP Manejados Automáticamente

ApiService maneja automáticamente los siguientes errores HTTP:

| Código      | Acción Automática                                  | Descripción                |
| ----------- | -------------------------------------------------- | -------------------------- |
| **401**     | Limpia sesión, muestra alerta, redirige a `/login` | Token inválido o expirado  |
| **403**     | Muestra alerta "Acceso Denegado"                   | Sin permisos suficientes   |
| **404**     | Log en consola (silencioso)                        | Recurso no encontrado      |
| **500+**    | Muestra alerta "Error del Servidor"                | Error interno del servidor |
| **Network** | Muestra alerta "Error de Conexión"                 | Sin conexión a internet    |

### Ejemplo de Manejo Automático

```javascript
// El usuario intenta acceder a un recurso sin autenticación
const response = await apiService.get("/v1/animals");

// Si el servidor retorna 401:
// 1. ApiService limpia localStorage
// 2. Emite evento 'auth:logout'
// 3. Muestra alerta: "Tu sesión ha expirado..."
// 4. Redirige a /login
```

### Manejo Manual de Errores

Puedes agregar lógica adicional en el catch:

```javascript
try {
  const response = await apiService.get("/v1/animals");
  return response.data;
} catch (error) {
  // El error ya fue manejado por los interceptores
  // Aquí puedes agregar lógica adicional si es necesario

  if (error.response?.status === 404) {
    // Manejar caso específico de 404
    console.log("No se encontraron animales");
    return [];
  }

  if (error.response?.status === 403) {
    // Redirigir a página de permisos
    navigate("/unauthorized");
  }

  throw error;
}
```

### Estructura del Error

```javascript
{
  response: {
    status: 404,
    data: { message: "Animal not found" },
    headers: { ... }
  },
  config: {
    url: "/v1/animals/999",
    method: "get"
  },
  message: "Request failed with status code 404"
}
```

---

## Autenticación

### Autenticación Automática

ApiService maneja automáticamente la autenticación JWT:

1. **Request**: Agrega el token automáticamente desde `localStorage`
2. **Response 401**: Limpia la sesión y redirige al login
3. **Token Expirado**: Muestra alerta al usuario

```javascript
// No necesitas hacer nada especial, el token se agrega automáticamente
const response = await apiService.get("/v1/animals");

// Header agregado automáticamente:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Flujo de Autenticación

```
1. Usuario hace login
   ↓
2. authStore guarda token en localStorage
   ↓
3. ApiService lee token automáticamente
   ↓
4. Cada request incluye: Authorization: Bearer {token}
   ↓
5. Si token expira (401):
   - Limpia localStorage
   - Emite evento 'auth:logout'
   - Muestra alerta
   - Redirige a /login
```

### Verificar Token

```javascript
const token = apiService.getToken();

if (token) {
  console.log("Usuario autenticado");
  console.log("Token:", token.substring(0, 20) + "...");
} else {
  console.log("Usuario no autenticado");
}
```

---

## Testing

### Ejecutar Tests Automáticos

ApiService incluye una suite de tests que puedes ejecutar:

```javascript
import { runAllTests } from "@/shared/services/ApiService.test";

// En un componente React
useEffect(() => {
  runAllTests();
}, []);

// O directamente en la consola del navegador
```

### Tests Incluidos

1. **Test de Singleton Pattern**

   - Verifica que solo existe una instancia
   - `instance1 === instance2` debe ser `true`

2. **Test de Configuración**

   - Verifica Base URL
   - Verifica Timeout
   - Verifica Headers

3. **Test de Métodos HTTP**

   - Verifica que existen: `get`, `post`, `put`, `patch`, `delete`

4. **Test de Token Retrieval**

   - Verifica que puede obtener el token desde localStorage

5. **Test de Petición Real** (opcional)
   - Realiza una petición real al backend
   - Solo funciona si estás autenticado

### Mockear ApiService en Tests Unitarios

```javascript
// __mocks__/ApiService.js
export default {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  all: jest.fn(),
};
```

```javascript
// animalService.test.js
import apiService from "@/shared/services/ApiService";
import animalService from "./animalService";

jest.mock("@/shared/services/ApiService");

describe("AnimalService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch animals", async () => {
    const mockData = [
      { id: 1, name: "Vaca 1" },
      { id: 2, name: "Vaca 2" },
    ];

    apiService.get.mockResolvedValue({ data: mockData });

    const result = await animalService.getAll(1);

    expect(apiService.get).toHaveBeenCalledWith("/v1/animals?farmId=1");
    expect(result).toEqual(mockData);
  });

  it("should create animal", async () => {
    const newAnimal = { name: "Vaca 3", type: "Bovino" };
    const mockResponse = { id: 3, ...newAnimal };

    apiService.post.mockResolvedValue({ data: mockResponse });

    const result = await animalService.create(newAnimal);

    expect(apiService.post).toHaveBeenCalledWith("/v1/animals", newAnimal);
    expect(result).toEqual(mockResponse);
  });
});
```

### Componente de Demostración

Usa el componente `ApiServiceDemo` para probar interactivamente:

```javascript
import ApiServiceDemo from "@/shared/components/ApiServiceDemo";

// En tu App.jsx o cualquier página
<ApiServiceDemo />;
```

Accede a: `http://localhost:5173/api-test`

---

## Migración desde apiClient

### Comparación de APIs

La API es idéntica, solo cambia el import:

**Antes (apiClient):**

```javascript
import apiClient from "@shared/utils/apiClient";

const response = await apiClient.get("/v1/animals");
const newAnimal = await apiClient.post("/v1/animals", data);
```

**Después (apiService):**

```javascript
import apiService from "@/shared/services/ApiService";

const response = await apiService.get("/v1/animals");
const newAnimal = await apiService.post("/v1/animals", data);
```

### Pasos para Migrar un Microfrontend

1. **Actualizar imports**

   ```javascript
   // Buscar y reemplazar en todo el MF:
   // De: import apiClient from '@shared/utils/apiClient'
   // A:  import apiService from '@/shared/services/ApiService'

   // De: apiClient.get(
   // A:  apiService.get(
   ```

2. **Verificar que todo funciona**

   - Ejecutar la aplicación
   - Probar todas las funcionalidades
   - Verificar que no hay errores en consola

3. **Eliminar archivo apiClient.js**

   ```bash
   # Solo después de verificar que todo funciona
   rm src/shared/utils/apiClient.js
   ```

4. **Testing exhaustivo**
   - Probar login/logout
   - Probar CRUD operations
   - Probar manejo de errores

### Ejemplo de Migración Completa

**Antes:**

```javascript
// biotech-animals-mf/src/services/animalService.js
import apiClient from "@shared/utils/apiClient";

export const animalService = {
  getAll: async (farmId) => {
    const response = await apiClient.get(`/v1/animals?farmId=${farmId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post("/v1/animals", data);
    return response.data;
  },
};
```

**Después:**

```javascript
// biotech-animals-mf/src/services/animalService.js
import apiService from "@/shared/services/ApiService";

export const animalService = {
  getAll: async (farmId) => {
    const response = await apiService.get(`/v1/animals?farmId=${farmId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiService.post("/v1/animals", data);
    return response.data;
  },
};
```

---

## Mejores Prácticas

### 1. Usar Servicios de Dominio

❌ **No hagas esto:**

```javascript
// Directamente en el componente
const animals = await apiService.get("/v1/animals");
```

✅ **Haz esto:**

```javascript
// Crea un servicio de dominio
import animalService from "./services/animalService";
const animals = await animalService.getAll(farmId);
```

### 2. Manejo de Errores Consistente

❌ **No hagas esto:**

```javascript
try {
  const animals = await apiService.get("/v1/animals");
  setAnimals(animals.data);
} catch (error) {
  alert("Error!"); // Muy genérico
}
```

✅ **Haz esto:**

```javascript
try {
  const animals = await apiService.get("/v1/animals");
  setAnimals(animals.data);
} catch (error) {
  // El error ya fue manejado por ApiService
  // Solo agrega lógica específica si es necesario
  if (error.response?.status === 404) {
    setAnimals([]);
  }
}
```

### 3. Loading States

✅ **Siempre maneja estados de carga:**

```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchAnimals = async () => {
  setLoading(true);
  setError(null);

  try {
    const data = await animalService.getAll(farmId);
    setAnimals(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 4. Cancelación de Peticiones

Para componentes que se desmontan:

```javascript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await apiService.get("/v1/animals", {
        signal: controller.signal,
      });
      setAnimals(response.data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, []);
```

### 5. Evitar Peticiones Duplicadas

```javascript
// Usar un flag para evitar múltiples peticiones
let isFetching = false;

const fetchAnimals = async () => {
  if (isFetching) return;

  isFetching = true;
  try {
    const data = await animalService.getAll(farmId);
    setAnimals(data);
  } finally {
    isFetching = false;
  }
};
```

---

## FAQ

### ¿Puedo usar apiClient y apiService al mismo tiempo?

✅ **Sí**, son completamente compatibles. Puedes migrar gradualmente.

### ¿Qué pasa si cambio la URL del API?

Solo necesitas cambiar la variable de entorno `VITE_API_URL` y reiniciar el servidor.

### ¿Cómo agrego headers personalizados?

```javascript
const response = await apiService.get("/v1/animals", {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

### ¿Puedo desactivar los logs en desarrollo?

Sí, modifica el método `setupInterceptors()` en `ApiService.js` y comenta las líneas de `console.log`.

### ¿Cómo implemento refresh token?

Modifica el interceptor de response en `ApiService.js` para detectar 401 y renovar el token antes de reintentar.

### ¿ApiService funciona con TypeScript?

Sí, tiene documentación JSDoc completa. Para TypeScript puro, puedes convertir la clase a `.ts`.

### ¿Puedo usar ApiService fuera de React?

Sí, es JavaScript puro. Funciona en cualquier entorno que soporte ES6+.

### ¿Cómo monitoreo las peticiones?

En desarrollo, revisa la consola del navegador. Para producción, integra con Sentry, LogRocket, etc.

---

## Recursos Adicionales

- **Código Fuente**: `src/shared/services/ApiService.js`
- **Tests**: `src/shared/services/ApiService.test.js`
- **Demo**: `src/shared/components/ApiServiceDemo.jsx`
- **Store Mejorado**: `src/shared/store/authStore.js`

---

## Soporte

Para preguntas o problemas:

1. Revisa esta documentación
2. Ejecuta los tests automáticos
3. Usa el componente de demostración
4. Consulta con el equipo de desarrollo

---

**Última actualización**: 2026-01-03  
**Versión**: 1.0.0  
**Autor**: BioTech Development Team
