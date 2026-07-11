import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Brain,
  Sliders,
  Activity,
  Settings,
  Volume2,
  Play,
  Check,
  HelpCircle
} from "lucide-react";

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
              <span className="text-[10px] font-semibold bg-orange-600/20 text-orange-500 border border-orange-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Fase de testes
              </span>
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
        <h2 className="text-base font-bold flex items-center gap-2 text-orange-500">
          <Sliders size={16} />
          Dificuldade do Treino
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(difficultySettings).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setDifficulty(key)}
              className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                difficulty === key
                  ? "border-orange-500 bg-orange-600/10 text-white font-bold shadow-glow"
                  : "border-gray-800 bg-black/40 text-gray-400 hover:border-gray-700"
              }`}
            >
              <div className="text-xs">{value.label}</div>
              <div className="text-[9px] text-gray-500 mt-1 line-clamp-1">
                Intervalo: {(value.interval / 1000).toFixed(2)}s
              </div>
            </button>
          ))}
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
            onClick={() => setUseCustomInterval(!useCustomInterval)}
            className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
              useCustomInterval
                ? "bg-orange-600/20 border-orange-500 text-orange-400 shadow-glow"
                : "bg-black/30 border-gray-800 text-gray-500 hover:border-gray-700"
            }`}
          >
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
            { value: "custom", label: "Personalizado" }
          ].map((mode) => (
            <button
              key={mode.value}
              onClick={() => setDurationMode(mode.value)}
              className={`px-3 py-2 rounded-xl border text-[10px] font-bold transition-all cursor-pointer ${
                durationMode === mode.value
                  ? "bg-orange-600 border-orange-600 text-white shadow-glow"
                  : "bg-black/30 border-gray-800 text-gray-400 hover:border-gray-700"
              }`}
            >
              {mode.label}
            </button>
          ))}
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
    </div>
  );
}
