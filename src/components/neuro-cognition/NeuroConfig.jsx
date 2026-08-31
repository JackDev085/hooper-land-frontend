import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Brain,
  Sliders,
  Activity,
  Settings,
  Volume2,
  Play,
  Check,
  HelpCircle,
  Crown,
  Lock
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function NeuroConfig({
  difficulty,
  setDifficulty,
  difficultySettings,
  durationMode,
  setDurationMode,
  customDurationInput,
  setCustomDurationInput,
  activeMovements,
  handleToggleMovement,
  defaultMovements,
  audioSettings,
  setAudioSettings,
  useCustomInterval,
  setUseCustomInterval,
  customInterval,
  setCustomInterval,
  startWorkoutFlow,
  onOpenTutorial
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [modalReason, setModalReason] = useState("");

  const isPremium = user?.premium === true;

  const handleSelectDifficulty = (key) => {
    if ((key === "dificil" || key === "lenda") && !isPremium) {
      setModalReason(`A dificuldade "${difficultySettings[key].label}" é exclusiva para membros Premium.`);
      setShowPremiumModal(true);
      return;
    }
    setDifficulty(key);
  };

  const handleToggleCustomInterval = () => {
    if (!useCustomInterval && !isPremium) {
      setModalReason("A alteração personalizada do tempo de intervalo entre dribles é exclusiva para membros Premium.");
      setShowPremiumModal(true);
      return;
    }
    setUseCustomInterval(!useCustomInterval);
  };

  const handleSelectDurationMode = (modeValue) => {
    if (modeValue === "custom" && !isPremium) {
      setModalReason("A duração personalizada da sessão é exclusiva para membros Premium.");
      setShowPremiumModal(true);
      return;
    }
    setDurationMode(modeValue);
  };

  return (
    <div className="space-y-6 w-full animate-fade-in">
      {/* HEADER SECTION */}
      <div className="mb-2 w-full">
        <Link
          to="/workouts"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group text-sm"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para treinos
        </Link>
        <div className="flex flex-col gap-3.5 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-600/20 rounded-2xl text-orange-500 shadow-glow shrink-0">
              <Brain size={28} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
                Neurocognição
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold bg-orange-600/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Treino de Elite
                </span>
                {!isPremium ? (
                  <Link
                    to="/premium"
                    className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase hover:bg-amber-500/20 transition-all"
                  >
                    <Crown size={11} />
                    Virar PRO
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full uppercase">
                    <Crown size={11} className="fill-amber-300" />
                    PRO ATIVO
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={onOpenTutorial}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-blue-500/20 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-103"
            >
              <HelpCircle size={14} />
              Como treinar? Ver Tutorial 📖
            </button>
          </div>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed border-b border-gray-800 pb-4">
          Treine sua velocidade de reação motora e tomada de decisão. Realize os dribles correspondentes aos comandos de áudio no menor tempo de resposta possível.
        </p>
      </div>

      {/* DIFICULDADE */}
      <div className="bg-surface border border-gray-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold flex items-center gap-2 text-orange-500">
            <Sliders size={16} />
            Dificuldade do Treino
          </h2>
          <span className="text-[10px] text-gray-400">Fácil & Médio (Grátis) | Difícil & Lenda (PRO)</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(difficultySettings).map(([key, value]) => {
            const isLocked = (key === "dificil" || key === "lenda") && !isPremium;
            return (
              <button
                key={key}
                onClick={() => handleSelectDifficulty(key)}
                className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer relative ${
                  difficulty === key
                    ? "border-orange-500 bg-orange-600/10 text-white font-bold shadow-glow"
                    : isLocked
                    ? "border-gray-800 bg-black/60 text-gray-500 hover:border-orange-500/40"
                    : "border-gray-800 bg-black/40 text-gray-400 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs">{value.label}</div>
                  {isLocked && (
                    <span className="flex items-center gap-1 text-[9px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                      <Lock size={10} />
                      PRO
                    </span>
                  )}
                </div>
                <div className="text-[9px] text-gray-500 mt-1 line-clamp-1">
                  Intervalo: {(value.interval / 1000).toFixed(2)}s
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-450 italic bg-black/40 p-2.5 rounded-lg border border-gray-800/40 leading-relaxed">
          {difficultySettings[difficulty].desc}
        </p>
      </div>

      {/* TEMPO DE TROCA DE DRIBLE (INTERVALO) */}
      <div className="bg-surface border border-gray-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold flex items-center gap-2 text-orange-500">
            <Activity size={16} />
            Tempo de Troca (Intervalo)
          </h2>
          <button
            onClick={handleToggleCustomInterval}
            className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              useCustomInterval
                ? "bg-orange-600/20 border-orange-500 text-orange-400 shadow-glow"
                : "bg-black/30 border-gray-800 text-gray-500 hover:border-gray-700"
            }`}
          >
            {!isPremium && <Lock size={11} className="text-amber-400" />}
            {useCustomInterval ? "Personalizado ⚡" : "Automático"}
          </button>
        </div>

        {!useCustomInterval ? (
          <p className="text-xs text-gray-450">
            O tempo de troca é definido pela dificuldade selecionada:{" "}
            <strong className="text-white">
              {(difficultySettings[difficulty].interval / 1000).toFixed(2)}s
            </strong>.
          </p>
        ) : (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Intervalo entre dribles:</span>
              <span className="text-xs font-black text-orange-500 font-mono">
                {customInterval.toFixed(1)} segundos
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={customInterval}
                onChange={(e) => setCustomInterval(parseFloat(e.target.value))}
                className="flex-1 accent-orange-650 cursor-pointer h-1 bg-gray-800 rounded-lg appearance-none"
              />
            </div>
            <p className="text-[9px] text-gray-500 italic">
              Escolha um intervalo de 0.5 a 5.0 segundos. Menores intervalos exigem reflexos mais rápidos!
            </p>
          </div>
        )}
      </div>

      {/* DURAÇÃO */}
      <div className="bg-surface border border-gray-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-base font-bold flex items-center gap-2 text-orange-500">
          <Activity size={16} />
          Duração da Sessão
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "1", label: "1 min" },
            { value: "2", label: "2 min" },
            { value: "3", label: "3 min" },
            { value: "5", label: "5 min" },
            { value: "custom", label: "Personalizado 🔒" }
          ].map((mode) => {
            const isCustomLocked = mode.value === "custom" && !isPremium;
            return (
              <button
                key={mode.value}
                onClick={() => handleSelectDurationMode(mode.value)}
                className={`px-3 py-2 rounded-xl border text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  durationMode === mode.value
                    ? "bg-orange-600 border-orange-600 text-white shadow-glow"
                    : isCustomLocked
                    ? "bg-black/40 border-gray-800 text-gray-500 hover:border-orange-500/40"
                    : "bg-black/30 border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                {isCustomLocked && <Lock size={10} className="text-amber-400" />}
                {mode.label}
              </button>
            );
          })}
        </div>

        {durationMode === "custom" && (
          <div className="flex items-center gap-3 mt-2 animate-slide-up">
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={customDurationInput}
              onChange={(e) => setCustomDurationInput(e.target.value)}
              className="w-20 bg-black border border-gray-800 rounded-xl px-2.5 py-1.5 text-xs text-center text-orange-500 focus:outline-none focus:border-orange-500"
            />
            <span className="text-xs text-gray-400">Minutos (ex: 2.5 minutos)</span>
          </div>
        )}
      </div>

      {/* COMANDOS SELECIONADOS */}
      <div className="bg-surface border border-gray-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-base font-bold flex items-center gap-2 text-orange-500">
          <Settings size={16} />
          Comandos Ativos
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Marque os movimentos de drible que serão sorteados na sua voz de treino.
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {defaultMovements.map((move) => {
            const isActive = activeMovements[move.id];
            return (
              <button
                key={move.id}
                onClick={() => handleToggleMovement(move.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "border-orange-500/50 bg-orange-600/5 text-white"
                    : "border-gray-850 bg-black/40 text-gray-500"
                }`}
              >
                <span className="text-xs font-semibold">{move.label}</span>
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                    isActive ? "bg-orange-600 border-orange-600 text-white" : "border-gray-800"
                  }`}
                >
                  {isActive && <Check size={8} strokeWidth={4} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* OPÇÕES DE ÁUDIO */}
      <div className="bg-surface border border-gray-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-base font-bold flex items-center gap-2 text-orange-500">
          <Volume2 size={16} />
          Configurações de Áudio
        </h2>
        <div className="flex items-center justify-between py-1.5 border-b border-gray-900">
          <div>
            <h3 className="text-xs font-bold text-gray-200">Comandos por Voz</h3>
            <p className="text-[9px] text-gray-500">Sintetizador fala o drible em voz alta (Recomendado)</p>
          </div>
          <button
            onClick={() => setAudioSettings((prev) => ({ ...prev, voice: !prev.voice }))}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
              audioSettings.voice ? "bg-orange-600" : "bg-gray-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                audioSettings.voice ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <div>
            <h3 className="text-xs font-bold text-gray-200">Sinal Sonoro (Beep)</h3>
            <p className="text-[9px] text-gray-500">Bipa imediatamente antes de ditar o drible</p>
          </div>
          <button
            onClick={() => setAudioSettings((prev) => ({ ...prev, beep: !prev.beep }))}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
              audioSettings.beep ? "bg-orange-600" : "bg-gray-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                audioSettings.beep ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* BOTÃO PRINCIPAL INICIAR */}
      <button
        onClick={() => {
          startWorkoutFlow();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-glow hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 text-base flex items-center justify-center gap-2 cursor-pointer border-none"
      >
        <Play size={18} fill="currentColor" />
        Iniciar Treinamento Cognitivo
      </button>

      {/* MODAL DE DESBLOQUEIO PREMIUM */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-orange-600/20 border border-orange-500/40 text-orange-500 mx-auto flex items-center justify-center shadow-glow">
              <Crown size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold uppercase text-white">Recurso Premium 🔒</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {modalReason}
              </p>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-2xl p-4 text-xs text-gray-400 space-y-2 text-left">
              <div className="flex items-center gap-2 text-white font-bold">
                <Check size={14} className="text-orange-500" /> Dificuldades Difícil e Lenda
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Check size={14} className="text-orange-500" /> Intervalo de troca totalmente customizado
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Check size={14} className="text-orange-500" /> Todos os Treinos de Impulsão
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold text-xs cursor-pointer"
              >
                Continuar Grátis
              </button>
              <button
                onClick={() => {
                  setShowPremiumModal(false);
                  navigate("/premium");
                }}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs shadow-glow cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Crown size={14} />
                Seja Premium
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
