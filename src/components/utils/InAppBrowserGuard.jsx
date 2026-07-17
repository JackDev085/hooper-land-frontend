import React, { useEffect, useState } from "react";
import { Compass, Chrome, MoreVertical } from "lucide-react";

// Inline Safari icon as it is not exported by Lucide React
const SafariIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

export default function InAppBrowserGuard() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [platform, setPlatform] = useState("");
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !navigator) return;

    const ua = navigator.userAgent || navigator.vendor || window.opera;
    
    // Detect popular social in-app browsers
    const isInstagram = /Instagram/i.test(ua);
    const isFacebook = /FBAN|FBAV/i.test(ua);
    const isTikTok = /TikTok/i.test(ua);
    const isTwitter = /Twitter|TwitterAndroid|X-App/i.test(ua);
    const isLinkedIn = /LinkedInApp|LinkedIn/i.test(ua);
    const isTelegram = /Telegram/i.test(ua);

    const isInApp = isInstagram || isFacebook || isTikTok || isTwitter || isLinkedIn || isTelegram;

    if (!isInApp) return;

    // Set platform name for targeted UX messaging
    let detectedPlatform = "Aplicativo";
    if (isInstagram) detectedPlatform = "Instagram";
    else if (isFacebook) detectedPlatform = "Facebook";
    else if (isTikTok) detectedPlatform = "TikTok";
    else if (isTwitter) detectedPlatform = "X/Twitter";
    else if (isLinkedIn) detectedPlatform = "LinkedIn";
    else if (isTelegram) detectedPlatform = "Telegram";

    setPlatform(detectedPlatform);

    const ios = /iPhone|iPad|iPod/i.test(ua);
    const android = /Android/i.test(ua);
    setIsIOS(ios);
    setIsAndroid(android);

    // Skip if user already opted to continue in this session
    const dismissed = sessionStorage.getItem("iab_dismissed");
    const autoRedirected = sessionStorage.getItem("iab_redirected");

    if (dismissed === "true") return;

    setShowOverlay(true);

    // On Android, attempt to trigger browser intent automatically once
    if (android && autoRedirected !== "true") {
      sessionStorage.setItem("iab_redirected", "true");
      const cleanUrl = window.location.href.replace(/^https?:\/\//, "");
      const intentUrl = `intent://${cleanUrl}#Intent;scheme=https;end`;
      window.location.href = intentUrl;
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("iab_dismissed", "true");
    setShowOverlay(false);
  };

  const handleOpenExternal = () => {
    if (isAndroid) {
      const cleanUrl = window.location.href.replace(/^https?:\/\//, "");
      const intentUrl = `intent://${cleanUrl}#Intent;scheme=https;end`;
      window.location.href = intentUrl;
    }
  };

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-surface border border-neutral-850 rounded-3xl p-6 shadow-glow animate-slide-up">
        {/* Decorative background glows */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo / Header */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="p-4 bg-primary-light rounded-2xl border border-primary/20 mb-4 animate-float">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight uppercase font-display">
            Melhore seu <span className="text-primary">Treino</span>
          </h3>
          <p className="text-gray-400 text-sm mt-2 px-2 leading-relaxed">
            Você está acessando o Ballers085 pelo navegador interno do <span className="text-white font-semibold">{platform}</span>. Para uma melhor experiência de login, notificações e desempenho, use o navegador padrão do seu celular.
          </p>
        </div>

        {/* Step-by-step instructions container */}
        <div className="my-6 p-4 bg-neutral-900/50 rounded-2xl border border-neutral-800">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
            Como abrir no navegador externo:
          </h4>

          {isIOS ? (
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-xs font-bold text-gray-400 mt-0.5">1</span>
                <p className="leading-relaxed">
                  Toque nos três pontinhos <span className="inline-flex items-center px-1.5 py-0.5 bg-neutral-800 rounded text-xs text-white font-mono font-bold"><MoreVertical className="w-3.5 h-3.5 inline" /></span> ou no botão de <span className="font-semibold text-white">Compartilhar</span>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-xs font-bold text-gray-400 mt-0.5">2</span>
                <p className="leading-relaxed">
                  Selecione a opção <span className="font-semibold text-white">"Abrir no Safari"</span> ou <span className="font-semibold text-white">"Abrir no Navegador"</span>.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-xs font-bold text-gray-400 mt-0.5">1</span>
                <p className="leading-relaxed">
                  Toque no botão <span className="font-semibold text-white">Abrir no Navegador</span> abaixo para abrir diretamente.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-xs font-bold text-gray-400 mt-0.5">2</span>
                <p className="leading-relaxed">
                  Se falhar, toque nos três pontinhos <span className="inline-flex items-center px-1.5 py-0.5 bg-neutral-800 rounded text-xs text-white font-mono font-bold"><MoreVertical className="w-3.5 h-3.5 inline" /></span> no canto e selecione <span className="font-semibold text-white">"Abrir no navegador"</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col gap-3">
          {isAndroid && (
            <button
              onClick={handleOpenExternal}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 cursor-pointer"
            >
              <Chrome className="w-5 h-5" />
              Abrir no Navegador
            </button>
          )}

          {isIOS && (
            <div className="flex items-center justify-center gap-2 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-gray-400">
              <SafariIcon className="w-4 h-4 text-primary animate-pulse" />
              Aguardando você abrir no Safari...
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="w-full py-3 bg-transparent border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-medium rounded-xl text-sm transition-all duration-300 cursor-pointer"
          >
            Continuar mesmo assim
          </button>
        </div>
      </div>
    </div>
  );
}
