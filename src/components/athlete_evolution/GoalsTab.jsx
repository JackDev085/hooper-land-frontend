import React from "react";
import { Plus, Target, Trash2, CheckCircle2, Calendar } from "lucide-react";

export default function GoalsTab({
  goalsList,
  onOpenRegister,
  onSelectDetail,
  onCompleteGoal,
  onDeleteGoal
}) {
  const list = goalsList || [];

  const handleCompleteClick = (e, goalId) => {
    e.stopPropagation();
    if (window.confirm("Deseja marcar esta meta como concluída?")) {
      onCompleteGoal(goalId);
    }
  };

  const handleDeleteClick = (e, goalId) => {
    e.stopPropagation();
    if (window.confirm("Tem certeza que deseja excluir esta meta?")) {
      onDeleteGoal(goalId);
    }
  };

  const getMetricLabel = (metric) => {
    const mapping = {
      water_liters: "L de Água / Dia",
      sleep_hours: "h de Sono / Noite",
      stretched: "Alongamento",
      trained_basketball: "Treinos",
      points: "Média de Pontos",
      assists: "Média de Assistências",
      fg3_pct: "Aproveitamento 3 Pts (%)",
      ft_pct: "Lance Livre (%)",
      custom_value: "Valor Customizado"
    };
    return mapping[metric] || metric;
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col items-start gap-4 bg-zinc-950 p-6 rounded-3xl border border-zinc-900">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Target size={22} className="text-orange-500" /> Metas & Objetivos
          </h2>
          <p className="text-zinc-550 text-xs mt-0.5">
            Defina objetivos de curto, médio ou longo prazo para seus hábitos ou estatísticas em quadra.
          </p>
        </div>
        <button
          onClick={onOpenRegister}
          className="flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer shadow-glow"
        >
          <Plus size={14} className="stroke-[3]" /> Criar Metas
        </button>
      </div>

      {!list.length ? (
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-16 text-center flex flex-col items-center gap-3">
          <Target size={36} className="text-zinc-650" />
          <span className="text-zinc-300 font-bold">Nenhuma meta criada</span>
          <p className="text-zinc-550 text-xs max-w-sm">
            Clique no botão acima para definir seus objetivos e começar a acompanhar sua evolução!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {list.map((goal) => {
            const startDateObj = new Date(goal.start_date + "T00:00:00");
            const endDateObj = new Date(goal.end_date + "T00:00:00");
            const startFormatted = startDateObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
            const endFormatted = endDateObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

            return (
              <div
                key={goal.id}
                onClick={() => onSelectDetail(goal)}
                className={`bg-zinc-900/20 border rounded-2xl p-5 transition duration-200 cursor-pointer flex flex-col justify-between gap-4 group ${goal.completed ? 'border-emerald-500/10 hover:border-emerald-500/20' : 'border-zinc-850 hover:border-orange-500/30'
                  }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${goal.goal_type === 'habit' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : goal.goal_type === 'performance' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'}`}>
                      {goal.goal_type === 'habit' ? 'Hábito' : goal.goal_type === 'performance' ? 'Performance' : 'Custom'}
                    </span>
                    <h4 className="text-white text-sm font-black uppercase tracking-wide mt-2 group-hover:text-orange-500 transition line-clamp-1">
                      {goal.name}
                    </h4>
                  </div>

                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${goal.completed ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' : 'bg-orange-600/10 text-orange-400 border-orange-500/20'}`}>
                    {goal.completed ? 'Concluída' : 'Em Progresso'}
                  </span>
                </div>

                <div className="flex justify-between items-end border-t border-zinc-900 pt-3.5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider block">
                      Alvo: {goal.target_value} {getMetricLabel(goal.metric)}
                    </span>
                    <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={10} /> {startFormatted} até {endFormatted}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {!goal.completed && (
                      <button
                        onClick={(e) => handleCompleteClick(e, goal.id)}
                        className="p-2 text-zinc-600 hover:text-emerald-400 bg-zinc-950 rounded-xl border border-zinc-850 hover:border-emerald-500/20 transition cursor-pointer"
                        title="Concluir meta"
                      >
                        <CheckCircle2 size={13} />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDeleteClick(e, goal.id)}
                      className="p-2 text-zinc-660 hover:text-red-500 bg-zinc-950 rounded-xl border border-zinc-850 hover:border-red-500/20 transition cursor-pointer"
                      title="Excluir meta"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
