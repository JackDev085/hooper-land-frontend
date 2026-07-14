import React, { useState } from "react";
import { Calendar, X } from "lucide-react";
import api from "../../services/api";

export default function JournalFormModal({ isOpen, onClose, onSuccess, onError }) {
  const [journalForm, setJournalForm] = useState({
    date: new Date().toISOString().split("T")[0],
    sleep_hours: "8",
    water_liters: "2.5",
    stretched: false,
    mobility: false,
    trained_basketball: false,
    gym: false,
    cardio: false,
    energy: 5,
    muscle_pain: 5,
    motivation: 5,
    confidence: 5,
    notes: ""
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...journalForm,
        sleep_hours: Number(journalForm.sleep_hours) || 0,
        water_liters: Number(journalForm.water_liters) || 0
      };
      await api.post("/athlete/journal", payload);
      onSuccess("Diário registrado com sucesso!");
      // Reset form observations
      setJournalForm(prev => ({ 
        ...prev, 
        sleep_hours: "8",
        water_liters: "2.5",
        notes: "" 
      }));
      onClose();
    } catch (err) {
      console.error(err);
      onError("Erro ao salvar diário. Verifique os campos.");
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
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in shadow-2xl flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
          <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Calendar size={18} className="text-orange-500" /> Registrar Hábitos Diários
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800/60"
            title="Fechar"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Data do Registro</label>
            <input
              type="date"
              value={journalForm.date}
              onChange={(e) => setJournalForm({ ...journalForm, date: e.target.value })}
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition max-w-xs"
              required
            />
          </div>

          {/* Section: Recuperação */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 border-b border-zinc-850 pb-2 mb-4">
              Recuperação
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Horas de Sono</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={journalForm.sleep_hours}
                  onChange={(e) => setJournalForm({ ...journalForm, sleep_hours: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Água Ingerida (Litros)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={journalForm.water_liters}
                  onChange={(e) => setJournalForm({ ...journalForm, water_liters: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={journalForm.stretched}
                  onChange={(e) => setJournalForm({ ...journalForm, stretched: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-800 text-orange-600 focus:ring-orange-500 bg-zinc-950 focus:ring-offset-black"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Alongamento Realizado</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={journalForm.mobility}
                  onChange={(e) => setJournalForm({ ...journalForm, mobility: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-800 text-orange-600 focus:ring-orange-500 bg-zinc-950 focus:ring-offset-black"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Mobilidade Realizada</span>
              </label>
            </div>
          </div>

          {/* Section: Atividade Física */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 border-b border-zinc-850 pb-2 mb-4">
              Atividade Física Hoje
            </h3>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={journalForm.trained_basketball}
                  onChange={(e) => setJournalForm({ ...journalForm, trained_basketball: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-800 text-orange-600 focus:ring-orange-500 bg-zinc-950 focus:ring-offset-black"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Treinei Basquete</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={journalForm.gym}
                  onChange={(e) => setJournalForm({ ...journalForm, gym: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-800 text-orange-600 focus:ring-orange-500 bg-zinc-950 focus:ring-offset-black"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Fui à Academia</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={journalForm.cardio}
                  onChange={(e) => setJournalForm({ ...journalForm, cardio: e.target.checked })}
                  className="w-4 h-4 rounded border-zinc-800 text-orange-600 focus:ring-orange-500 bg-zinc-950 focus:ring-offset-black"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Cardio Realizado</span>
              </label>
            </div>
          </div>

          {/* Section: Estado Físico & Mental */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 border-b border-zinc-850 pb-2 mb-4">
              Estado Físico & Mental
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span>Energia</span>
                  <span className="text-orange-500">{journalForm.energy} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={journalForm.energy}
                  onChange={(e) => setJournalForm({ ...journalForm, energy: Number(e.target.value) })}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span>Dor Muscular</span>
                  <span className="text-orange-500">{journalForm.muscle_pain} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={journalForm.muscle_pain}
                  onChange={(e) => setJournalForm({ ...journalForm, muscle_pain: Number(e.target.value) })}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span>Motivação</span>
                  <span className="text-orange-500">{journalForm.motivation} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={journalForm.motivation}
                  onChange={(e) => setJournalForm({ ...journalForm, motivation: Number(e.target.value) })}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span>Confiança</span>
                  <span className="text-orange-500">{journalForm.confidence} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={journalForm.confidence}
                  onChange={(e) => setJournalForm({ ...journalForm, confidence: Number(e.target.value) })}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Observações / Anotações Livres</label>
            <textarea
              rows="3"
              value={journalForm.notes}
              onChange={(e) => setJournalForm({ ...journalForm, notes: e.target.value })}
              placeholder="Como se sentiu hoje? Detalhe cansaço ou treinos..."
              className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition resize-none placeholder-zinc-700"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer shadow-glow disabled:opacity-55"
          >
            {submitting ? "Gravando..." : "Gravar Registro Diário"}
          </button>
        </form>
      </div>
    </div>
  );
}
