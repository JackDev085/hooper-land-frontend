import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ChevronRight, MessageCircle } from "lucide-react";
import { SkeletonGameCard } from "../components/ui/Skeleton";

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const weekdays = {
    1: "Seg",
    2: "Ter",
    3: "Qua",
    4: "Qui",
    5: "Sex",
    6: "Sáb",
    7: "Dom",
  };

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await api.get("/games");
        setGames(res.data);
      } catch (err) {
        console.error("Erro ao carregar rachas:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Rachas <span className="text-orange-500">Disponíveis</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Encontre um local para jogar perto de você
            </p>
          </div>
          <a
            href="https://wa.me/5585986667136?text=Gostaria%20de%20sugerir%20um%20novo%20local%20de%20racha..."
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              bg-green-600 hover:bg-green-500 
              text-white px-6 py-3.5 rounded-xl 
              font-bold tracking-wide
              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-0.5
              self-start sm:self-auto
            "
          >
            <MessageCircle size={20} />
            Sugerir novo local
          </a>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonGameCard key={i} />
            ))}
          </div>
        )}

        {/* Games grid */}
        {!loading && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game, index) => (
              <div
                key={game.id}
                className="
                  group bg-surface rounded-2xl overflow-hidden 
                  border border-gray-800 hover:border-orange-500/50
                  transition-all duration-500 ease-out
                  hover:shadow-glow hover:-translate-y-1
                  animate-fade-in-up
                 
                "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.photos?.[0]?.url || "/quadra-default.jpg"}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-2 ">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                    {game.title || "Sem título"}
                  </h2>

                  {/* Location */}
                  <div className="flex items-start gap-2 text-gray-300 text-sm mb-2">
                    <MapPin
                      size={16}
                      className="text-orange-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="line-clamp-2">
                      {game.address || "Sem endereço"}
                    </span>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start gap-2 text-gray-300 text-sm mb-4">
                    <Calendar
                      size={16}
                      className="text-orange-500 mt-0.5 flex-shrink-0"
                    />
                    <div className="flex flex-wrap gap-1">
                      {game.schedules?.slice(0, 3).map((schedule, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5  rounded text-xs"
                        >
                          {weekdays[schedule.weekday]} {schedule.start_time}
                        </span>
                      ))}
                      {game.schedules?.length > 3 && (
                        <span className="px-2 py-0.5  rounded text-xs">
                          +{game.schedules.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/game/${game.id}`}
                    className="
                      w-full flex items-center justify-center gap-2
                      bg-orange-600 hover:bg-orange-500 
                      text-white py-3 rounded-xl 
                      font-semibold tracking-wide
                      transition-all duration-300
                      hover:shadow-glow hover:-translate-y-0.5
                      group/btn
                    
                      "
                  >
                    Ver detalhes
                    <ChevronRight
                      size={18}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && games.length === 0 && (
          <div className="text-center py-20">
            <MapPin size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              Nenhum racha encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              Em breve teremos novos locais disponíveis.
            </p>
            <a
              href="https://wa.me/5585988888888?text=Gostaria%20de%20sugerir%20um%20novo%20local%20de%20racha..."
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                bg-green-600 hover:bg-green-500 
                text-white px-6 py-3.5 rounded-xl 
                font-bold tracking-wide
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-0.5
              "
            >
              <MessageCircle size={20} />
              Sugerir novo local
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
