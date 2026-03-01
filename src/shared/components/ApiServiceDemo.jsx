import { useState } from "react";
import apiService from "../services/ApiService";
import { runAllTests } from "../services/ApiService.test";

/**
 * Componente de demostración del ApiService
 *
 * Este componente muestra cómo usar el ApiService en la práctica
 * y permite ejecutar tests para verificar que funciona correctamente.
 *
 * Para usar este componente:
 * 1. Importarlo en App.jsx o en cualquier página
 * 2. Agregarlo al JSX: <ApiServiceDemo />
 * 3. Abrir la consola del navegador para ver los logs
 */
const ApiServiceDemo = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Ejecutar tests del ApiService
  const handleRunTests = async () => {
    console.clear();
    await runAllTests();
    setResult("✅ Tests ejecutados. Revisa la consola del navegador.");
  };

  // Probar GET request
  const handleTestGet = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiService.get("/Auth/profile");
      setResult(JSON.stringify(response.data, null, 2));
      console.log("✅ GET /Auth/profile:", response.data);
    } catch (err) {
      setError(err.message);
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Verificar configuración
  const handleCheckConfig = () => {
    const instance = apiService.getAxiosInstance();
    const config = {
      baseURL: instance.defaults.baseURL,
      timeout: instance.defaults.timeout,
      hasToken: !!apiService.getToken(),
    };

    setResult(JSON.stringify(config, null, 2));
    console.log("⚙️ Configuración actual:", config);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🧪 ApiService Demo</h2>
        <p style={styles.description}>
          Demostración del servicio HTTP Singleton centralizado
        </p>

        <div style={styles.buttonGroup}>
          <button onClick={handleRunTests} style={styles.button}>
            🧪 Ejecutar Tests
          </button>
          <button
            onClick={handleTestGet}
            style={styles.button}
            disabled={loading}
          >
            📡 Test GET Request
          </button>
          <button onClick={handleCheckConfig} style={styles.button}>
            ⚙️ Ver Configuración
          </button>
        </div>

        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Cargando...</p>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <h3>❌ Error</h3>
            <pre>{error}</pre>
          </div>
        )}

        {result && (
          <div style={styles.result}>
            <h3>✅ Resultado</h3>
            <pre>{result}</pre>
          </div>
        )}

        <div style={styles.info}>
          <h3>📚 Información</h3>
          <ul style={styles.list}>
            <li>✅ ApiService es un Singleton (instancia única)</li>
            <li>✅ Agrega JWT tokens automáticamente</li>
            <li>✅ Maneja errores HTTP centralizadamente</li>
            <li>✅ Integrado con alertService</li>
            <li>✅ Logs automáticos en modo desarrollo</li>
          </ul>
        </div>

        <div style={styles.footer}>
          <p>
            📖 Ver documentación completa en:{" "}
            <code>src/shared/services/API_SERVICE_GUIDE.md</code>
          </p>
        </div>
      </div>
    </div>
  );
};

// Estilos inline para el componente
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#1f2937",
  },
  description: {
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #10b981",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 1rem",
  },
  error: {
    backgroundColor: "#fee2e2",
    border: "1px solid #ef4444",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
  },
  result: {
    backgroundColor: "#f0fdf4",
    border: "1px solid #10b981",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
  },
  info: {
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
  },
  list: {
    margin: "0.5rem 0",
    paddingLeft: "1.5rem",
  },
  footer: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: "1rem",
    marginTop: "1rem",
    fontSize: "0.875rem",
    color: "#6b7280",
  },
};

export default ApiServiceDemo;
