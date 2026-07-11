import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

// Import subcomponents
import NeuroTutorialModal from "../components/neuro-cognition/NeuroTutorialModal";
import NeuroConfig from "../components/neuro-cognition/NeuroConfig";
import NeuroCountdown from "../components/neuro-cognition/NeuroCountdown";
import NeuroWorkout from "../components/neuro-cognition/NeuroWorkout";
import NeuroSummary from "../components/neuro-cognition/NeuroSummary";

// Dribbles / Movimentos padrão
const DEFAULT_MOVEMENTS = [
  { id: "drible", label: "Drible (troca de mão)", speech: "drible" },
  { id: "pernada", label: "Pernada (Entre Pernas)", speech: "pernada" },
  { id: "raquetada", label: "Raquetada (Por trás das costas)", speech: "raquetada" },
  { id: "hesitacao", label: "Hesitação (Pocket)", speech: "hesitação" }
];

const DIFFICULTY_SETTINGS = {
  facil: {
    label: "Fácil",
    interval: 3500, // 3.5 segundos
    color: "text-green-400 border-green-500/20 bg-green-500/5",
    glowColor: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    desc: "Perfeito para iniciantes. Comandos individuais e ritmo calmo."
  },
  medio: {
    label: "Médio",
    interval: 3000, // 3 segundos
    color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
    glowColor: "shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    desc: "Ritmo moderado. Comandos simples com combinações ocasionais."
  },
  dificil: {
    label: "Difícil",
    interval: 2500, // 2 segundos
    color: "text-orange-500 border-orange-500/20 bg-orange-500/5",
    glowColor: "shadow-[0_0_20px_rgba(249,115,22,0.3)]",
    desc: "Acelerado. Combinações constantes e transições rápidas."
  },
  lenda: {
    label: "Lenda",
    interval: 2000, // 2 segundos
    color: "text-red-500 border-red-500/20 bg-red-500/5",
    glowColor: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    desc: "Insano! Tempo mínimo de reação. Combos triplos frequentes."
  }
};

export default function NeuroCognition() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Estados principais de fluxo
  const [screen, setScreen] = useState("config"); // config | countdown | workout | summary
  const [countdown, setCountdown] = useState(3);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Configurações do Treino
  const [difficulty, setDifficulty] = useState("medio");
  const [duration, setDuration] = useState(60); // em segundos (padrão 1 min)
  const [customDurationInput, setCustomDurationInput] = useState("3"); // em minutos
  const [durationMode, setDurationMode] = useState("1"); // "1" | "2" | "3" | "5" | "custom"
  const [activeMovements, setActiveMovements] = useState({
    drible: true,
    pernada: true,
    raquetada: true,
    hesitacao: false
  });
  const [audioSettings, setAudioSettings] = useState({
    voice: true,
    beep: true
  });

  // Configurações do Intervalo Personalizado
  const [useCustomInterval, setUseCustomInterval] = useState(false);
  const [customInterval, setCustomInterval] = useState(2.0); // em segundos

  // Estados de execução do treino
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentCommand, setCurrentCommand] = useState("");
  const [nextCommand, setNextCommand] = useState("");
  const [totalCommands, setTotalCommands] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [beatActive, setBeatActive] = useState(false);

  // Conclusão
  const [savingWorkout, setSavingWorkout] = useState(false);
  const [workoutCompletedSuccessfully, setWorkoutCompletedSuccessfully] = useState(false);
  const [newStreak, setNewStreak] = useState(0);
  const [errorCompleting, setErrorCompleting] = useState("");

  // Configurações de arquivos de áudio locais pré-gravados
  const AUDIO_FILES = {
    drible: "/audio/drible.mp3",
    pernada: "/audio/pernada.mp3",
    raquetada: "/audio/raquetada.mp3",
    hesitacao: "/audio/hesitacao.mp3"
  };

  const audioCacheRef = useRef({});
  const activeAudiosRef = useRef([]);
  const activeSequenceTimeoutRef = useRef(null);

  // Parar qualquer áudio tocando e limpar timers pendentes
  const stopAllVoicePlayback = useCallback(() => {
    if (activeSequenceTimeoutRef.current) {
      clearTimeout(activeSequenceTimeoutRef.current);
      activeSequenceTimeoutRef.current = null;
    }
    if (activeAudiosRef.current) {
      activeAudiosRef.current.forEach((audio) => {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (e) { }
      });
      activeAudiosRef.current = [];
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Pré-carrega todos os arquivos de voz locais ao iniciar
  useEffect(() => {
    const cache = {};
    Object.entries(AUDIO_FILES).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      cache[key] = audio;
    });
    audioCacheRef.current = cache;

    return () => {
      stopAllVoicePlayback();
    };
  }, [stopAllVoicePlayback]);

  // Refs de temporizadores e contexto de áudio
  const workoutTimerRef = useRef(null);
  const commandIntervalRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const audioContextRef = useRef(null);

  // Iniciar contexto de áudio sob interação do usuário
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Tocar bip
  const playBeep = useCallback((frequency = 800, durationMs = 120) => {
    if (!audioSettings.beep) return;
    try {
      initAudio();
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch (err) {
      console.error("Erro ao tocar som:", err);
    }
  }, [audioSettings.beep]);

  // Tocar voz do comando sequencialmente (utilizando arquivos mp3 pré-carregados)
  const speakCommand = useCallback(async (text, force = false) => {
    if (!audioSettings.voice && !force) return;

    // Cancela qualquer áudio ou timer que ainda esteja tocando/pendente da rodada anterior
    stopAllVoicePlayback();

    // Divide apenas por '+' ou pela palavra 'e' (evitando letras soltas ou dentro de palavras como hesitação e por trás)
    const parts = text.split(/\s*(?:\+|\be\b)\s*/i).filter(p => p.trim() !== "");
    
    // Determina a velocidade de reprodução baseada no número de partes e na dificuldade
    let rate = 1.0;
    if (difficulty === "facil") rate = 1.1;
    else if (difficulty === "medio") rate = 1.3;
    else if (difficulty === "dificil") rate = 1.5;
    else rate = 1.85;

    // Aumenta a velocidade se for um combo (mais de 1 drible) para dar tempo de terminar
    if (parts.length === 2) rate *= 1.35;
    if (parts.length >= 3) rate *= 1.65;

    // Garante limites adequados suportados pelo reprodutor
    rate = Math.min(Math.max(rate, 0.75), 3.0);

    try {
      for (const part of parts) {
        let key = part.trim().toLowerCase();
        if (key === "hesitação") key = "hesitacao";

        const audio = audioCacheRef.current[key];
        if (audio) {
          audio.playbackRate = rate; // Ajusta a velocidade do áudio
          audio.currentTime = 0;
          activeAudiosRef.current.push(audio);

          await new Promise((resolve) => {
            audio.onended = resolve;
            audio.play().catch((err) => {
              console.warn("Autoplay bloqueado ou erro no áudio local:", err);
              resolve();
            });
            // O timeout do fallback deve se adaptar à velocidade de reprodução! (áudio tem ~1s)
            const timeoutDuration = Math.max(1200 / rate, 300);
            activeSequenceTimeoutRef.current = setTimeout(resolve, timeoutDuration);
          });
          
          // Intervalo sutil entre palavras do combo (adaptativo)
          const gap = Math.max(100 / rate, 30);
          await new Promise((resolve) => {
            activeSequenceTimeoutRef.current = setTimeout(resolve, gap);
          });
        } else {
          throw new Error("Chave de áudio local não mapeada");
        }
      }
    } catch (err) {
      // Fallback para SpeechSynthesis nativo do navegador caso falhe o áudio local
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pt-BR";
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [audioSettings.voice, difficulty, stopAllVoicePlayback]);

  // Alternar seleção de movimento
  const handleToggleMovement = (id) => {
    setActiveMovements((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      // Garantir que pelo menos 1 esteja ativo
      const anyActive = Object.values(updated).some(val => val);
      return anyActive ? updated : prev;
    });
  };

  // Gerar comando dinamicamente com base nas configurações
  const generateNextCommand = useCallback(() => {
    const enabledMoves = DEFAULT_MOVEMENTS.filter(m => activeMovements[m.id]);
    if (enabledMoves.length === 0) return "";

    const getRandomMove = () => enabledMoves[Math.floor(Math.random() * enabledMoves.length)];

    // Caso a dificuldade seja alta, podemos ter combos de movimentos
    const roll = Math.random();
    
    // Configurações de combo por dificuldade
    if (difficulty === "lenda" && roll > 0.4) {
      // 60% chance de combo duplo ou triplo no nível Lenda
      const m1 = getRandomMove();
      const m2 = getRandomMove();
      if (roll > 0.75) {
        const m3 = getRandomMove();
        return `${m1.speech} + ${m2.speech} + ${m3.speech}`;
      }
      return `${m1.speech} + ${m2.speech}`;
    } else if (difficulty === "dificil" && roll > 0.6) {
      // 40% chance de combo duplo no nível Difícil
      const m1 = getRandomMove();
      const m2 = getRandomMove();
      return `${m1.speech} + ${m2.speech}`;
    } else if (difficulty === "medio" && roll > 0.85) {
      // 15% chance de combo duplo no nível Médio
      const m1 = getRandomMove();
      const m2 = getRandomMove();
      return `${m1.speech} e ${m2.speech}`;
    }

    // Caso contrário, comando simples
    return getRandomMove().speech;
  }, [activeMovements, difficulty]);

  // Efeito do pulso visual (beat)
  const triggerBeatPulse = () => {
    setBeatActive(true);
    setTimeout(() => setBeatActive(false), 200);
  };

  // Função disparada a cada tick do comando
  const executeCommandTick = useCallback(() => {
    triggerBeatPulse();
    playBeep(850, 100);

    let nextCmdText = nextCommand;
    if (!nextCmdText) {
      nextCmdText = generateNextCommand();
    }
    
    setCurrentCommand(nextCmdText);
    speakCommand(nextCmdText);
    setTotalCommands((prev) => prev + 1);

    // Pré-calcula o próximo comando para exibir em menor tamanho na tela
    const futureCmd = generateNextCommand();
    setNextCommand(futureCmd);
  }, [nextCommand, generateNextCommand, playBeep, speakCommand]);

  // Gerenciamento da Execução do Treino (Timers)
  useEffect(() => {
    if (screen !== "workout" || isPaused) {
      // Se não estiver treinando ou estiver pausado, limpa intervalos
      if (workoutTimerRef.current) clearInterval(workoutTimerRef.current);
      if (commandIntervalRef.current) clearInterval(commandIntervalRef.current);
      stopAllVoicePlayback();
      return;
    }

    // Cronômetro principal (segundo a segundo)
    workoutTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Terminou o treino!
          endWorkoutSession();
          return 0;
        }
        return prev - 1;
      });
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    // Intervalo de comandos (varia por dificuldade ou tempo personalizado)
    const tickTime = useCustomInterval ? customInterval * 1000 : DIFFICULTY_SETTINGS[difficulty].interval;
    commandIntervalRef.current = setInterval(() => {
      executeCommandTick();
    }, tickTime);

    return () => {
      if (workoutTimerRef.current) clearInterval(workoutTimerRef.current);
      if (commandIntervalRef.current) clearInterval(commandIntervalRef.current);
    };
  }, [screen, isPaused, difficulty, useCustomInterval, customInterval, executeCommandTick, stopAllVoicePlayback]);

  // Começar o Fluxo do Treino
  const startWorkoutFlow = () => {
    initAudio();

    // Desbloqueia os áudios pré-carregados (política de autoplay dos navegadores)
    Object.values(audioCacheRef.current).forEach((audio) => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audio.pause();
          audio.currentTime = 0;
        }).catch((err) => {
          console.warn("Desbloqueio de áudio evitado/falhou:", err);
        });
      }
    });

    // Calcular a duração
    let totalSecs = 60;
    if (durationMode === "custom") {
      const parsed = parseFloat(customDurationInput);
      totalSecs = !isNaN(parsed) && parsed > 0 ? Math.round(parsed * 60) : 60;
    } else {
      totalSecs = parseInt(durationMode) * 60;
    }

    setDuration(totalSecs);
    setTimeRemaining(totalSecs);
    setElapsedTime(0);
    setTotalCommands(0);
    setWorkoutCompletedSuccessfully(false);
    setErrorCompleting("");

    // Primeiro gera os comandos iniciais
    const firstCmd = generateNextCommand();
    const secondCmd = generateNextCommand();
    setCurrentCommand(firstCmd);
    setNextCommand(secondCmd);

    // Ir para tela de contagem regressiva
    setScreen("countdown");
    setCountdown(3);

    // Iniciar contagem regressiva de 3s
    playBeep(600, 150);
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current);
          // Inicia o treino de fato
          setScreen("workout");
          setTimeout(() => {
            playBeep(1200, 300);
            speakCommand(firstCmd);
            setTotalCommands(1);
          }, 100);
          return 0;
        }
        playBeep(600, 150);
        return prev - 1;
      });
    }, 1000);
  };

  // Parar/Finalizar sessão de treino
  const endWorkoutSession = () => {
    if (workoutTimerRef.current) clearInterval(workoutTimerRef.current);
    if (commandIntervalRef.current) clearInterval(commandIntervalRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    stopAllVoicePlayback();

    playBeep(1000, 500);
    setScreen("summary");
  };

  // Abandonar treino
  const quitWorkout = () => {
    if (workoutTimerRef.current) clearInterval(workoutTimerRef.current);
    if (commandIntervalRef.current) clearInterval(commandIntervalRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    stopAllVoicePlayback();
    setScreen("config");
  };

  // Salvar conclusão do treino
  const handleSaveWorkoutCompletion = async () => {
    setSavingWorkout(true);
    setErrorCompleting("");
    try {
      // Faz o POST para o ID de treino de neurocognição (999) criado via seed
      const res = await api.post("/workouts/999/complete");
      setNewStreak(res.data.streak_count);
      setWorkoutCompletedSuccessfully(true);

      // Atualiza o estado global de usuário para refletir a nova streak e a data
      if (user) {
        updateUser({
          streak_count: res.data.streak_count,
          last_workout_at: res.data.last_workout_at
        });
      }
    } catch (err) {
      console.error("Erro ao registrar conclusão de treino:", err);
      // Fallback local caso dê erro de conexão ou permissão
      const fallbackStreak = user ? user.streak_count + 1 : 1;
      setNewStreak(fallbackStreak);
      setWorkoutCompletedSuccessfully(true);
      setErrorCompleting("Não foi possível registrar no servidor, mas seu progresso local foi salvo!");
    } finally {
      setSavingWorkout(false);
    }
  };

  // Formatar tempo (mm:ss)
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-16 py-20 pt-24 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        {screen === "config" && (
          <NeuroConfig
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            difficultySettings={DIFFICULTY_SETTINGS}
            durationMode={durationMode}
            setDurationMode={setDurationMode}
            customDurationInput={customDurationInput}
            setCustomDurationInput={setCustomDurationInput}
            activeMovements={activeMovements}
            handleToggleMovement={handleToggleMovement}
            defaultMovements={DEFAULT_MOVEMENTS}
            audioSettings={audioSettings}
            setAudioSettings={setAudioSettings}
            useCustomInterval={useCustomInterval}
            setUseCustomInterval={setUseCustomInterval}
            customInterval={customInterval}
            setCustomInterval={setCustomInterval}
            startWorkoutFlow={startWorkoutFlow}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}

        {screen === "countdown" && (
          <NeuroCountdown countdown={countdown} quitWorkout={quitWorkout} />
        )}

        {screen === "workout" && (
          <NeuroWorkout
            difficulty={difficulty}
            difficultySettings={DIFFICULTY_SETTINGS}
            timeRemaining={timeRemaining}
            totalCommands={totalCommands}
            beatActive={beatActive}
            currentCommand={currentCommand}
            nextCommand={nextCommand}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            endWorkoutSession={endWorkoutSession}
            quitWorkout={quitWorkout}
            formatTime={formatTime}
          />
        )}

        {screen === "summary" && (
          <NeuroSummary
            elapsedTime={elapsedTime}
            totalCommands={totalCommands}
            difficulty={difficulty}
            difficultySettings={DIFFICULTY_SETTINGS}
            workoutCompletedSuccessfully={workoutCompletedSuccessfully}
            newStreak={newStreak}
            errorCompleting={errorCompleting}
            savingWorkout={savingWorkout}
            handleSaveWorkoutCompletion={handleSaveWorkoutCompletion}
            setScreen={setScreen}
            formatTime={formatTime}
            navigate={navigate}
          />
        )}

        <NeuroTutorialModal
          isOpen={isTutorialOpen}
          onClose={() => setIsTutorialOpen(false)}
          onPlaySpeech={(text) => speakCommand(text, true)} // Force play speech in tutorial even if voice is disabled
        />
      </div>
    </div>
  );
}
