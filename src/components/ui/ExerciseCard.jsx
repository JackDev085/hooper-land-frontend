import { useState } from "react";
import { Check, Play, RotateCcw } from "lucide-react";

export default function ExerciseCard({ exercise }) {
  const [completed, setCompleted] = useState(false);

  const handleToggleComplete = () => {
    setCompleted(!completed);
  };

  return (
    <div
      className={`
        group relative bg-surface rounded-2xl overflow-hidden 
        border transition-all duration-500 ease-out
        ${completed
          ? "border-green-500/50 bg-green-500/5"
          : "border-gray-800 hover:border-orange-500/50"
        }
      `}
    >
      {/* Completed overlay */}
      {completed && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-green-400">
          <Check size={12} />
          Concluído
        </div>
      )}

      {/* Video container */}
      <div
        className={`relative w-full bg-black ${completed ? "opacity-60" : ""}`}
      >
        <video
          src={`https://hooper-land.vercel.app/downloads/${exercise.link_video}.mp4`}
          controls={3}
          className="w-full h-full object-cover"
          muted={true}
          playsInline
          preload="metadata"
        />

        {/* Play indicator overlay (shows when not playing) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full">
            <Play size={24} className="text-white ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2
          className={`text-xl font-bold mb-2 transition-colors duration-300 ${completed ? "text-gray-400" : "text-white"}`}
        >
          {exercise.name}
        </h2>

        <p className="text-orange-500 text-sm font-medium mb-4">
          {exercise.reps}
        </p>

        <button
          onClick={handleToggleComplete}
          className={`
            w-full flex items-center justify-center gap-2
            px-4 py-3 rounded-xl font-semibold text-sm
            transition-all duration-300
            ${completed
              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
              : "bg-orange-600 text-white hover:bg-orange-500 hover:shadow-glow hover:-translate-y-0.5"
            }
          `}
        >
          {completed ? (
            <>
              <RotateCcw size={16} />
              Refazer exercício
            </>
          ) : (
            <>
              <Check size={16} />
              Marcar como concluído
            </>
          )}
        </button>
      </div>
    </div>
  );
}
