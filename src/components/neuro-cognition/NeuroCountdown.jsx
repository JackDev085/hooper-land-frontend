export default function NeuroCountdown({ countdown, quitWorkout }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in text-center">
      <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">
        Prepare-se
      </span>
      <h2 className="text-xl font-bold mb-6 text-gray-400">Entre na postura de drible!</h2>
      <div className="w-40 h-40 rounded-full border-4 border-orange-500/20 flex items-center justify-center bg-orange-600/5 relative overflow-hidden animate-pulse-glow shadow-glow shadow-orange-600/10">
        <span className="text-7xl font-black text-orange-500 scale-up-down">
          {countdown}
        </span>
      </div>
      <button
        onClick={quitWorkout}
        className="mt-8 text-gray-500 hover:text-white text-xs underline cursor-pointer bg-transparent border-none"
      >
        Cancelar
      </button>
    </div>
  );
}
