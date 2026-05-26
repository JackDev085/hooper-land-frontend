import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { SkeletonCard } from "../components/ui/Skeleton";
import api from "../services/api";
import {
  AlertCircle,
  Dumbbell,
  ChevronLeft,
  Check,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ListVideo,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const COUNTDOWN_SECONDS = 4;

export default function ExercisePlayer() {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmuteBanner, setShowUnmuteBanner] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  // Countdown state
  const [countdown, setCountdown] = useState(null); // null = not counting, number = seconds left
  const [nextExerciseIndex, setNextExerciseIndex] = useState(null);
  const countdownTimerRef = useRef(null);
  const videoRef = useRef(null);
  const listRef = useRef(null);
  const scrubberRef = useRef(null);

  // Auto-hide controls state & logic
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  const triggerShowControls = useCallback(() => {
    setShowControls(true);
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  // Handle controls visibility when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
  }, [isPlaying, resetControlsTimeout]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

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

  // Auto-scroll lista quando muda o exercício ativo
  useEffect(() => {
    const activeEl = document.getElementById(`exercise-item-${activeIndex}`);
    if (activeEl && listRef.current) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIndex]);

  // Atualiza vídeo ao mudar exercício
  useEffect(() => {
    if (videoRef.current && exercises[activeIndex]) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  }, [activeIndex, exercises]);

  // Cleanup countdown timer on unmount
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  const handleSelectExercise = (index) => {
    // Cancel any active countdown
    cancelCountdown();
    setActiveIndex(index);
    setIsPlaying(true);
  };

  const handleToggleComplete = (index) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleNext = () => {
    cancelCountdown();
    if (activeIndex < exercises.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    cancelCountdown();
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    if (!videoRef.current.muted) setShowUnmuteBanner(false);
  };

  const handleUnmute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
    setShowUnmuteBanner(false);
    // Also start playing if paused
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const handleVideoContainerClick = (e) => {
    // If clicking on control buttons or overlays, don't toggle play/pause via container click
    if (
      e.target.closest(".exercise-player-ctrl-btn") ||
      e.target.closest(".exercise-player-unmute-banner") ||
      e.target.closest(".exercise-player-countdown-overlay")
    ) {
      return;
    }
    if (!showControls) {
      triggerShowControls();
    } else {
      handlePlayPause();
      triggerShowControls();
    }
  };

  const handleMouseMove = () => {
    triggerShowControls();
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }
  };

  // --- Countdown logic ---
  const startCountdown = useCallback((nextIdx) => {
    setNextExerciseIndex(nextIdx);
    setCountdown(COUNTDOWN_SECONDS);

    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
          // Vibrate if supported
          if (navigator.vibrate) navigator.vibrate(200);
          // Advance to next exercise
          setActiveIndex(nextIdx);
          setNextExerciseIndex(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const cancelCountdown = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setCountdown(null);
    setNextExerciseIndex(null);
  }, []);

  const skipCountdown = useCallback(() => {
    if (nextExerciseIndex !== null) {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
      setActiveIndex(nextExerciseIndex);
      setCountdown(null);
      setNextExerciseIndex(null);
    }
  }, [nextExerciseIndex]);

  const handleVideoEnded = useCallback(() => {
    handleToggleComplete(activeIndex);
    if (activeIndex < exercises.length - 1) {
      startCountdown(activeIndex + 1);
    }
  }, [activeIndex, exercises.length, startCountdown]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setVideoCurrentTime(current);
    if (duration > 0) {
      setVideoProgress((current / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setVideoDuration(videoRef.current.duration);
    setVideoProgress(0);
    setVideoCurrentTime(0);
  };

  const handleScrubberClick = (e) => {
    if (!videoRef.current || !scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const activeExercise = exercises[activeIndex];
  const progress =
    exercises.length > 0
      ? Math.round((completedExercises.size / exercises.length) * 100)
      : 0;

  return (
    <div className="exercise-player-page">
      {/* Back button */}
      <div className="exercise-player-topbar">
        <Link to="/workouts" className="exercise-player-back">
          <ChevronLeft size={20} />
          <span>Voltar</span>
        </Link>
        {!loading && !error && (
          <div className="exercise-player-title-bar">
            <Dumbbell size={18} className="exercise-player-title-icon" />
            <h1 className="exercise-player-title">{workoutName}</h1>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="exercise-player-loading">
          <div className="exercise-player-loading-video">
            <div className="loading-spinner" aria-label="Carregando..." />
          </div>
          <div className="exercise-player-loading-list">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="exercise-player-error">
          <div className="exercise-player-error-icon">
            <AlertCircle size={48} />
          </div>
          <h2>{error}</h2>
          <Link to="/workouts" className="btn btn-primary">
            Voltar para treinos
          </Link>
        </div>
      )}

      {/* Main content */}
      {!loading && !error && (
        <>
          {/* ===== STICKY VIDEO PLAYER ===== */}
          <div className="exercise-player-sticky">
            <div
              className="exercise-player-video-wrapper"
              onClick={handleVideoContainerClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {activeExercise ? (
                <video
                  ref={videoRef}
                  key={activeExercise.link_video}
                  className="exercise-player-video"
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  controls={false}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnded}
                >
                  <source
                    src={`https://hooper-land.vercel.app/downloads/${activeExercise.link_video}.mp4`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div className="exercise-player-video-empty">
                  <Play size={48} />
                  <p>Selecione um exercício</p>
                </div>
              )}

              {/* Unmute banner overlay */}
              {showUnmuteBanner && isMuted && activeExercise && countdown === null && (
                <button
                  className="exercise-player-unmute-banner"
                  onClick={handleUnmute}
                >
                  <VolumeX size={18} />
                  <span>Toque para ativar o som</span>
                </button>
              )}

              {/* Countdown overlay */}
              {countdown !== null && nextExerciseIndex !== null && exercises[nextExerciseIndex] && (
                <div className="exercise-player-countdown-overlay">
                  <div className="exercise-player-countdown-content">
                    <span className="exercise-player-countdown-label">Próximo exercício</span>
                    <h3 className="exercise-player-countdown-name">
                      {exercises[nextExerciseIndex].name}
                    </h3>
                    <span className="exercise-player-countdown-reps">
                      {exercises[nextExerciseIndex].reps}
                    </span>

                    <div className="exercise-player-countdown-circle">
                      <svg viewBox="0 0 80 80">
                        <circle
                          className="exercise-player-countdown-track"
                          cx="40" cy="40" r="34"
                        />
                        <circle
                          className="exercise-player-countdown-ring"
                          cx="40" cy="40" r="34"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 34}`,
                            strokeDashoffset: `${2 * Math.PI * 34 * (1 - countdown / COUNTDOWN_SECONDS)}`,
                          }}
                        />
                      </svg>
                      <span className="exercise-player-countdown-number">{countdown}</span>
                    </div>

                    <div className="exercise-player-countdown-actions">
                      <button
                        className="exercise-player-countdown-skip"
                        onClick={skipCountdown}
                      >
                        <SkipForward size={16} />
                        Pular
                      </button>
                      <button
                        className="exercise-player-countdown-cancel"
                        onClick={cancelCountdown}
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom controls overlay */}
              {activeExercise && countdown === null && (
                <div className={`exercise-player-controls ${showControls ? "visible" : ""}`}>
                  <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="exercise-player-ctrl-btn"
                    aria-label="Exercício anterior"
                  >
                    <SkipBack size={20} />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    className="exercise-player-ctrl-btn exercise-player-ctrl-play"
                    aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={activeIndex === exercises.length - 1}
                    className="exercise-player-ctrl-btn"
                    aria-label="Próximo exercício"
                  >
                    <SkipForward size={20} />
                  </button>

                  <button
                    onClick={handleToggleMute}
                    className="exercise-player-ctrl-btn exercise-player-ctrl-mute"
                    aria-label={isMuted ? "Ativar som" : "Silenciar"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>
              )}
            </div>

            {/* Video duration scrubber bar — hidden during countdown */}
            {activeExercise && countdown === null && (
              <div className="exercise-player-scrubber-container">
                <span className="exercise-player-time">{formatTime(videoCurrentTime)}</span>
                <div
                  className="exercise-player-scrubber"
                  ref={scrubberRef}
                  onClick={handleScrubberClick}
                  role="slider"
                  aria-label="Progresso do vídeo"
                  aria-valuenow={Math.round(videoProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                >
                  <div
                    className="exercise-player-scrubber-fill"
                    style={{ width: `${videoProgress}%` }}
                  >
                    <div className="exercise-player-scrubber-thumb" />
                  </div>
                </div>
                <span className="exercise-player-time">{formatTime(videoDuration)}</span>
              </div>
            )}

            {/* Now playing info bar — hidden during countdown */}
            {activeExercise && countdown === null && (
              <div className="exercise-player-now-playing">
                <div className="exercise-player-now-info">
                  <span className="exercise-player-now-label">
                    <ListVideo size={14} />
                    {activeIndex + 1}/{exercises.length}
                  </span>
                  <span className="exercise-player-now-name">
                    {activeExercise.name}
                  </span>
                </div>
                {/*

                <span className="exercise-player-now-reps">
                  {activeExercise.reps}
                </span>
                */}
              </div>
            )}

            {/* Progress bar */}
            {exercises.length > 0 && (
              <div className="exercise-player-progress-bar">
                <div
                  className="exercise-player-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* ===== EXERCISE LIST ===== */}
          <div className="exercise-player-list" ref={listRef}>
            <div className="exercise-player-list-header">
              <h2>
                <Dumbbell size={20} />
                Lista de Exercícios
              </h2>
              <span className="exercise-player-list-count">
                {completedExercises.size} de {exercises.length} concluídos
              </span>
            </div>

            {exercises.length === 0 && (
              <div className="exercise-player-empty">
                <Dumbbell size={48} />
                <h3>Nenhum exercício encontrado</h3>
                <p>Este treino ainda não possui exercícios cadastrados.</p>
              </div>
            )}

            {exercises.map((ex, index) => {
              const isActive = index === activeIndex;
              const isCompleted = completedExercises.has(index);

              return (
                <div
                  key={ex.name}
                  id={`exercise-item-${index}`}
                  className={`exercise-player-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Number indicator */}
                  <div
                    className={`exercise-player-item-num ${isCompleted ? "done" : ""} ${isActive ? "playing" : ""}`}
                    onClick={() => handleToggleComplete(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      isCompleted
                        ? "Desmarcar exercício"
                        : "Marcar como concluído"
                    }
                  >
                    {isCompleted ? <Check size={16} /> : index + 1}
                  </div>

                  {/* Exercise info - clickable to select */}
                  <button
                    className="exercise-player-item-body"
                    onClick={() => handleSelectExercise(index)}
                  >
                    <div className="exercise-player-item-info">
                      <span className="exercise-player-item-name">
                        {ex.name}
                      </span>
                      <span className="exercise-player-item-reps">
                        {ex.reps}
                      </span>
                    </div>

                    {isActive && (
                      <div className="exercise-player-item-playing-indicator">
                        <span />
                        <span />
                        <span />
                      </div>
                    )}
                  </button>

                  {/* Complete toggle */}
                  <button
                    className={`exercise-player-item-action ${isCompleted ? "done" : ""}`}
                    onClick={() => handleToggleComplete(index)}
                    aria-label={
                      isCompleted ? "Refazer" : "Marcar como concluído"
                    }
                  >
                    {isCompleted ? (
                      <RotateCcw size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
