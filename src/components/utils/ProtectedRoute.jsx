import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="loading-spinner" aria-label="Carregando..." />
      </div>
    );
  }

  if (!user) {
    // Redireciona para o login salvando a página que tentou acessar
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    // Se precisar ser admin e não for, redireciona para a home
    return <Navigate to="/" replace />;
  }

  return children;
}
