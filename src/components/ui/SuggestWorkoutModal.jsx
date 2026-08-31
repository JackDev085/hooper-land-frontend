import { useState } from "react";
import { X, Lightbulb, Check, Sparkles, Send } from "lucide-react";
import api from "../../services/api";

export default function SuggestWorkoutModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Livre");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/workouts/suggest", {
        title,
        description,
        category
      });
      setSuccess("Sua sugestão de treino foi enviada com sucesso aos treinadores! 🏀");
      setTitle("");
      setDescription("");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Erro ao enviar sugestão. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-2xl">
            <Lightbulb size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold uppercase text-white flex items-center gap-2">
              Sugerir Novo Treino
              <span className="text-[10px] bg-orange-600/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-mono">
                PRO
              </span>
            </h3>
            <p className="text-xs text-gray-400">
              Membros Premium têm acesso direto à equipe para pedir novos treinos e focos específicos.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Título do Treino Sugerido
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Treino de Arremesso Após Drible"
              className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Categoria Preferida
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-xs text-white"
            >
              <option value="Casa">Casa 🏠</option>
              <option value="Academia">Academia 🏢</option>
              <option value="Quadra">Quadra 🏀</option>
              <option value="Livre">Livre 🌳</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Descrição & Exercícios Desejados
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explique os focos que você gostaria de treinar (ex: movimentação sem bola, controle de bola com duas mãos, explosão de primeiro passo...)"
              className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 resize-none"
            />
          </div>

          {success && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
              <Check size={16} /> {success}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-950/80 border border-red-500/40 text-red-300 text-xs rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-50"
          >
            <Send size={14} />
            {loading ? "Enviando..." : "Enviar Sugestão"}
          </button>
        </form>
      </div>
    </div>
  );
}
