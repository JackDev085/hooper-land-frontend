import { Play, Pause } from "lucide-react";

export default function NeuroWorkout({
  difficulty,
  difficultySettings,
  timeRemaining,
  totalCommands,
  beatActive,
  currentCommand,
  nextCommand,
  isPaused,
  setIsPaused,
  endWorkoutSession,
  quitWorkout,
  formatTime
}) {
  return (
    <div className="w-full space-y-8 animate-fade-in">
      {/* TOP BAR DO TREINO */}
      <div className="flex items-center justify-between bg-surface border border-gray-800 px-5 py-4 rounded-2xl">
        <div>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
            Dificuldade
          </span>
          <span className={`text-sm font-extrabold ${difficultySettings[difficulty].color.split(" ")[0]}`}>
            {difficultySettings[difficulty].label}
          </span>
        </div>
        <div className="text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
            Tempo Restante
          </span>
          <span className="text-2xl font-black text-white font-mono leading-none">
            {formatTime(timeRemaining)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
            Ações Realizadas
          </span>
          <span className="text-base font-bold text-orange-500 font-mono">
            {totalCommands}
          </span>
        </div>
      </div>

      {/* COMANDO CENTRAL DOURADO */}
      <div className="flex flex-col items-center justify-center min-h-[30vh] bg-surface border border-gray-850 rounded-3xl p-8 relative overflow-hidden text-center shadow-lg">
        {/* Metronome Beat Aura */}
        <div
          className={`absolute inset-0 bg-orange-600/5 rounded-3xl transition-opacity duration-300 pointer-events-none ${
            beatActive ? "opacity-100" : "opacity-0"
          }`}
        />
        
        <span className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-4">
          Execute Agora:
        </span>
        
        {/* Pulsing Command Box */}
        <div
          className={`transition-all duration-150 ${beatActive ? "scale-105" : "scale-100"}`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {currentCommand.replace(/\+/g, " + ")}
          </h1>
        </div>

        {/* Next Command Preview */}
        <div className="mt-8 opacity-40">
          <span className="text-xs block text-gray-400 font-semibold mb-1">
            A seguir:
          </span>
          <span className="text-sm font-bold uppercase text-white tracking-wider">
            {nextCommand.replace(/\+/g, " + ")}
          </span>
        </div>
      </div>

      {/* CONTROLES */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 text-sm cursor-pointer border-none ${
            isPaused
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-surface hover:bg-neutral-800 text-white border border-gray-800"
          }`}
        >
          {isPaused ? (
            <>
              <Play size={16} fill="currentColor" />
              Retomar
            </>
          ) : (
            <>
              <Pause size={16} fill="currentColor" />
              Pausar
            </>
          )}
        </button>

        <button
          onClick={endWorkoutSession}
          className="px-8 py-3.5 bg-orange-600/10 hover:bg-orange-600/20 text-orange-500 border border-orange-500/20 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
        >
          Concluir
        </button>

        <button
          onClick={quitWorkout}
          className="px-4 py-3.5 bg-transparent text-gray-500 hover:text-white transition-colors text-xs underline cursor-pointer border-none"
        >
          Abandonar
        </button>
      </div>
    </div>
  );
}
