import React from "react";
import { Calendar, X } from "lucide-react";

export default function JournalDetailModal({ item, onClose }) {
  if (!item) return null;

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
            <Calendar size={18} className="text-orange-500" /> Detalhes do Registro Diário
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
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Data</span>
            <p className="text-white text-base font-bold mt-0.5">{item.date}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Horas de Sono</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.sleep_hours} horas</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Água Consumida</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.water_liters} Litros</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Nível de Energia</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.energy} / 10</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Dor Muscular</span>
              <p className="text-red-400 text-sm font-semibold mt-0.5">{item.muscle_pain} / 10</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Motivação</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.motivation} / 10</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Confiança</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.confidence} / 10</p>
            </div>
          </div>

          {/* Boolean activities */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Atividades Realizadas</span>
            <div className="flex flex-wrap gap-2 mt-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.trained_basketball || item.trained ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-zinc-950 text-zinc-650 border border-zinc-850'}`}>
                Treinei Basquete
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.gym ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-zinc-950 text-zinc-650 border border-zinc-850'}`}>
                Academia
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.cardio ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-zinc-950 text-zinc-650 border border-zinc-850'}`}>
                Cardio
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.stretched || item.mobility ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-zinc-950 text-zinc-650 border border-zinc-850'}`}>
                Alongamento / Mobilidade
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Observações / Anotações</span>
            <p className="text-zinc-300 text-xs mt-1 bg-zinc-950 p-3 rounded-xl border border-zinc-850 whitespace-pre-wrap leading-relaxed min-h-[60px]">
              {item.notes || "Nenhuma anotação registrada."}
            </p>
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
