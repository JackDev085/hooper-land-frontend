// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega token do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (token, userData) => {
    localStorage.setItem("token", token);
    try {
      const response = await api.get("/me");
      if (response.status === 200) {
        userData = response.data;
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    setUser(null);
  };

  // Atualizar dados do usuário localmente
  const updateUser = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem("user_data", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
