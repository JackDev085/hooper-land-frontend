import React from "react";
import { Target, X } from "lucide-react";

export default function GoalDetailModal({ item, onClose }) {
  if (!item) return null;

  const metricLabel = (() => {
    const mapping = {
      water_liters: "Litros de Água / Dia",
      sleep_hours: "Horas de Sono / Noite",
      stretched: "Alongamento",
      trained_basketball: "Treinos",
      points: "Média de Pontos",
      assists: "Média de Assistências",
      fg3_pct: "Aproveitamento 3 Pts (%)",
      ft_pct: "Lance Livre (%)",
      custom_value: "Valor Customizado"
    };
    return mapping[item.metric] || item.metric;
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in shadow-2xl flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
          <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Target size={18} className="text-orange-500" /> Detalhes da Meta
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800/60"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Nome</span>
            <p className="text-white text-base font-bold uppercase tracking-wide mt-0.5">{item.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Tipo</span>
              <p className="text-white text-sm font-semibold uppercase tracking-wide mt-0.5">
                {item.goal_type === "habit" ? "Hábito" : item.goal_type === "performance" ? "Performance" : "Customizada"}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Status</span>
              <p className={`text-sm font-semibold uppercase tracking-wide mt-0.5 ${item.completed ? 'text-emerald-400' : 'text-orange-500'}`}>
                {item.completed ? "Concluída" : "Em Progresso"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Métrica</span>
              <p className="text-white text-sm font-semibold mt-0.5">{metricLabel}</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Valor Alvo</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.target_value}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Data Inicial</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.start_date}</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Data Final</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.end_date}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
