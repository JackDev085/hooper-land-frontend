import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home, Dumbbell, MapPin, User, Heart } from "lucide-react";

export default function BottomNav() {
  const { user } = useAuth();
  const location = useLocation();

  // Itens de navegação - diferentes para usuário logado/deslogado
  const navItems = user
    ? [
        { path: "/", icon: Home, label: "Início" },
        { path: "/workouts", icon: Dumbbell, label: "Treinos" },
        { path: "/games", icon: MapPin, label: "Rachas" },
        { path: "/me", icon: User, label: "Perfil" },
      ]
    : [
        { path: "/", icon: Home, label: "Início" },
        { path: "/support", icon: Heart, label: "Apoie" },
        { path: "/auth", icon: User, label: "Entrar" },
      ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-gray-800/50 md:hidden">
      {/* Safe area para dispositivos com notch */}
      <div className="flex justify-around items-center h-16 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex flex-col items-center justify-center flex-1 h-full 
                transition-all duration-300 group
                ${active ? "text-orange-500" : "text-gray-500"}
              `}
            >
              {/* Active indicator dot */}
              {active && (
                <span className="absolute top-1 w-1 h-1 bg-orange-500 rounded-full animate-fade-in" />
              )}

              <div
                className={`
                relative p-1.5 rounded-xl transition-all duration-300
                ${active ? "bg-orange-500/10" : "group-hover:bg-white/5"}
              `}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 2}
                  className={`
                    transition-all duration-300
                    ${active ? "scale-110" : "group-hover:scale-105 group-hover:text-gray-300"}
                  `}
                />
              </div>

              <span
                className={`
                  text-[10px] mt-0.5 font-medium tracking-wide
                  transition-all duration-300
                  ${active ? "text-orange-500" : "group-hover:text-gray-300"}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
