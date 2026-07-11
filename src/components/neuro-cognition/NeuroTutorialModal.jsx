import { useState, useEffect, useRef } from "react";
import {
  X,
  Volume2,
  BookOpen,
  HelpCircle,
  Play,
  CheckCircle,
  Zap,
  Info
} from "lucide-react";

const MOVEMENT_DETAILS = [
  {
    id: "drible",
    label: "Drible (troca de mão)",
    speech: "drible",
    desc: "Trocar a mão que está batendo a bola de um lado para o outro.",
    tip: "O drible deve ser feito com a palma da mão aberta para controlar melhor a bola, e a bola nunca deve passar da linha do quadril.",
    pattern: "bg-gradient-to-br from-neutral-900 to-neutral-850 border-orange-500/10"
  },
  {
    id: "pernada",
    label: "Pernada (Entre Pernas)",
    speech: "pernada",
    desc: "Mudar a bola de mão passando-a por baixo/entre as pernas.",
    tip: "Flexione os joelhos e dê um passo curto para a frente com a perna oposta para criar espaço para a bola passar limpa.",
    pattern: "bg-gradient-to-br from-neutral-900 to-neutral-850 border-orange-500/10"
  },
  {
    id: "raquetada",
    label: "Raquetada (Por trás das costas)",
    speech: "raquetada",
    desc: "Um cruzamento de bola por trás das costas.",
    tip: "O movimento deve ser rápido e rasteiro.",
    pattern: "bg-gradient-to-br from-neutral-900 to-neutral-850 border-orange-500/10"
  },
  {
    id: "hesitacao",
    label: "Hesitação (Pocket)",
    speech: "hesitação",
    desc: "Pausar o drible momentaneamente no ar trazendo a bola para o quadril.",
    tip: "Mantenha a mão por cima da bola (evitando 'carregar'). Erga ligeiramente o tronco para simular um arremesso e depois arranque rápido.",
    pattern: "bg-gradient-to-br from-neutral-900 to-neutral-850 border-orange-500/10"
  }
];

export default function NeuroTutorialModal({ isOpen, onClose, onPlaySpeech }) {
  const [activeTab, setActiveTab] = useState("concept"); // concept | movements
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);

  // Monitor when isPlayingVideo transitions to true, and enter fullscreen
  useEffect(() => {
    if (isPlayingVideo && videoRef.current) {
      const video = videoRef.current;
      const requestFullscreen =
        video.requestFullscreen ||
        video.webkitRequestFullscreen ||
        video.mozRequestFullScreen ||
        video.msRequestFullscreen;

      if (requestFullscreen) {
        requestFullscreen.call(video).catch((err) => {
          console.warn("Could not request fullscreen:", err);
        });
      }
      
      // Auto-play the video
      video.play().catch((err) => {
        console.warn("Could not autoplay video:", err);
      });
    }
  }, [isPlayingVideo]);

  // Listen to fullscreen changes (e.g. user pressing Escape to exit)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        setIsPlayingVideo(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const handleVideoEnded = () => {
    const exitFullscreen =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;

    if (exitFullscreen && (document.fullscreenElement || document.webkitFullscreenElement)) {
      exitFullscreen.call(document).catch((err) => {
        console.warn("Could not exit fullscreen on video end:", err);
      });
    }
    setIsPlayingVideo(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-[0_0_50px_rgba(249,115,22,0.15)] flex flex-col max-h-[85vh] z-10 animate-fade-in">

        {/* Header */}
        <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600/15 rounded-xl text-orange-500">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Tutorial de Treino
              </h2>
              <p className="text-[11px] text-gray-500">
                Aprenda a treinar sua velocidade de reação e tomada de decisão
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white rounded-xl bg-neutral-900/60 border border-neutral-850 hover:border-neutral-800 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs navigation */}
        <div className="flex border-b border-neutral-900 px-6 bg-neutral-950">
          <button
            onClick={() => setActiveTab("concept")}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider relative flex items-center gap-2 border-none bg-transparent cursor-pointer transition-all mr-6 ${activeTab === "concept" ? "text-orange-500" : "text-gray-500 hover:text-gray-300"
              }`}
          >
            <HelpCircle size={14} />
            Como Funciona
            {activeTab === "concept" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("movements")}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider relative flex items-center gap-2 border-none bg-transparent cursor-pointer transition-all ${activeTab === "movements" ? "text-orange-500" : "text-gray-500 hover:text-gray-300"
              }`}
          >
            <Zap size={14} />
            Guia de Movimentos
            {activeTab === "movements" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: CONCEPT */}
          {activeTab === "concept" && (
            <div className="space-y-6 animate-fade-in">
              {/* Mock Video Container */}
              <div className="relative aspect-video rounded-2xl bg-neutral-900 border border-neutral-850 overflow-hidden group shadow-inner">
                {!isPlayingVideo ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {/* Glowing aesthetic backdrop */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-transparent to-red-600/5 pointer-events-none" />

                    {/* Motion particles animation in CSS */}
                    <div className="w-16 h-16 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-500 cursor-pointer shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 group-hover:bg-orange-600 group-hover:text-white"
                      onClick={() => setIsPlayingVideo(true)}
                    >
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                    <span className="text-sm font-extrabold text-white mt-4 uppercase tracking-wider">
                      Vídeo Explicativo
                    </span>
                    <span className="text-xs text-gray-500 mt-1 max-w-sm">
                      Assista em 30 segundos como se posicionar e responder aos estímulos de áudio do aplicativo.
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <video
                      ref={videoRef}
                      src="/video_tutorial.mp4"
                      controls
                      autoPlay
                      className="w-full h-full"
                      onEnded={handleVideoEnded}
                    />
                  </div>
                )}
              </div>

              {/* Three golden rules */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-orange-500 uppercase tracking-wider flex items-center gap-2">
                  <Info size={16} />
                  3 Regras de Ouro do Treino
                </h3>

                <div className="grid gap-3.5">
                  <div className="flex gap-3.5 bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl">
                    <div className="w-6 h-6 rounded-full bg-orange-600/10 border border-orange-500/25 flex items-center justify-center text-xs font-black text-orange-500 shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Base Baixa de Drible</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        Fique na postura de tripla ameaça ou postura atlética de drible (pernas afastadas e joelhos flexionados). Não treine em pé.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl">
                    <div className="w-6 h-6 rounded-full bg-orange-600/10 border border-orange-500/25 flex items-center justify-center text-xs font-black text-orange-500 shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">O Foco é Velocidade de Reação</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        Errou o drible? Não pare o exercício. Continue driblando e foque no próximo comando. O objetivo principal é a agilidade do comando mental para o gesto motor.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl">
                    <div className="w-6 h-6 rounded-full bg-orange-600/10 border border-orange-500/25 flex items-center justify-center text-xs font-black text-orange-500 shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Dobre a Carga em Combos</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                        Nas dificuldades maiores, você ouvirá comandos como <span className="text-orange-400">"giro + pernada"</span>. Tente encadear as duas ações de forma explosiva em sequência imediata.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MOVEMENTS */}
          {activeTab === "movements" && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs text-gray-400 bg-neutral-900/40 p-3.5 rounded-xl border border-neutral-900 leading-relaxed">
                Clique no botão de som em cada card para ouvir como a voz do aplicativo pronunciará o movimento durante a sessão prática.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOVEMENT_DETAILS.map((move) => (
                  <div
                    key={move.id}
                    className={`border rounded-2xl p-4.5 flex flex-col justify-between transition-all hover:border-orange-500/25 hover:shadow-[0_4px_20px_rgba(249,115,22,0.03)] ${move.pattern}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-black text-white uppercase tracking-wider">
                          {move.label}
                        </span>

                        <button
                          onClick={() => onPlaySpeech(move.speech)}
                          className="p-2 rounded-xl bg-orange-600/10 hover:bg-orange-600/20 text-orange-500 border border-orange-500/10 hover:border-orange-500/30 transition-all cursor-pointer flex items-center justify-center shadow-sm"
                          title="Ouvir comando falado"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
                        {move.desc}
                      </p>
                    </div>

                    {/* 
                    <div className="bg-black/40 border border-neutral-900/50 p-2.5 rounded-xl flex items-start gap-2">
                      <CheckCircle size={12} className="text-orange-500 shrink-0 mt-0.5" />
                      <p className  "text-[10px] text-gray-500 leading-relaxed italic">
                        
                        {move.tip} 
                        
                      </p>
                    </div>
                        */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-neutral-900 bg-neutral-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer border-none"
          >
            Entendido, Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
