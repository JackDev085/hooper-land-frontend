import React from "react";
import { Calendar, Trophy, Target, Dumbbell } from "lucide-react";

export default function QuantitativeSummary({ dashboardData, recentGames, goalsList }) {
  const habitsCount = dashboardData.habits?.length || 0;
  const avgSleep = habitsCount > 0
    ? (dashboardData.habits.reduce((acc, h) => acc + h.sleep_hours, 0) / habitsCount).toFixed(1)
    : "0.0";
  const avgWater = habitsCount > 0
    ? (dashboardData.habits.reduce((acc, h) => acc + h.water_liters, 0) / habitsCount).toFixed(1)
    : "0.0";

  const totalGames = recentGames?.length || 0;
  const winsCount = recentGames?.filter(g => g.result === "Vitória" || g.result === "V").length || 0;
  const lossesCount = totalGames - winsCount;
  const avgPoints = totalGames > 0
    ? (recentGames.reduce((acc, g) => acc + g.points, 0) / totalGames).toFixed(1)
    : "0.0";
  const avgAssists = totalGames > 0
    ? (recentGames.reduce((acc, g) => acc + g.assists, 0) / totalGames).toFixed(1)
    : "0.0";

  const totalGoals = goalsList?.length || 0;
  const completedGoals = goalsList?.filter(g => g.completed).length || 0;
  const goalsSuccessRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-black uppercase tracking-tight text-white">Resumo Geral por Módulo</h2>
        <p className="text-zinc-550 text-xs mt-0.5">Visão rápida e consolidada de cada pilar da sua evolução.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Diário */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 hover:border-orange-500/20 transition duration-300 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-600/10 rounded-xl text-orange-500 border border-orange-500/10">
              <Calendar size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Diário do Atleta</span>
          </div>
          <div className="flex flex-col gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1 border-t border-zinc-850 pt-3">
            <div className="flex justify-between">
              <span>Registros:</span>
              <span className="text-white">{habitsCount} dias</span>
            </div>
            <div className="flex justify-between">
              <span>Média Sono:</span>
              <span className="text-white">{avgSleep}h/noite</span>
            </div>
            <div className="flex justify-between">
              <span>Média Água:</span>
              <span className="text-white">{avgWater}L/dia</span>
            </div>
          </div>
        </div>

        {/* Card 2: Estatísticas */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 hover:border-orange-500/20 transition duration-300 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-600/10 rounded-xl text-orange-500 border border-orange-500/10">
              <Trophy size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Partidas & Stats</span>
          </div>
          <div className="flex flex-col gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1 border-t border-zinc-850 pt-3">
            <div className="flex justify-between">
              <span>Jogos:</span>
              <span className="text-white">{totalGames} ({winsCount}V-{lossesCount}D)</span>
            </div>
            <div className="flex justify-between">
              <span>Média Pts:</span>
              <span className="text-white">{avgPoints} pts</span>
            </div>
            <div className="flex justify-between">
              <span>Média Ast:</span>
              <span className="text-white">{avgAssists} ast</span>
            </div>
          </div>
        </div>

        {/* Card 3: Metas (Comentado)
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 hover:border-orange-500/20 transition duration-300 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-600/10 rounded-xl text-orange-500 border border-orange-500/10">
              <Target size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Metas & Objetivos</span>
          </div>
          <div className="flex flex-col gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1 border-t border-zinc-850 pt-3">
            <div className="flex justify-between">
              <span>Total Metas:</span>
              <span className="text-white">{totalGoals}</span>
            </div>
            <div className="flex justify-between">
              <span>Concluídas:</span>
              <span className="text-white text-emerald-400">{completedGoals}</span>
            </div>
            <div className="flex justify-between">
              <span>Sucesso:</span>
              <span className="text-white">{goalsSuccessRate}%</span>
            </div>
          </div>
        </div>
        */}

        {/* Card 4: Treinos */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 hover:border-orange-500/20 transition duration-300 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-600/10 rounded-xl text-orange-500 border border-orange-500/10">
              <Dumbbell size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Treino & Foco</span>
          </div>
          <div className="flex flex-col gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1 border-t border-zinc-850 pt-3">
            <div className="flex justify-between">
              <span>Treinos no Mês:</span>
              <span className="text-white">{dashboardData.consistency.workouts_this_month}</span>
            </div>
            <div className="flex justify-between">
              <span>Freq. Semanal:</span>
              <span className="text-white">{dashboardData.consistency.weekly_frequency}x/semana</span>
            </div>
            <div className="flex justify-between">
              <span>Sequência:</span>
              <span className="text-white text-orange-400">{dashboardData.consistency.streak} dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
