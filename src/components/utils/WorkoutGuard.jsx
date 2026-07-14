import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Lock, ArrowLeft, LogIn } from "lucide-react";

export default function WorkoutGuard({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="loading-spinner" aria-label="Carregando..." />
      </div>
    );
  }

  // Se não estiver logado, exibe tela de bloqueio estilizada e responsiva
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 pt-24 selection:bg-orange-500 selection:text-black">
        <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 md:p-12 max-w-md w-full text-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Top orange line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-650" />
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-500/10 rounded-full border border-orange-500/30 text-orange-500 animate-pulse">
              <Lock size={36} className="stroke-[2.5]" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-3">
            Treino <span className="text-orange-500">Restrito</span>
          </h2>

          <p className="text-zinc-450 text-xs sm:text-sm font-medium mb-8 leading-relaxed">
            Para acessar os treinos de neurocognição e aprimorar sua velocidade de tomada de decisão, é necessário estar conectado à sua conta Ballers085.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/auth"
              state={{ from: location }}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase text-xs rounded-xl transition duration-300 shadow-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn size={14} /> Fazer Login / Criar Conta
            </Link>
            
            <Link
              to="/workouts"
              className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl border border-zinc-850 transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} /> Voltar para Treinos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
