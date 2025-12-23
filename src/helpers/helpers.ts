import Cookies from "universal-cookie";

/////////////////
const cookies = new Cookies();

export const setToken = (token: string) => {
  sessionStorage.setItem("access_token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("access_token");
};

export const clearToken = () => {
  cookies.remove("access_token");

  sessionStorage.removeItem("access_token");
};

export const isAuthenticated = () => !!getToken();

export const setRole = (role: string) => sessionStorage.setItem("role", role);
export const setRoleAdmin = (role: string) =>
  sessionStorage.setItem("role_admin", role);

export const getRole = () => sessionStorage.getItem("role");
export const clearRole = () => sessionStorage.removeItem("role");
export const getAdminRole = () => sessionStorage.getItem("role_admin");

export const isAdmin = () => getAdminRole() === "ROLE_ADMIN";
////

// Universal Base64URL decode (Node + Browser)
function base64UrlDecode(str: string): string | null {
  if (!str) return null;
  try {
    // Base64URL → Base64
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";

    // Node.js
    if (typeof Buffer !== "undefined") {
      return Buffer.from(str, "base64").toString("utf8");
    }

    // Browser
    if (typeof atob !== "undefined") {
      return decodeURIComponent(
        atob(str)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    }

    return null;
  } catch {
    return null;
  }
}

// Safe decode JWT payload
export function decodeJwtSafe(token: string | null): any | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const payloadStr = base64UrlDecode(parts[1]);
  if (!payloadStr) return null;

  try {
    const payload = JSON.parse(payloadStr);
    return payload;
  } catch {
    return null;
  }
}
