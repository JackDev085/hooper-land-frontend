import { useEffect, useState } from "react";
import api from "../services/api";
import { Mail, User, Sparkles, Edit2, Save, X, Instagram, FileText } from "lucide-react";
import Skeleton from "../components/ui/Skeleton";
import { useAuth } from "../context/AuthContext";

export default function Me() {
  const { updateUser } = useAuth();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Estado do formulário de edição
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instagram: ""
  });

  useEffect(() => {
    async function fetchMeInfo() {
      try {
        const res = await api.get("/me");
        setMe(res.data);
        // Inicializa o formulário com os dados carregados
        setFormData({
          name: res.data.name || "",
          description: res.data.description || "",
          instagram: res.data.instagram || ""
        });
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeInfo();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Se cancelando, reseta para os dados originais
      setFormData({
        name: me.name || "",
        description: me.description || "",
        instagram: me.instagram || ""
      });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await api.put("/me", formData);
      setMe(response.data);
      // Atualiza o estado global de autenticação
      updateUser(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      alert("Houve um erro ao salvar o perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        {/* Header skeleton */}
        <div className="relative bg-gradient-to-b from-orange-900/30 to-black pb-8">
          <div className="h-40 bg-gradient-to-r from-orange-600/30 to-red-700/30" />
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative -mt-20 mb-6 flex flex-col items-center">
              <Skeleton variant="avatar" className="w-40 h-40 mb-4" />
              <Skeleton variant="title" className="w-48 mb-2" />
              <Skeleton variant="text" className="w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <User size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-xl text-red-500">Erro ao carregar perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-16">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-b from-orange-900/20 to-black pb-8">
        {/* Cover photo with pattern */}
        <div className="relative h-44 bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Profile avatar section */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative -mt-20 mb-6 flex flex-col items-center">
            <div className="relative group">
              {/* Animated ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-glow" />

              {/* Avatar container */}
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-1">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-5xl font-bold">
                  {me.username?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-1 -right-1 p-2 bg-orange-600 rounded-full shadow-glow">
                <Sparkles size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* User Display Info or Edit Form */}
          <div className="max-w-xl mx-auto">
            {!isEditing ? (
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                  {me.name}
                </h1>
                <p className="text-orange-500 text-lg font-semibold mb-4">
                  @{me.username}
                </p>
                <p className="text-gray-300 text-center text-base max-w-md mx-auto italic mb-6">
                  {me.description || "🏀 Adicione uma descrição ao seu perfil..."}
                </p>
                <button
                  onClick={handleEditToggle}
                  className="
                    cursor-pointer inline-flex items-center gap-2
                    bg-transparent border-2 border-gray-700 hover:border-orange-500
                    hover:text-orange-500 text-gray-400 font-bold px-6 py-2.5 rounded-xl
                    transition-all duration-300 hover:scale-105
                  "
                >
                  <Edit2 size={16} />
                  Editar Perfil
                </button>
              </div>
            ) : (
              <form onSubmit={handleSave} className="bg-surface border border-gray-800 rounded-2xl p-6 md:p-8 mb-8 space-y-5 animate-fade-in shadow-glow">
                <h3 className="text-lg font-bold uppercase tracking-wider text-orange-500 mb-2 border-b border-gray-800 pb-3">
                  Editar Informações
                </h3>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                    <User size={14} /> Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white placeholder-gray-600"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* Instagram Input */}
                <div className="space-y-1.5">
                  <label htmlFor="instagram" className="text-xs uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                    <Instagram size={14} /> Usuário do Instagram
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
                      @
                    </span>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 pl-8 pr-4 text-sm transition-all text-white placeholder-gray-600"
                      placeholder="seu_usuario"
                    />
                  </div>
                </div>

                {/* Description Input */}
                <div className="space-y-1.5">
                  <label htmlFor="description" className="text-xs uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                    <FileText size={14} /> Descrição / Bio
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white placeholder-gray-600 resize-none"
                    placeholder="Conte sobre você, suas posições preferidas na quadra, locais de treino, etc."
                  />
                </div>

                {/* Actions buttons */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="
                      cursor-pointer flex items-center gap-2
                      border-2 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white
                      px-4 py-2.5 rounded-xl font-semibold text-sm transition-all
                    "
                  >
                    <X size={16} /> Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      cursor-pointer flex items-center gap-2
                      bg-orange-600 hover:bg-orange-700 text-white shadow-glow
                      px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50
                    "
                  >
                    <Save size={16} /> {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="max-w-4xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact/Basic Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold uppercase tracking-wider flex items-center gap-2">
            <Mail size={24} className="text-orange-500" />
            Dados Básicos
          </h2>
          <div className="space-y-4">
            <div className="bg-surface rounded-2xl p-6 border border-gray-800">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-semibold">
                Email
              </p>
              <p className="text-white text-lg font-semibold flex items-center gap-2">
                <Mail size={18} className="text-gray-500" />
                {me.email}
              </p>
            </div>
          </div>
        </div>

        {/* Social / Instagram section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold uppercase tracking-wider flex items-center gap-2">
            <Instagram size={24} className="text-orange-500" />
            Redes Sociais
          </h2>
          <div className="space-y-4">
            <div className="bg-surface rounded-2xl p-6 border border-gray-800">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-semibold">
                Instagram
              </p>
              {me.instagram ? (
                <a
                  href={`https://instagram.com/${me.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group text-white text-lg font-semibold flex items-center gap-2 
                    hover:text-orange-500 transition-colors
                  "
                >
                  <Instagram size={18} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                  @{me.instagram}
                </a>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  Nenhum Instagram adicionado
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
