import { useState } from "react";
import WorkoutHandler from "../hooks/WorkoutHook.jsx";
import { Home, Dumbbell, MapPin, TreeDeciduous } from "lucide-react";

export default function Workouts() {
  const categories = [
    { id: "Casa", icon: Home, label: "Casa" },
    { id: "Academia", icon: Dumbbell, label: "Academia" },
    { id: "Quadra", icon: MapPin, label: "Quadra" },
    { id: "Livre", icon: TreeDeciduous, label: "Livre" },
  ];
  const [activeCategory, setActiveCategory] = useState("Casa");

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

        {/* Category filters */}
        <div className="flex gap-3 flex-wrap mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  cursor-pointer
                  group flex items-center gap-2.5
                  px-5 py-3 rounded-xl
                  font-semibold text-sm
                  border-2 transition-all duration-300
                  ${
                    isActive
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

        {/* Workouts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WorkoutHandler category={activeCategory.toLowerCase()} />
        </div>
      </div>
    </div>
  );
}
