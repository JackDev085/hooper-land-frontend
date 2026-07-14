import React from "react";
import { Plus, Calendar, Heart, Award, Moon, Droplets } from "lucide-react";

export default function JournalTab({ dashboardData, onOpenRegister, onSelectDetail }) {
  const habitsList = dashboardData.habits || [];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col items-start gap-4 bg-zinc-950 p-6 rounded-3xl border border-zinc-900">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Calendar size={22} className="text-orange-500" /> Diário de Hábitos
          </h2>
          <p className="text-zinc-550 text-xs mt-0.5">
            Acompanhe o sono, a ingestão de água, a fadiga muscular e as atividades de foco.
          </p>
        </div>
        <button
          onClick={onOpenRegister}
          className="flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer shadow-glow"
        >
          <Plus size={14} className="stroke-[3]" /> Registrar Atividade
        </button>
      </div>

      {!habitsList.length ? (
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-16 text-center flex flex-col items-center gap-3">
          <Calendar size={36} className="text-zinc-650" />
          <span className="text-zinc-300 font-bold">Nenhum hábito diário registrado</span>
          <p className="text-zinc-550 text-xs max-w-sm">
            Clique no botão acima para registrar suas horas de sono, consumo de água e treinos de hoje!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {habitsList.map((item) => {
            const dateObj = new Date(item.date + "T00:00:00");
            const formattedDate = dateObj.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            });
            const weekday = dateObj.toLocaleDateString("pt-BR", { weekday: "short" });

            return (
              <div
                key={item.id || item.date}
                onClick={() => onSelectDetail(item)}
                className="bg-zinc-900/30 border border-zinc-850 hover:border-orange-500/30 rounded-2xl p-5 transition duration-200 cursor-pointer flex flex-col justify-between gap-4 group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">
                      {weekday}
                    </span>
                    <p className="text-white text-sm font-bold mt-0.5 group-hover:text-orange-500 transition">
                      {formattedDate}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {(item.trained_basketball || item.trained) && (
                      <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded" title="Basquete">
                        Bq
                      </span>
                    )}
                    {item.gym && (
                      <span className="bg-zinc-950 text-zinc-400 border border-zinc-800 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded" title="Academia">
                        Ac
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-zinc-850 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Moon size={10} /> Sono
                    </span>
                    <span className="text-zinc-200 text-xs font-black mt-0.5">{item.sleep_hours}h</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Droplets size={10} /> Água
                    </span>
                    <span className="text-zinc-200 text-xs font-black mt-0.5">{item.water_liters}L</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Heart size={10} /> Dor
                    </span>
                    <span className={`text-xs font-black mt-0.5 ${item.muscle_pain > 6 ? 'text-red-400' : 'text-zinc-200'}`}>
                      {item.muscle_pain}/10
                    </span>
                  </div>
                </div>

                {item.notes && (
                  <div className="text-[10px] text-zinc-400 italic line-clamp-1 border-t border-zinc-900 pt-2.5">
                    "{item.notes}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
