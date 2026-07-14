import React from "react";
import {
  Flame,
  Dumbbell,
  Activity,
  Award,
  Calendar,
  Moon,
  Droplets,
  Brain,
  Trophy,
  TrendingUp
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line
} from "recharts";

export default function DashboardTab({
  dashboardData,
  daysFilter,
  setDaysFilter,
  setActiveTab
}) {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Section 1 - Consistência */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden group hover:border-orange-500/20 transition duration-300">
          <div className="absolute top-0 right-0 p-3 text-orange-500/5 -mt-2 -mr-2 group-hover:scale-110 transition duration-300">
            <Flame size={120} />
          </div>
          <div className="p-4 bg-orange-600/10 rounded-xl text-orange-500 border border-orange-500/20">
            <Flame size={24} className="fill-orange-500" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Dias Seguidos Registrados</span>
            <div className="text-3xl font-black text-white mt-0.5">
              {dashboardData.consistency.streak} {dashboardData.consistency.streak === 1 ? 'Dia' : 'Dias'}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-medium">Consistência gera evolução.</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden group hover:border-orange-500/20 transition duration-300">
          <div className="absolute top-0 right-0 p-3 text-orange-500/5 -mt-2 -mr-2 group-hover:scale-110 transition duration-300">
            <Dumbbell size={120} />
          </div>
          <div className="p-4 bg-orange-600/10 rounded-xl text-orange-500 border border-orange-500/20">
            <Dumbbell size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Treinos no Mês Atual</span>
            <div className="text-3xl font-black text-white mt-0.5">
              {dashboardData.consistency.workouts_this_month} {dashboardData.consistency.workouts_this_month === 1 ? 'Treino' : 'Treinos'}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-medium">Histórico acumulado de treinos.</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden group hover:border-orange-500/20 transition duration-300">
          <div className="absolute top-0 right-0 p-3 text-orange-500/5 -mt-2 -mr-2 group-hover:scale-110 transition duration-300">
            <Activity size={120} />
          </div>
          <div className="p-4 bg-orange-600/10 rounded-xl text-orange-500 border border-orange-500/20">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Frequência Semanal (Treinos)</span>
            <div className="text-3xl font-black text-white mt-0.5">
              {dashboardData.consistency.weekly_frequency}x <span className="text-zinc-500 text-xs font-normal">/ semana</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-medium">Nos últimos 7 dias registrados.</p>
          </div>
        </div>
      </div>

      {/* Section: Evolução Comparativa */}
      {dashboardData.monthly_comparison?.has_data && (
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-700" />
          <h3 className="text-sm font-black uppercase tracking-wider text-orange-500 mb-4 flex items-center gap-2">
            <Award size={16} /> Evolução Comparativa (Mês Atual x Mês Anterior)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex flex-col justify-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Média de Pontos</span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className={`text-2xl font-black ${dashboardData.monthly_comparison.points_pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {dashboardData.monthly_comparison.points_pct >= 0 ? '+' : ''}{dashboardData.monthly_comparison.points_pct}%
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">pontuação por jogo</span>
              </div>
            </div>

            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex flex-col justify-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Média de Assistências</span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className={`text-2xl font-black ${dashboardData.monthly_comparison.assists_pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {dashboardData.monthly_comparison.assists_pct >= 0 ? '+' : ''}{dashboardData.monthly_comparison.assists_pct}%
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">passes decisivos</span>
              </div>
            </div>

            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex flex-col justify-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Aproveitamento de 3 Pontos</span>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className={`text-2xl font-black ${dashboardData.monthly_comparison.fg3_pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {dashboardData.monthly_comparison.fg3_pct >= 0 ? '+' : ''}{dashboardData.monthly_comparison.fg3_pct}%
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">precisão de arremesso</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2 - Hábitos */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Hábitos & Recuperação</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Visão histórica da sua saúde diária.</p>
          </div>
          {/* Filter */}
          <div className="flex bg-zinc-950 p-0.5 rounded-xl border border-zinc-900 self-start sm:self-auto">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setDaysFilter(days)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${daysFilter === days ? "bg-orange-600 text-black font-black" : "text-zinc-400 hover:text-white"
                  }`}
              >
                {days} Dias
              </button>
            ))}
          </div>
        </div>

        {!dashboardData.habits?.length ? (
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-12 text-center flex flex-col items-center gap-3">
            <Calendar size={32} className="text-zinc-600" />
            <span className="text-zinc-400 text-sm font-bold">Nenhum registro diário encontrado</span>
            <p className="text-zinc-500 text-xs max-w-sm">
              Para visualizar os gráficos de sono, água e fadiga, acesse a aba "Diário" e faça seu primeiro registro diário de hábitos.
            </p>
            <button
              onClick={() => setActiveTab("journal")}
              className="mt-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase text-xs rounded-xl transition"
            >
              Registrar Hábitos Hoje
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sono & Água */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-6 flex items-center gap-2">
                <Moon size={14} /> Histórico de Sono (Horas/Noite)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.habits} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                    <YAxis stroke="#71717a" fontSize={9} domain={[0, 12]} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="sleep_hours" name="Horas de Sono" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSleep)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-6 flex items-center gap-2">
                <Droplets size={14} /> Hidratação Diária (Litros)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.habits} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                    <YAxis stroke="#71717a" fontSize={9} domain={[0, 6]} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }} />
                    <Bar dataKey="water_liters" name="Água (L)" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Energia & Dor */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:col-span-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-6 flex items-center gap-2">
                <Brain size={14} /> Níveis de Energia vs Dor Muscular (Escala 1-10)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.habits} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                    <YAxis stroke="#71717a" fontSize={9} domain={[1, 10]} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="energy" name="Energia" stroke="#f97316" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="muscle_pain" name="Dor Muscular" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 3 - Estatísticas de Jogos */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white">Estatísticas de Partidas</h2>
          <p className="text-zinc-500 text-xs mt-0.5">Visão gráfica da evolução do seu jogo.</p>
        </div>

        {!dashboardData.game_stats?.length ? (
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-12 text-center flex flex-col items-center gap-3">
            <Trophy size={32} className="text-zinc-600" />
            <span className="text-zinc-400 text-sm font-bold">Nenhuma partida registrada</span>
            <p className="text-zinc-500 text-xs max-w-sm">
              Para visualizar gráficos de pontos, rebotes, assistências e aproveitamentos de chute, registre suas partidas na aba "Estatísticas".
            </p>
            <button
              onClick={() => setActiveTab("games")}
              className="mt-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase text-xs rounded-xl transition"
            >
              Registrar Partida
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pontos por Jogo */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-6 flex items-center gap-2">
                <Trophy size={14} /> Pontos por Partida
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.game_stats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                    <YAxis stroke="#71717a" fontSize={9} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }} />
                    <Bar dataKey="points" name="Pontos" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Assistências & Rebotes */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-6 flex items-center gap-2">
                <Activity size={14} /> Criação & Defesa (Passes e Rebotes)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.game_stats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                    <YAxis stroke="#71717a" fontSize={9} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="assists" name="Assistências" stroke="#f97316" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="rebounds" name="Rebotes" stroke="#a1a1aa" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Aproveitamento % */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:col-span-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-6 flex items-center gap-2">
                <TrendingUp size={14} /> Precisão de Chute (FT% & 3PT%)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.game_stats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={9} />
                    <YAxis stroke="#71717a" fontSize={9} domain={[0, 100]} unit="%" />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="fg3_pct" name="Bolas de 3 (%)" stroke="#f97316" strokeWidth={2.5} fillOpacity={0.15} fill="#f97316" />
                    <Area type="monotone" dataKey="ft_pct" name="Lances Livres (%)" stroke="#3b82f6" strokeWidth={2} fillOpacity={0.05} fill="#3b82f6" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
