import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const weekdays = {
    1: "segunda",
    2: "terça",
    3: "quarta",
    4: "quinta",
    5: "sexta",
    6: "sabado",
    7: "domingo",
  };

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await api.get(`/games/${id}`);
        setGame(res.data);
      } catch (err) {
        console.error("Erro ao carregar dados do racha:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGame();
  }, [id]);

  if (loading)
    return <p className="text-white text-center mt-10">Carregando…</p>;
  if (!game)
    return (
      <p className="text-white text-center mt-10">Racha não encontrado.</p>
    );

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Foto grande */}
      <div className="w-full max-h-[380px] overflow-hidden">
        <img
          src={"/quadra-default.jpg"}
          alt={game.title}
          className="mx-auto h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        {/* Nome */}
        <h1 className="text-4xl font-extrabold tracking-wide mb-4">
          {game.title}
        </h1>
        <p className="text-lg text-neutral-300 mb-2">
          <span className="font-semibold text-white">{game.description}</span>
        </p>

        {/* Informações primárias */}
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 mb-8">
          <p className="text-lg text-neutral-300 mb-2">
            📍 <span className="font-semibold text-white">{game.address}</span>
          </p>

          <p className="text-neutral-300 text-sm mb-1">
            🗓️ Dias:{" "}
            <span className="font-medium">
              {game.schedules?.map((element) => {
                return `${weekdays[element.weekday]} (${element.start_time}-${element.end_time}) `;
              })}
            </span>
          </p>
        </div>

        {/* Descrição */}
        {game.descricao && (
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 mb-8">
            <h2 className="text-2xl font-bold mb-3">Descrição</h2>
            <p className="text-neutral-300 leading-relaxed">
              {game.description}
            </p>
          </div>
        )}

        {/* Botões de navegação (Google Maps / Waze) */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={
              game.maps_link ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(game.address)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-700 transition-all w-full text-center py-3 rounded-lg font-semibold"
          >
            Abrir no Google Maps
          </a>

          <a
            href={`https://waze.com/ul?q=${encodeURIComponent(game.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 transition-all w-full text-center py-3 rounded-lg font-semibold"
          >
            Abrir no Waze
          </a>

          <a
            href={`#`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${game.whattsap ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"} transition-all w-full text-center py-3 rounded-lg font-semibold pointer-events-none`}
          >
            Grupo no whatsapp (Em breve)
          </a>
        </div>
      </div>
    </div>
  );
}
