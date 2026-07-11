import { Link } from "react-router-dom";
import { Award, Flame } from "lucide-react";

export default function NeuroSummary({
  elapsedTime,
  totalCommands,
  difficulty,
  difficultySettings,
  workoutCompletedSuccessfully,
  newStreak,
  errorCompleting,
  savingWorkout,
  handleSaveWorkoutCompletion,
  setScreen,
  formatTime,
  navigate
}) {
  return (
    <div className="bg-surface border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 w-full animate-fade-in text-center">
      <div className="inline-flex p-4 bg-orange-600/20 rounded-full text-orange-500 mb-2">
        <Award size={48} className="animate-bounce" />
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-black uppercase text-white tracking-tight">
          Treino Concluído!
        </h2>
        <p className="text-xs text-gray-400">
          Excelente trabalho! Seus reflexos e tomadas de decisão foram testados.
        </p>
      </div>

      {/* CARDS DE STATS */}
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="bg-black/50 border border-gray-850 p-4 rounded-2xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
            Tempo Treinado
          </span>
          <span className="text-xl font-black text-white font-mono">
            {formatTime(elapsedTime)}
          </span>
        </div>
        <div className="bg-black/50 border border-gray-850 p-4 rounded-2xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
            Dribles Exigidos
          </span>
          <span className="text-xl font-black text-orange-500 font-mono">
            {totalCommands}
          </span>
        </div>
        <div className="bg-black/50 border border-gray-850 p-4 rounded-2xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
            Dificuldade
          </span>
          <span className={`text-sm font-extrabold mt-1 block uppercase ${difficultySettings[difficulty].color.split(" ")[0]}`}>
            {difficultySettings[difficulty].label}
          </span>
        </div>
        <div className="bg-black/50 border border-gray-850 p-4 rounded-2xl text-center">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
            Velocidade Reação
          </span>
          <span className="text-xl font-black text-white font-mono">
            {(difficultySettings[difficulty].interval / 1000).toFixed(2)}s
          </span>
        </div>
      </div>

      {/* SEÇÃO DE STREAK E GANHO DE EXPERIÊNCIA */}
      <div className="py-2 border-t border-b border-gray-850 my-2">
        {workoutCompletedSuccessfully ? (
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-5 text-center shadow-lg border border-orange-500/20 relative overflow-hidden animate-pulse-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,transparent_100%)] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-3xl block mb-1 animate-bounce">🔥</span>
              <h3 className="text-lg font-black text-white mb-1">Treino Registrado no Perfil!</h3>
              <p className="text-orange-100 text-xs mb-3">Sua consistência subiu:</p>
              <div className="inline-flex items-center justify-center bg-black/40 px-5 py-1.5 rounded-full border border-white/10 mb-2">
                <Flame size={16} className="text-orange-400 mr-2" />
                <span className="text-xl font-black text-orange-400 mr-1.5">{newStreak}</span>
                <span className="text-xs font-bold text-white">Dias Seguidos</span>
              </div>
              {errorCompleting && <p className="text-[9px] text-orange-200 mt-1">{errorCompleting}</p>}
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-3">
            <p className="text-xs text-gray-400">
              {localStorage.getItem("token")
                ? "Grave esta sessão para subir sua sequência (Streak) diária de treinos."
                : "Entre com sua conta para salvar este treino na sua streak e no seu histórico."}
            </p>

            {localStorage.getItem("token") ? (
              <button
                onClick={handleSaveWorkoutCompletion}
                disabled={savingWorkout}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 text-sm cursor-pointer border-none"
              >
                {savingWorkout ? "Gravando no servidor..." : "Registrar Treino & Streak! 🔥"}
              </button>
            ) : (
              <Link
                to="/auth"
                className="inline-block w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-98 text-sm cursor-pointer"
              >
                Login / Criar Conta 🔥
              </Link>
            )}
          </div>
        )}
      </div>

      {/* BOTÕES DE VOLTAR */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => setScreen("config")}
          className="flex-1 bg-surface hover:bg-neutral-800 text-white border border-gray-800 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
        >
          Treinar Novamente
        </button>

        <button
          onClick={() => navigate("/workouts")}
          className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all text-sm cursor-pointer border-none"
        >
          Voltar para Lista
        </button>
      </div>
    </div>
  );
}
