import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <div
      className="
        group relative bg-surface rounded-2xl overflow-hidden 
        border border-gray-800 hover:border-orange-500/50
        transition-all duration-500 ease-out
        hover:shadow-glow hover:-translate-y-1
      "
    >
      {/* Image with overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`https://i.ytimg.com/vi/${workout.slug}/mqdefault.jpg`}
          alt={workout.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

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
        <h2 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">
          {workout.name}
        </h2>

        <Link
          to={`/exercises?treino=${workout.id}`}
          className="
            inline-flex items-center gap-2 
            px-5 py-2.5 
            bg-orange-600 hover:bg-orange-500 
            rounded-xl font-semibold text-sm
            transition-all duration-300
            hover:shadow-glow hover:-translate-y-0.5
            group/btn
          "
        >
          Ver exercícios
          <ChevronRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
