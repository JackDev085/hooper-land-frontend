import WorkoutCard from "./WorkoutCard";
import { SkeletonCard } from "./Skeleton";

const CATEGORY_LABELS = {
  casa: "🏠 Em Casa",
  academia: "💪 Na Academia",
  quadra: "🏀 Na Quadra",
  livre: "🌳 Ao Ar Livre"
};

export default function WorkoutList({ workouts = [], loading = false, error = null, isGrouped = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center text-red-500 py-12">
        ⚠️ Erro ao carregar treinos. Tente novamente mais tarde.
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="sem_treino w-full text-center text-gray-500 py-12">
        ❌ Sem treinos disponíveis
      </div>
    );
  }

  if (isGrouped) {
    // Agrupa treinos por categoria
    const grouped = workouts.reduce((acc, workout) => {
      const cat = (workout.category || "outros").toLowerCase();
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(workout);
      return acc;
    }, {});

    // Filtra categorias que têm pelo menos um treino correspondente
    const activeCategories = Object.keys(grouped).filter(cat => grouped[cat].length > 0);

    return (
      <div className="space-y-12">
        {activeCategories.map((catKey) => {
          const label = CATEGORY_LABELS[catKey] || catKey.toUpperCase();
          const list = grouped[catKey];

          return (
            <div key={catKey} className="space-y-6">
              <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide border-l-4 border-orange-600 pl-3 text-white flex items-center gap-2">
                {label}
                <span className="text-xs font-normal text-gray-400 bg-gray-900 px-2 py-0.5 rounded-full ml-2">
                  {list.length} {list.length === 1 ? 'treino' : 'treinos'}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {list.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Visualização simples em Grid para categoria única
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
