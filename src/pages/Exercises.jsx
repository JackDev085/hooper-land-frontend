import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../services/api";
import { AlertCircle, Dumbbell, ChevronLeft, Play, X } from "lucide-react";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);

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

  // Helper to extract YouTube video ID from URL or return the ID directly
  const getYoutubeId = (urlOrId) => {
    if (!urlOrId) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOrId.match(regExp);
    return match && match[2].length === 11 ? match[2] : urlOrId;
  };

  const openVideo = (linkVideo) => {
    setActiveVideoId(linkVideo);
  };

  const closeModal = () => {
    setActiveVideoId(null);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (activeVideoId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideoId]);

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-16 py-20 pt-24">
      <div className="max-w-4xl mx-auto">
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
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-surface border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-48 bg-gray-800 rounded-lg animate-pulse" />
                      <div className="h-6 w-16 bg-gray-800 rounded-full animate-pulse" />
                    </div>
                    <div className="h-4 w-3/4 bg-gray-800 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-12 w-28 bg-gray-800 rounded-xl animate-pulse" />
                </div>
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
            </div>

            {/* Exercises list */}
            <div className="space-y-6">
              {exercises.map((ex, index) => (
                <div
                  key={ex.id || ex.name}
                  className="bg-surface border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 hover:shadow-glow transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Exercise info with sequence number */}
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-3xl font-black text-orange-500/20 font-mono leading-none pt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold text-white tracking-tight">
                          {ex.name}
                        </h2>
                        <span className="inline-flex items-center px-3 py-1 bg-orange-500/10 border border-orange-500/25 text-orange-500 rounded-full text-xs font-semibold">
                          {ex.reps}
                        </span>
                      </div>
                      {ex.desc && (
                        <p className="text-gray-400 text-sm leading-relaxed mt-2">
                          {ex.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Play video button */}
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => openVideo(ex.link_video)}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer whitespace-nowrap"
                    >
                      <Play size={16} fill="currentColor" />
                      Ver Vídeo
                    </button>
                  </div>
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


      {/* Video Modal with YouTube iframe in full screen */}
      {activeVideoId && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-8 animate-fade-in"
          onClick={closeModal}
        >
          {/* Close button top right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white hover:scale-110 transition-all p-3 rounded-full bg-black/50 md:bg-white/10 hover:bg-white/20 z-50 cursor-pointer"
            aria-label="Fechar vídeo"
          >
            <X size={24} className="md:w-7 md:h-7" />
          </button>

          {/* Video wrapper */}
          <div
            className="relative w-full max-w-5xl aspect-video rounded-none md:rounded-2xl overflow-hidden shadow-2xl border-y md:border border-white/10"
            onClick={(e) => {
              // Stop propagation so clicking inside/around the video container doesn't close the modal
              e.stopPropagation();
            }}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${getYoutubeId(activeVideoId)}?autoplay=1&rel=0&modestbranding=1&controls=1`}
              title="Vídeo de execução do exercício"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
