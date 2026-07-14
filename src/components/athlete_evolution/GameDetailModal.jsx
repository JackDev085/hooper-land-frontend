import React from "react";
import { Trophy, X } from "lucide-react";

export default function GameDetailModal({ item, competitions = [], onClose }) {
  if (!item) return null;

  const comp = item.competition_id ? competitions.find(c => c.id === item.competition_id) : null;

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
            <Trophy size={18} className="text-orange-500" /> Detalhes da Partida
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800/60"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Adversário</span>
              <p className="text-white text-base font-bold uppercase tracking-wide mt-0.5">{item.opponent}</p>
              {comp && (
                <p className="text-orange-550 text-[10px] font-bold uppercase tracking-wider mt-1.5">
                  Competição: {comp.name} {comp.season ? `(${comp.season})` : ""}
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Resultado</span>
              <div className="mt-1">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded border ${item.result === 'Vitória' || item.result === 'V' ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' : 'bg-red-600/10 text-red-400 border-red-500/20'}`}>
                  {item.result}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Data</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.date}</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-550">Minutos Jogados</span>
              <p className="text-white text-sm font-semibold mt-0.5">{item.minutes_played || 0} min</p>
            </div>
          </div>

          <div className="border-t border-zinc-850 pt-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-3">Pontuação & Arremessos</h4>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-550">Pontos</span>
                <p className="text-white text-sm font-black mt-0.5">{item.points}</p>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-550">Lance Livre</span>
                <p className="text-white text-sm font-semibold mt-0.5">
                  {item.ft_attempted !== null && item.ft_attempted !== undefined ? (
                    <>
                      {item.ft_made}/{item.ft_attempted}
                      <span className="text-zinc-500 text-[10px] ml-1">
                        ({item.ft_attempted > 0 ? ((item.ft_made / item.ft_attempted) * 100).toFixed(0) : 0}%)
                      </span>
                    </>
                  ) : (
                    <>{item.ft_made} convertidos</>
                  )}
                </p>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-550">3 Pontos</span>
                <p className="text-white text-sm font-semibold mt-0.5">
                  {item.fg3_attempted !== null && item.fg3_attempted !== undefined ? (
                    <>
                      {item.fg3_made}/{item.fg3_attempted}
                      <span className="text-zinc-500 text-[10px] ml-1">
                        ({item.fg3_attempted > 0 ? ((item.fg3_made / item.fg3_attempted) * 100).toFixed(0) : 0}%)
                      </span>
                    </>
                  ) : (
                    <>{item.fg3_made} convertidos</>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-850 pt-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-500 mb-3">Estatísticas Gerais</h4>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Assistências:</span>
                <span className="text-white font-bold text-xs">{item.assists}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Roubos de Bola:</span>
                <span className="text-white font-bold text-xs">{item.steals}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Tocos:</span>
                <span className="text-white font-bold text-xs">{item.blocks}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Turnovers:</span>
                <span className="text-white font-bold text-xs">{item.turnovers}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Reb. Ofensivos:</span>
                <span className="text-white font-bold text-xs">{item.offensive_rebounds}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Reb. Defensivos:</span>
                <span className="text-white font-bold text-xs">{item.defensive_rebounds}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Faltas Cometidas:</span>
                <span className="text-white font-bold text-xs">{item.fouls_committed}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Faltas Recebidas:</span>
                <span className="text-white font-bold text-xs">{item.fouls_drawn}</span>
              </div>
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
