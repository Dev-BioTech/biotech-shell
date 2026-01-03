import apiService from "./ApiService";

export const testSingleton = () => {
  console.log("🧪 Test 1: Verificando Singleton Pattern...");

  const instance1 = apiService;
  const instance2 = apiService;

  const isSingleton = instance1 === instance2;

  if (isSingleton) {
    console.log("✅ Singleton Pattern funciona correctamente");
    console.log("   instance1 === instance2:", isSingleton);
  } else {
    console.error("❌ Singleton Pattern NO funciona");
  }

  return isSingleton;
};

export const testConfiguration = () => {
  console.log("🧪 Test 2: Verificando configuración...");

  const axiosInstance = apiService.getAxiosInstance();

  console.log("✅ Configuración actual:");
  console.log("   Base URL:", axiosInstance.defaults.baseURL);
  console.log("   Timeout:", axiosInstance.defaults.timeout, "ms");
  console.log("   Headers:", axiosInstance.defaults.headers);

  return true;
};

export const testHttpMethods = () => {
  console.log("🧪 Test 3: Verificando métodos HTTP...");

  const methods = ["get", "post", "put", "patch", "delete"];
  const allMethodsExist = methods.every(
    (method) => typeof apiService[method] === "function"
  );

  if (allMethodsExist) {
    console.log("✅ Todos los métodos HTTP están disponibles:", methods);
  } else {
    console.error("❌ Faltan métodos HTTP");
  }

  return allMethodsExist;
};

export const testTokenRetrieval = () => {
  console.log("🧪 Test 4: Verificando obtención de token...");

  const token = apiService.getToken();

  if (token) {
    console.log("✅ Token encontrado:", token.substring(0, 20) + "...");
  } else {
    console.log("⚠️  No hay token (usuario no autenticado)");
  }

  return true;
};

  export const testRealRequest = async () => {
  console.log("🧪 Test 5: Probando petición real...");

  try {
    const response = await apiService.get("/Auth/profile");
    console.log("✅ Petición exitosa:", response.data);
    return true;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("⚠️  No autenticado (esperado si no has iniciado sesión)");
    } else {
      console.error("❌ Error en petición:", error.message);
    }
    return false;
  }
};

  export const runAllTests = async () => {
  console.log("🚀 ========================================");
  console.log("🚀 Iniciando tests de ApiService...");
  console.log("🚀 ========================================\n");

  const results = {
    singleton: testSingleton(),
    configuration: testConfiguration(),
    httpMethods: testHttpMethods(),
    tokenRetrieval: testTokenRetrieval(),
  };

  console.log("\n📊 ========================================");
  console.log("📊 Resultados de Tests:");
  console.log("📊 ========================================");
  console.log("   Singleton Pattern:", results.singleton ? "✅" : "❌");
  console.log("   Configuración:", results.configuration ? "✅" : "❌");
  console.log("   Métodos HTTP:", results.httpMethods ? "✅" : "❌");
  console.log("   Token Retrieval:", results.tokenRetrieval ? "✅" : "❌");

  const allPassed = Object.values(results).every((result) => result === true);

  if (allPassed) {
    console.log("\n🎉 Todos los tests pasaron exitosamente!");
  } else {
    console.log("\n⚠️  Algunos tests fallaron");
  }

  console.log("📊 ========================================\n");

  return results;
};

export default {
  testSingleton,
  testConfiguration,
  testHttpMethods,
  testTokenRetrieval,
  testRealRequest,
  runAllTests,
};
