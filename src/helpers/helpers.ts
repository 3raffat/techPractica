export const setToken = (token: string) => {
  sessionStorage.setItem("access_token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("access_token");
};

export const clearToken = () => {
  sessionStorage.removeItem("access_token");
};

export const isAuthenticated = () => !!getToken();
