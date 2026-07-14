import React, { useState, useEffect } from "react";
import { Trophy, X } from "lucide-react";
import api from "../../services/api";

export default function GameFormModal({ isOpen, onClose, onSuccess, onError }) {
  const [gameForm, setGameForm] = useState({
    date: new Date().toISOString().split("T")[0],
    opponent: "",
    result: "Vitória",
    competition_id: "",
    points: "",
    ft_made: "",
    ft_attempted: "",
    fg2_made: "",
    fg2_attempted: "",
    fg3_made: "",
    fg3_attempted: "",
    assists: "",
    turnovers: "",
    offensive_rebounds: "",
    defensive_rebounds: "",
    steals: "",
    blocks: "",
    fouls_committed: "",
    fouls_drawn: ""
  });

  const [competitions, setCompetitions] = useState([]);
  const [showNewCompForm, setShowNewCompForm] = useState(false);
  const [newComp, setNewComp] = useState({ name: "", season: "" });
  const [compError, setCompError] = useState("");
  const [creatingComp, setCreatingComp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCompetitions();
    }
  }, [isOpen]);

  const fetchCompetitions = async () => {
    try {
      const res = await api.get("/athlete/competitions");
      setCompetitions(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar competições:", err);
    }
  };

  const handleCreateCompetition = async () => {
    if (!newComp.name.trim()) {
      setCompError("O nome da competição é obrigatório.");
      return;
    }
    setCreatingComp(true);
    setCompError("");
    try {
      const res = await api.post("/athlete/competitions", {
        name: newComp.name,
        season: newComp.season || null
      });
      const created = res.data;
      setCompetitions((prev) => [...prev, created]);
      setGameForm((prev) => ({ ...prev, competition_id: created.id }));
      setShowNewCompForm(false);
      setNewComp({ name: "", season: "" });
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.detail || "Erro ao criar competição.";
      setCompError(errMsg);
    } finally {
      setCreatingComp(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gameForm.opponent.trim()) {
      onError("Por favor, digite o nome do adversário.");
      return;
    }

    const payload = {
      date: gameForm.date,
      opponent: gameForm.opponent,
      result: gameForm.result,
      competition_id: gameForm.competition_id || null,
      points: Number(gameForm.points) || 0,
      ft_made: Number(gameForm.ft_made) || 0,
      ft_attempted: gameForm.ft_attempted === "" ? null : Number(gameForm.ft_attempted),
      fg2_made: Number(gameForm.fg2_made) || 0,
      fg2_attempted: gameForm.fg2_attempted === "" ? null : Number(gameForm.fg2_attempted),
      fg3_made: Number(gameForm.fg3_made) || 0,
      fg3_attempted: gameForm.fg3_attempted === "" ? null : Number(gameForm.fg3_attempted),
      assists: Number(gameForm.assists) || 0,
      turnovers: Number(gameForm.turnovers) || 0,
      offensive_rebounds: Number(gameForm.offensive_rebounds) || 0,
      defensive_rebounds: Number(gameForm.defensive_rebounds) || 0,
      steals: Number(gameForm.steals) || 0,
      blocks: Number(gameForm.blocks) || 0,
      fouls_committed: Number(gameForm.fouls_committed) || 0,
      fouls_drawn: Number(gameForm.fouls_drawn) || 0
    };

    if (payload.ft_attempted !== null && payload.ft_made > payload.ft_attempted) {
      onError("Lances livres convertidos não podem ser maiores do que tentados.");
      return;
    }
    if (payload.fg2_attempted !== null && payload.fg2_made > payload.fg2_attempted) {
      onError("Bolas de 2 convertidas não podem ser maiores do que tentadas.");
      return;
    }
    if (payload.fg3_attempted !== null && payload.fg3_made > payload.fg3_attempted) {
      onError("Bolas de 3 convertidas não podem ser maiores do que tentadas.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/athlete/game", payload);
      onSuccess("Estatísticas de jogo salvas!");
      // Reset form
      setGameForm({
        date: new Date().toISOString().split("T")[0],
        opponent: "",
        result: "Vitória",
        competition_id: "",
        points: "",
        ft_made: "",
        ft_attempted: "",
        fg2_made: "",
        fg2_attempted: "",
        fg3_made: "",
        fg3_attempted: "",
        assists: "",
        turnovers: "",
        offensive_rebounds: "",
        defensive_rebounds: "",
        steals: "",
        blocks: "",
        fouls_committed: "",
        fouls_drawn: ""
      });
      onClose();
    } catch (err) {
      console.error(err);
      onError("Erro ao registrar partida.");
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
            <Trophy size={18} className="text-orange-500" /> Cadastrar Estatísticas de Partida
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
          {/* General Info */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 border-b border-zinc-850 pb-2 mb-4">
              Informações Gerais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Data</label>
                <input
                  type="date"
                  value={gameForm.date}
                  onChange={(e) => setGameForm({ ...gameForm, date: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Adversário</label>
                <input
                  type="text"
                  value={gameForm.opponent}
                  onChange={(e) => setGameForm({ ...gameForm, opponent: e.target.value })}
                  placeholder="Ex: Raptors"
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition placeholder-zinc-750"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Competição</label>
                <select
                  value={gameForm.competition_id}
                  onChange={(e) => {
                    if (e.target.value === "CREATE_NEW") {
                      setShowNewCompForm(true);
                    } else {
                      setGameForm({ ...gameForm, competition_id: e.target.value });
                    }
                  }}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition cursor-pointer"
                >
                  <option value="">Avulso (Sem Competição)</option>
                  {competitions.filter(c => c.active).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.season ? `(${c.season})` : ""}
                    </option>
                  ))}
                  <option value="CREATE_NEW" className="text-orange-500 font-bold bg-zinc-950">
                    + Criar nova competição...
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Resultado</label>
                <select
                  value={gameForm.result}
                  onChange={(e) => setGameForm({ ...gameForm, result: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition cursor-pointer"
                >
                  <option value="Vitória">Vitória</option>
                  <option value="Derrota">Derrota</option>
                </select>
              </div>
            </div>

            {/* Inline Competition Creation Form */}
            {showNewCompForm && (
              <div className="bg-zinc-950 border border-orange-500/20 rounded-2xl p-4 flex flex-col gap-3 mt-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black uppercase tracking-wider text-orange-500">Nova Competição</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCompForm(false);
                      setNewComp({ name: "", season: "" });
                      setCompError("");
                      setGameForm(prev => ({ ...prev, competition_id: "" }));
                    }}
                    className="text-[10px] text-zinc-400 hover:text-white uppercase font-bold"
                  >
                    Cancelar
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Nome da Competição</label>
                    <input
                      type="text"
                      value={newComp.name}
                      onChange={(e) => setNewComp({ ...newComp, name: e.target.value })}
                      placeholder="Ex: Liga de Verão"
                      className="bg-zinc-900 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Temporada / Ano (Opcional)</label>
                    <input
                      type="text"
                      value={newComp.season}
                      onChange={(e) => setNewComp({ ...newComp, season: e.target.value })}
                      placeholder="Ex: 2026"
                      className="bg-zinc-900 text-white border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>
                </div>
                {compError && <p className="text-[10px] text-red-500 font-medium">{compError}</p>}
                <button
                  type="button"
                  disabled={creatingComp}
                  onClick={handleCreateCompetition}
                  className="self-end px-4 py-2 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-wider text-[10px] rounded-lg transition disabled:opacity-50"
                >
                  {creatingComp ? "Salvando..." : "Adicionar Competição"}
                </button>
              </div>
            )}
          </div>

          {/* Offensive Stats */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 border-b border-zinc-850 pb-2 mb-4">
              Pontuação e Chutes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Pontos Totais</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.points}
                  onChange={(e) => setGameForm({ ...gameForm, points: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>

              {/* Free Throws */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">L. Livres (Convertidos)</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.ft_made}
                  onChange={(e) => setGameForm({ ...gameForm, ft_made: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  L. Livres (Tentados) <span className="text-[8px] text-zinc-550 font-normal">(Opcional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.ft_attempted}
                  onChange={(e) => setGameForm({ ...gameForm, ft_attempted: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* 3 Pointers */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">3 Pts (Convertidos)</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.fg3_made}
                  onChange={(e) => setGameForm({ ...gameForm, fg3_made: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  3 Pts (Tentados) <span className="text-[8px] text-zinc-550 font-normal">(Opcional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.fg3_attempted}
                  onChange={(e) => setGameForm({ ...gameForm, fg3_attempted: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* 2 Pointers */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">2 Pts (Convertidos)</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.fg2_made}
                  onChange={(e) => setGameForm({ ...gameForm, fg2_made: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  2 Pts (Tentados) <span className="text-[8px] text-zinc-550 font-normal">(Opcional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.fg2_attempted}
                  onChange={(e) => setGameForm({ ...gameForm, fg2_attempted: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Playmaking & Defense */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-500 border-b border-zinc-850 pb-2 mb-4">
              Criação, Defesa e Faltas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Assistências</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.assists}
                  onChange={(e) => setGameForm({ ...gameForm, assists: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Desperdícios (TO)</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.turnovers}
                  onChange={(e) => setGameForm({ ...gameForm, turnovers: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Rebotes Ofensivos</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.offensive_rebounds}
                  onChange={(e) => setGameForm({ ...gameForm, offensive_rebounds: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Rebotes Defensivos</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.defensive_rebounds}
                  onChange={(e) => setGameForm({ ...gameForm, defensive_rebounds: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Roubos (Steals)</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.steals}
                  onChange={(e) => setGameForm({ ...gameForm, steals: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tocos (Blocks)</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.blocks}
                  onChange={(e) => setGameForm({ ...gameForm, blocks: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Faltas Cometidas</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.fouls_committed}
                  onChange={(e) => setGameForm({ ...gameForm, fouls_committed: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Faltas Sofridas</label>
                <input
                  type="number"
                  min="0"
                  value={gameForm.fouls_drawn}
                  onChange={(e) => setGameForm({ ...gameForm, fouls_drawn: e.target.value })}
                  className="bg-zinc-950 text-white border border-zinc-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer shadow-glow disabled:opacity-55 mt-2"
          >
            {submitting ? "Salvando..." : "Salvar Partida & Estatísticas"}
          </button>
        </form>
      </div>
    </div>
  );
}
