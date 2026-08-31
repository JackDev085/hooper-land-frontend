import { Link, useNavigate } from "react-router-dom";
import { Clock, ChevronRight, Crown, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function WorkoutCard({ workout }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isNeuro = workout.id === 999 || workout.slug === "neuro-cognition";
  const isImpulsao = workout.name?.toLowerCase().includes("impuls");
  // Treino de neurocognição é liberado para todos (apenas dificuldades avançadas são travadas internamente)
  const isPremiumWorkout = (workout.premium || isImpulsao) && !isNeuro;

  const handleCardClick = (e) => {
    if (isPremiumWorkout && !user?.premium) {
      e.preventDefault();
      navigate("/premium");
    }
  };

  return (
    <Link
      to={isNeuro ? "/neuro-cognition" : `/exercises?treino=${workout.id}`}
      onClick={handleCardClick}
      className="
        group relative bg-surface rounded-2xl overflow-hidden block
        border border-gray-800 hover:border-orange-500/50
        transition-all duration-500 ease-out
        hover:shadow-glow hover:-translate-y-1
      "
    >
      {/* Image with overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={isNeuro ? "/neurocognition.png" : `https://i.ytimg.com/vi/${workout.slug}/mqdefault.jpg`}
          alt={workout.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Premium Badge (PRO) */}
        {(isPremiumWorkout || isNeuro) && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-orange-600/90 backdrop-blur-md rounded-full text-xs font-black text-white shadow-glow border border-orange-400/40 uppercase tracking-wider">
            <Crown size={13} className="text-amber-300 fill-amber-300" />
            PRO
          </div>
        )}

        {/* Duration badge */}
        {workout.duration && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-gray-200">
            <Clock size={12} />
            {workout.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-300 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
          {workout.name}
        </h3>

        <div
          className={`
            inline-flex items-center gap-2 
            px-5 py-2.5 
            ${isPremiumWorkout && !user?.premium ? "bg-orange-950/80 border border-orange-500/50 text-orange-400" : "bg-orange-600 group-hover:bg-orange-500 text-white"} 
            rounded-xl font-semibold text-sm
            transition-all duration-300
            group-hover:shadow-glow
          `}
        >
          {isPremiumWorkout && !user?.premium ? (
            <>
              <Lock size={15} />
              Desbloquear com Premium
            </>
          ) : (
            <>
              Treinar agora
              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </div>
      </div>
    </Link>
  );

}
