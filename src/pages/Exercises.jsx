import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ExerciseCard from "../components/ui/ExerciseCard";
import { SkeletonCard } from "../components/ui/Skeleton";
import api from "../services/api";
import { AlertCircle, Dumbbell, ChevronLeft } from "lucide-react";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const workout = queryParams.get("treino");
    if (workout) {
      api
        .get(`/exercises/${workout}`)
        .then((response) => {
          if (response.status === 200) {
            setExercises(response.data.exercises || []);
            setWorkoutName(response.data.workout_name || "Exercícios");
          } else {
            setError(`Resposta inesperada: ${response.status}`);
          }
        })
        .catch((err) => {
          setError(err?.message || "Erro ao buscar exercícios");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location.search]);

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-16 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          to="/workouts"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Voltar para treinos
        </Link>

        {/* Loading state */}
        {loading && (
          <div className="space-y-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-800 rounded-xl w-2/3 mb-4" />
              <div className="h-6 bg-gray-800 rounded-lg w-1/2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 bg-red-500/20 rounded-2xl mb-6">
              <AlertCircle size={48} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
            <Link
              to="/workouts"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-semibold transition-all"
            >
              Voltar para treinos
            </Link>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-600/20 rounded-xl">
                  <Dumbbell size={24} className="text-orange-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
                  {workoutName}
                </h1>
              </div>

              <p className="text-gray-400 text-lg mb-6 border-gray-700 pb-2 border-b-1">
                Siga a sequência recomendada e mantenha o foco em técnica, ritmo
                e execução.
              </p>

              {/* Progress indicator 
              {exercises.length > 0 && (
                <div className="bg-surface rounded-xl p-4 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progresso</span>
                    <span className="text-sm font-medium text-orange-500">
                      {completedCount} / {exercises.length} exercícios
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-600 to-orange-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${(completedCount / exercises.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
                */}
            </div>

            {/* Exercises grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {exercises.map((ex, index) => (
                <div
                  key={ex.name}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ExerciseCard exercise={ex} />
                </div>
              ))}
            </div>

            {/* Empty state */}
            {exercises.length === 0 && (
              <div className="text-center py-20">
                <Dumbbell size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">
                  Nenhum exercício encontrado
                </h3>
                <p className="text-gray-500">
                  Este treino ainda não possui exercícios cadastrados.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
