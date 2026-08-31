import { useState } from "react";
import { Home, Dumbbell, MapPin, TreeDeciduous, Search, X, Layers, Lightbulb, Crown, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useWorkouts from "../hooks/useWorkouts.js";
import WorkoutList from "../components/ui/WorkoutList.jsx";
import SuggestWorkoutModal from "../components/ui/SuggestWorkoutModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Workouts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSuggestModal, setShowSuggestModal] = useState(false);

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

  const handleSuggestClick = () => {
    if (!user?.premium) {
      navigate("/premium");
      return;
    }
    setShowSuggestModal(true);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-16 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header & Suggest Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-800/80 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">
                Treinamento de Elite
              </span>
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-black rounded-full border border-amber-500/20 uppercase tracking-widest flex items-center gap-1">
                <Crown size={11} /> Acesso Antecipado PRO
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
              Treinos
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              Escolha uma categoria, prepare seu foco e eleve seu nível em quadra.
            </p>
          </div>

          <div>
            <button
              onClick={handleSuggestClick}
              className="px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-glow hover:scale-105 flex items-center gap-2 cursor-pointer border-none"
            >
              <Lightbulb size={16} />
              {user?.premium ? "Sugerir Novo Treino 💡" : "Sugerir Treino (Premium 👑)"}
            </button>
          </div>
        </div>

        {/* Banner Acesso Antecipado */}
        <div className="bg-gradient-to-r from-orange-950/40 via-surface to-black border border-orange-500/20 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-600/20 rounded-xl text-orange-400 border border-orange-500/30 shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                Lançamentos & Acesso Antecipado
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Membros Premium testam e acessam treinos exclusivos de velocidade, impulsão e arremessos antes de todos!
              </p>
            </div>
          </div>
          {!user?.premium && (
            <Link
              to="/premium"
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all shrink-0 uppercase tracking-wider"
            >
              Virar PRO
            </Link>
          )}
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

      <SuggestWorkoutModal
        isOpen={showSuggestModal}
        onClose={() => setShowSuggestModal(false)}
      />
    </div>
  );
}
