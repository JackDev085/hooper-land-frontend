import axios from "axios";

const api = axios.create({
  baseURL: "https://hooper-land.vercel.app",
  //baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/auth"
    ) {
      localStorage.removeItem("token");
      window.location.href = "/auth"; // Redireciona para a página de login, exceto se já estiver em /auth
    }
    return Promise.reject(error);
  }
);
export default api;
