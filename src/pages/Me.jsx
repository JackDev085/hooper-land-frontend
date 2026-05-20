import { useEffect, useState } from "react";
import api from "../services/api";
import { Mail, User, Sparkles } from "lucide-react";
import Skeleton from "../components/ui/Skeleton";

export default function Me() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeInfo() {
      try {
        const res = await api.get("/me");
        setMe(res.data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeInfo();
  }, []);

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
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-b from-orange-900/30 to-black pb-8">
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

        {/* Profile section */}
        <div className="max-w-4xl mx-auto px-6">
          {/* Avatar */}
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

          {/* User info */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {me.name}
            </h1>
            <p className="text-orange-500 text-lg font-semibold mb-4">
              @{me.username}
            </p>
            <p className="text-gray-400 text-center max-w-md mx-auto">
              🏀 Basquete é vida!
            </p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <h2 className="text-2xl font-extrabold mb-6 uppercase tracking-wider flex items-center gap-2">
          <Mail size={24} className="text-orange-500" />
          Contato
        </h2>
        <div className="space-y-4">
          <div
            className="
            group bg-surface rounded-2xl p-6 
            border border-gray-800 hover:border-orange-500/50 
            transition-all duration-300 cursor-pointer
            hover:shadow-glow hover:-translate-y-1
          "
          >
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-semibold">
              Email
            </p>
            <p className="text-white text-lg font-semibold group-hover:text-orange-500 transition-colors flex items-center gap-2">
              <Mail size={18} className="text-gray-500" />
              {me.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
