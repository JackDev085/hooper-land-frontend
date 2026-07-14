import React, { useState } from "react";
import { Target, X } from "lucide-react";
import api from "../../services/api";

export default function GoalFormModal({ isOpen, onClose, onSuccess, onError }) {
  const [goalForm, setGoalForm] = useState({
    name: "",
    goal_type: "habit",
    metric: "water_liters",
    target_value: 3.0,
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goalForm.name.trim()) {
      onError("Dê um nome para a sua meta.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/athlete/goals", goalForm);
      onSuccess("Meta criada!");
      setGoalForm({
        name: "",
        goal_type: "habit",
        metric: "water_liters",
        target_value: 3.0,
        start_date: new Date().toISOString().split("T")[0],
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      });
      onClose();
    } catch (err) {
      console.error(err);
      onError("Erro ao criar meta.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <Target size={18} className="text-orange-500" /> Criar Nova Meta
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800/60"
            title="Fechar"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nome da Meta</label>
            <input
              type="text"
              value={goalForm.name}
              onChange={(e) => setGoalForm({ ...goalForm, name: e.target.value })}
              placeholder="Ex: Dormir 8h por noite"
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition placeholder-zinc-750"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tipo de Meta</label>
            <select
              value={goalForm.goal_type}
              onChange={(e) => setGoalForm({ ...goalForm, goal_type: e.target.value })}
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition cursor-pointer"
            >
              <option value="habit">Meta de Hábito</option>
              <option value="performance">Meta de Performance</option>
              <option value="custom">Meta Personalizada</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Métrica Alvo</label>
            <select
              value={goalForm.metric}
              onChange={(e) => setGoalForm({ ...goalForm, metric: e.target.value })}
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition cursor-pointer"
            >
              {goalForm.goal_type === "habit" ? (
                <>
                  <option value="water_liters">Litros de Água / Dia</option>
                  <option value="sleep_hours">Horas de Sono / Noite</option>
                  <option value="stretched">Alongamentos Concluídos</option>
                  <option value="trained_basketball">Treinos de Basquete</option>
                </>
              ) : goalForm.goal_type === "performance" ? (
                <>
                  <option value="points">Média de Pontos</option>
                  <option value="assists">Média de Assistências</option>
                  <option value="fg3_pct">Aproveitamento de 3 Pts (%)</option>
                  <option value="ft_pct">Aproveitamento de Lance Livre (%)</option>
                </>
              ) : (
                <>
                  <option value="custom_value">Valor Customizado</option>
                </>
              )}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Valor Alvo</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={goalForm.target_value}
              onChange={(e) => setGoalForm({ ...goalForm, target_value: Number(e.target.value) })}
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Data Inicial</label>
            <input
              type="date"
              value={goalForm.start_date}
              onChange={(e) => setGoalForm({ ...goalForm, start_date: e.target.value })}
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Data Final (Alvo)</label>
            <input
              type="date"
              value={goalForm.end_date}
              onChange={(e) => setGoalForm({ ...goalForm, end_date: e.target.value })}
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer shadow-glow mt-2"
          >
            {submitting ? "Criando..." : "Criar Meta"}
          </button>
        </form>
      </div>
    </div>
  );
}
