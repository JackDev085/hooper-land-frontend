import { Link, useNavigate } from "react-router-dom";
import { Clock, ChevronRight, Lock, Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function WorkoutCard({ workout }) {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const isNeuro = workout.id === 999 || workout.slug === "neuro-cognition";
  const isImpulsao = workout.name?.toLowerCase().includes("impuls");
  const isPivo = workout.name?.toLowerCase().includes("piv");
  // Treino de neurocognição é liberado para todos (apenas dificuldades avançadas são travadas internamente)
  const isPremiumWorkout =
    (workout.premium || isImpulsao || isPivo) && !isNeuro;

  const handleCardClick = async (e) => {
    if (isPremiumWorkout && !user?.premium) {
      e.preventDefault();
      // Se possui login ativo, sincroniza para verificar se já foi ativado como PRO
      if (localStorage.getItem("token") && refreshUser) {
        try {
          const freshUser = await refreshUser();
          if (freshUser?.premium) {
            navigate(
              isNeuro ? "/neuro-cognition" : `/exercises?treino=${workout.id}`,
            );
            return;
          }
        } catch {
          // Prossegue para /premium
        }
      }
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
          src={
            isNeuro
              ? "/neurocognition.png"
              : `https://i.ytimg.com/vi/${workout.slug}/hqdefault.jpg`
          }
          alt={workout.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Subtle PRO Badge */}
        {(isPremiumWorkout || isNeuro) && (
          <div className="absolute  top-3.5 left-3.5 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-md text-[10px] font-semibold text-yellow-400 border border-zinc-700/80 uppercase tracking-wider">
            <Star size={12} className="inline-block mr-1" />
            PRO
          </div>
        )}

        {/* Duration badge */}
        {workout.duration && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-medium text-gray-300">
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
            px-4 py-2 rounded-xl text-xs font-semibold
            transition-all duration-300
    
                "bg-orange-600 group-hover:bg-orange-500 bg-orange-600 text-white group-hover:shadow-glow"
          `}
        >
          {isPremiumWorkout && !user?.premium ? (
            <>
              <Lock size={13} className="text-white-400" />
              Desbloquear
            </>
          ) : (
            <>
              Treinar agora
              <ChevronRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
