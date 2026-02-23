/**
 * Utilidad para el manejo de JWT en el Shell
 * Permite validar tokens sin depender de librerías pesadas
 */

export const parseJwt = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error parsing JWT:", e);
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = parseJwt(token);

  // Si no se puede decodificar el token o no tiene exp,
  // se asume válido (compatibilidad con tokens mock/internos)
  if (!decoded || !decoded.exp) return false;

  // jwt exp está en segundos, Date.now() en milisegundos
  const currentTime = Date.now() / 1000;
  // Margen de 10 segundos
  return decoded.exp < currentTime + 10;
};
