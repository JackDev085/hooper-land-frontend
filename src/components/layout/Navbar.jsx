import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Heart, Menu, X, Download, Crown } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const navLinkClasses = (path) => `
    relative py-1 font-medium transition-all duration-300
    hover:text-orange-500
    ${location.pathname === path ? "text-orange-500" : "text-gray-300"}
    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-orange-500
    after:transition-all after:duration-300
    ${location.pathname === path ? "after:w-full" : "after:w-0 hover:after:w-full"}
  `;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        w-full px-6 md:px-16 py-4
        flex items-center justify-between
        transition-all duration-300
        ${scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-gray-800/50 shadow-lg"
          : "bg-transparent border-b border-transparent"
        }
      `}
    >
      {/* Logo + PRO badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/" className="tracking-wide uppercase group flex items-center gap-2">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              className="h-10 w-10 transition-transform group-hover:scale-105 md:h-14 md:w-14"
              src="/logo-test.png"
              alt="Ballers085"
              width={160}
              height={56}
              fetchPriority="high"
            />
          </picture>
        </Link>

        {user?.premium && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 text-black font-black text-[10px] md:text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.6)] border border-amber-300">
            <Crown size={12} className="fill-black" />
            PRO
          </span>
        )}
      </div>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center gap-8 text-base">
        {user?.premium ? (
          <Link
            to="/premium"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-extrabold text-xs uppercase tracking-wider hover:bg-amber-500/20 transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
          >
            <Crown size={14} className="text-amber-400 fill-amber-400" />
            Membro PRO
          </Link>
        ) : (
          <Link
            to="/premium"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all"
          >
            <Crown size={14} className="text-amber-200 fill-amber-200" />
            Premium
          </Link>
        )}
        <Link to="/support" className={navLinkClasses("/support")}>
          Apoie
        </Link>
        <Link to="/workouts" className={navLinkClasses("/workouts")}>
          Treinos
        </Link>
        <Link to="/games" className={navLinkClasses("/games")}>
          Rachas
        </Link>
        <Link to="/dash" className={navLinkClasses("/dash")}>
          Métricas
        </Link>
        {user ? (
          <>
            <Link to="/me" className={navLinkClasses("/me")}>
              Perfil
            </Link>
            <button
              onClick={logout}
              className="px-5 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-300"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
          >
            Entrar
          </Link>
        )}
      </nav>

      {/* Mobile: Apoie button + Hamburger */}
      <div className="md:hidden flex items-center gap-3 h[100dvh]">
        <Link
          to="/support"
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold 
            transition-all duration-300
            ${location.pathname === "/support"
              ? "bg-orange-600 text-white shadow-glow"
              : "bg-orange-600/20 text-orange-400 hover:bg-orange-600/30"
            }
          `}
        >
          <Heart
            size={16}
            className={location.pathname === "/support" ? "fill-current" : ""}
          />
          <span>Apoie</span>
        </Link>

        {/* Hamburger button */}
        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((s) => !s)}
          className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          {!open ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setOpen(false)}
          />

          {/* Menu panel */}
          <div className="fixed top-0 right-0 w-72 h-full bg-black/95 backdrop-blur-xl border-l border-gray-800 z-50 animate-slide-in-right">
            <div className="p-6 bg-black">
              {/* Header */}
              <div className=" flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="tracking-wide uppercase"
                  >
                    <img className="h-8" src="/logo192.png" alt="logo" />
                  </Link>
                  {user?.premium && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-black font-black text-[9px] uppercase tracking-wider border border-amber-300">
                      <Crown size={10} className="fill-black" />
                      PRO
                    </span>
                  )}
                </div>
                <button
                  aria-label="Fechar menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation links */}
              <nav id="mobile-menu" className="flex flex-col gap-1 ">
                <Link
                  onClick={() => setOpen(false)}
                  to="/premium"
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300
                    ${user?.premium
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : location.pathname === "/premium"
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white"
                        : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20"
                    }
                  `}
                >
                  <Crown size={20} className="text-amber-400 fill-amber-400" />
                  {user?.premium ? "Membro PRO 👑" : "Seja Premium 👑"}
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/support"
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300
                    ${location.pathname === "/support"
                      ? "bg-orange-600/20 text-orange-500"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <Heart size={20} />
                  Apoie
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/workouts"
                  className={`
                    px-4 py-3 rounded-xl font-medium transition-all duration-300
                    ${location.pathname === "/workouts"
                      ? "bg-orange-600/20 text-orange-500"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  Treinos
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/games"
                  className={`
                    px-4 py-3 rounded-xl font-medium transition-all duration-300
                    ${location.pathname === "/games"
                      ? "bg-orange-600/20 text-orange-500"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  Rachas
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/dash"
                  className={`
                    px-4 py-3 rounded-xl font-medium transition-all duration-300
                    ${location.pathname === "/dash"
                      ? "bg-orange-600/20 text-orange-500"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  Métricas
                </Link>

                {user ? (
                  <>
                    <Link
                      onClick={() => setOpen(false)}
                      to="/me"
                      className={`
                        px-4 py-3 rounded-xl font-medium transition-all duration-300
                        ${location.pathname === "/me"
                          ? "bg-orange-600/20 text-orange-500"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >
                      Perfil
                    </Link>

                    <div className="my-4 border-t border-gray-800" />

                    <button
                      onClick={async () => {
                        if (deferredPrompt) {
                          deferredPrompt.prompt();
                          await deferredPrompt.userChoice;
                          setDeferredPrompt(null);
                          setCanInstall(false);
                          setOpen(false);
                        } else {
                          alert(
                            "Para instalar o aplicativo:\n\n" +
                            "No iOS (Safari): Toque em 'Compartilhar' e depois em 'Adicionar à Tela de Início'.\n\n" +
                            "No Android (Chrome): Toque nos 3 pontinhos e depois em 'Adicionar à tela inicial' ou 'Instalar aplicativo'."
                          );
                        }
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-left text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      <Download size={20} />
                      Baixar para celular
                    </button>

                    <button
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                      className="px-4 py-3 rounded-xl font-medium text-left text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={async () => {
                        if (deferredPrompt) {
                          deferredPrompt.prompt();
                          await deferredPrompt.userChoice;
                          setDeferredPrompt(null);
                          setCanInstall(false);
                          setOpen(false);
                        } else {
                          alert(
                            "Para instalar o aplicativo:\n\n" +
                            "No iOS (Safari): Toque em 'Compartilhar' e depois em 'Adicionar à Tela de Início'.\n\n" +
                            "No Android (Chrome): Toque nos 3 pontinhos e depois em 'Adicionar à tela inicial' ou 'Instalar aplicativo'."
                          );
                        }
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-left text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      <Download size={20} />
                      Baixar para celular
                    </button>

                    <div className="my-4 border-t border-gray-800" />
                    <Link
                      onClick={() => setOpen(false)}
                      to="/auth"
                      className="px-4 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-semibold text-center transition-all duration-300"
                    >
                      Entrar
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
