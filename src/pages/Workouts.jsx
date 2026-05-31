import { useState } from "react";
import { Home, Dumbbell, MapPin, TreeDeciduous, Search, X, Layers } from "lucide-react";
import useWorkouts from "../hooks/useWorkouts.js";
import WorkoutList from "../components/ui/WorkoutList.jsx";

export default function Workouts() {
  const categories = [
    { id: "Todos", icon: Layers, label: "Todos" },
    { id: "Casa", icon: Home, label: "Casa" },
    { id: "Academia", icon: Dumbbell, label: "Academia" },
    { id: "Quadra", icon: MapPin, label: "Quadra" },
    { id: "Livre", icon: TreeDeciduous, label: "Livre" },
  ];
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const { filteredWorkouts, loading, error } = useWorkouts({
    category: activeCategory,
    searchQuery
  });

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-16 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            Treinos
          </h1>
          <p className="text-gray-400 text-lg">
            Escolha uma categoria e comece a evoluir
          </p>
        </div>

        {/* Filters & Search section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Category filters */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-nowrap md:flex-wrap pb-2 md:pb-0 snap-x snap-mandatory">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    cursor-pointer snap-start
                    group flex items-center gap-2.5
                    px-5 py-3 rounded-xl
                    font-semibold text-sm
                    border-2 transition-all duration-300 flex-shrink-0
                    ${isActive
                      ? "bg-orange-600 border-orange-600 text-white shadow-glow"
                      : "bg-transparent border-gray-700 text-gray-400 hover:border-orange-500/50 hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                  />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar treino..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 pl-11 pr-10 text-sm transition-all placeholder-gray-500 text-white"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                aria-label="Limpar busca"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Workouts container */}
        <div className="w-full">
          <WorkoutList
            workouts={filteredWorkouts}
            loading={loading}
            error={error}
            isGrouped={activeCategory === "Todos"}
          />
        </div>
      </div>
    </div >
  );
}
