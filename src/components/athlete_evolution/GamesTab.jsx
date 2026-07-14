import React from "react";
import { Plus, Trophy, Trash2, Calendar } from "lucide-react";

export default function GamesTab({ recentGames, competitions = [], onOpenRegister, onSelectDetail, onDeleteGame }) {
  const gamesList = recentGames || [];

  // Compute Averages
  const totalGames = gamesList.length;
  const winsCount = gamesList.filter(g => g.result === "Vitória" || g.result === "V").length;
  const lossesCount = totalGames - winsCount;

  const avgPoints = totalGames > 0
    ? (gamesList.reduce((acc, g) => acc + g.points, 0) / totalGames).toFixed(1)
    : "0.0";
  const avgAssists = totalGames > 0
    ? (gamesList.reduce((acc, g) => acc + g.assists, 0) / totalGames).toFixed(1)
    : "0.0";
  const avgRebounds = totalGames > 0
    ? (gamesList.reduce((acc, g) => acc + (g.offensive_rebounds + g.defensive_rebounds), 0) / totalGames).toFixed(1)
    : "0.0";

  const total3pAttempted = gamesList.reduce((acc, g) => acc + (g.fg3_attempted || 0), 0);
  const total3pMade = gamesList.reduce((acc, g) => acc + (g.fg3_made || 0), 0);
  const avg3pPct = total3pAttempted > 0 ? Math.round((total3pMade / total3pAttempted) * 100) : 0;

  const totalFtAttempted = gamesList.reduce((acc, g) => acc + (g.ft_attempted || 0), 0);
  const totalFtMade = gamesList.reduce((acc, g) => acc + (g.ft_made || 0), 0);
  const avgFtPct = totalFtAttempted > 0 ? Math.round((totalFtMade / totalFtAttempted) * 100) : 0;

  const handleDeleteClick = (e, gameId) => {
    e.stopPropagation();
    if (window.confirm("Tem certeza que deseja excluir esta partida?")) {
      onDeleteGame(gameId);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col items-start gap-4 bg-zinc-950 p-6 rounded-3xl border border-zinc-900">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Trophy size={22} className="text-orange-500" /> Estatísticas de Jogos
          </h2>
          <p className="text-zinc-555 text-xs mt-0.5">
            Registre suas partidas oficiais ou rachas competitivos e visualize médias acumuladas.
          </p>
        </div>
        <button
          onClick={onOpenRegister}
          className="flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer shadow-glow"
        >
          <Plus size={14} className="stroke-[3]" /> Registrar Partida
        </button>
      </div>

      {/* Averages Cards */}
      {totalGames > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-800/65 rounded-xl p-4 flex flex-col justify-center">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Partidas (V-D)</span>
            <div className="text-xl font-black text-white mt-1">
              {totalGames} <span className="text-zinc-550 text-xs font-bold">({winsCount}V - {lossesCount}D)</span>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/65 rounded-xl p-4 flex flex-col justify-center">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Média Pontos</span>
            <div className="text-xl font-black text-white mt-1">{avgPoints}</div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/65 rounded-xl p-4 flex flex-col justify-center">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Média Assistências</span>
            <div className="text-xl font-black text-white mt-1">{avgAssists}</div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/65 rounded-xl p-4 flex flex-col justify-center">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Média Rebotes</span>
            <div className="text-xl font-black text-white mt-1">{avgRebounds}</div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/65 rounded-xl p-4 flex flex-col justify-center col-span-2 md:col-span-1">
            <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest">Aproveitamento (3P/FT)</span>
            <div className="text-xl font-black text-white mt-1">
              {avg3pPct}% <span className="text-zinc-500 text-xs font-bold">3P</span> / {avgFtPct}% <span className="text-zinc-500 text-xs font-bold">LL</span>
            </div>
          </div>
        </div>
      )}

      {/* Matches List */}
      {!gamesList.length ? (
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-16 text-center flex flex-col items-center gap-3">
          <Trophy size={36} className="text-zinc-650" />
          <span className="text-zinc-300 font-bold">Nenhuma partida cadastrada</span>
          <p className="text-zinc-550 text-xs max-w-sm">
            Adicione sua primeira partida clicando no botão acima e comece a rastrear seu rendimento!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {gamesList.map((game) => {
            const dateObj = new Date(game.date + "T00:00:00");
            const formattedDate = dateObj.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            });

            const comp = game.competition_id ? competitions.find(c => c.id === game.competition_id) : null;

            return (
              <div
                key={game.id}
                onClick={() => onSelectDetail(game)}
                className="bg-zinc-900/20 border border-zinc-850 hover:border-orange-500/30 rounded-2xl p-4 transition duration-200 cursor-pointer flex justify-between items-center gap-4 group"
              >
                <div className="flex items-center gap-4">
                  {/* Result Badge */}
                  <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black uppercase shrink-0 border ${game.result === 'Vitória' || game.result === 'V' ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' : 'bg-red-600/10 text-red-400 border-red-500/20'}`}>
                    {game.result === 'Vitória' || game.result === 'V' ? 'V' : 'D'}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <h4 className="text-white text-sm font-black uppercase tracking-wide group-hover:text-orange-500 transition truncate">
                        vs {game.opponent}
                      </h4>
                      {comp && (
                        <span className="px-2 py-0.5 bg-orange-600/10 text-orange-500 text-[9px] font-black rounded border border-orange-500/20 uppercase tracking-widest shrink-0">
                          {comp.name}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-550 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
                      <Calendar size={10} /> {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  {/* Basic Stats row */}
                  <div className="flex gap-4 sm:gap-8 text-right">
                    <div>
                      <span className="text-[8px] text-zinc-550 font-bold uppercase tracking-wider block">Pontos</span>
                      <span className="text-zinc-200 text-xs font-black">{game.points}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-zinc-550 font-bold uppercase tracking-wider block">Asts</span>
                      <span className="text-zinc-200 text-xs font-black">{game.assists}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-zinc-555 font-bold uppercase tracking-wider block">3P%</span>
                      <span className="text-zinc-200 text-xs font-black">
                        {game.fg3_attempted !== null && game.fg3_attempted !== undefined && game.fg3_attempted > 0
                          ? `${Math.round((game.fg3_made / game.fg3_attempted) * 100)}%`
                          : "-"}
                      </span>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDeleteClick(e, game.id)}
                    className="p-2 text-zinc-650 hover:text-red-500 bg-zinc-950 rounded-xl border border-zinc-850 hover:border-red-500/20 transition cursor-pointer"
                    title="Excluir partida"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
