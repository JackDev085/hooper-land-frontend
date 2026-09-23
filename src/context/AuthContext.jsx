// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sincroniza dados atualizados do usuário diretamente do backend
  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const response = await api.get("/me");
      if (response.status === 200 && response.data) {
        localStorage.setItem("user_data", JSON.stringify(response.data));
        setUser(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao sincronizar dados do usuário:", error);
      if (error?.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Carrega token e dados locais ao iniciar e sincroniza com o servidor
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Erro ao ler dados locais do usuário:", err);
      }
    }

    if (token) {
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Sincroniza automaticamente quando o usuário volta para o app/aba
  useEffect(() => {
    const handleSyncOnFocus = () => {
      if (document.visibilityState === "visible" && localStorage.getItem("token")) {
        refreshUser();
      }
    };

    window.addEventListener("focus", handleSyncOnFocus);
    document.addEventListener("visibilitychange", handleSyncOnFocus);

    return () => {
      window.removeEventListener("focus", handleSyncOnFocus);
      document.removeEventListener("visibilitychange", handleSyncOnFocus);
    };
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
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
