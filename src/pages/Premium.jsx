import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Crown, Check, QrCode, Copy, CheckCircle2, MessageCircle, Instagram, ArrowRight, Sparkles, TrendingUp, Lightbulb, X, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Premium() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const PIX_KEY = "d3406d6b-d895-48b0-ae2c-b925d6df7f64";
  const WHATSAPP_NUMBER = "5585986667136";
  const INSTAGRAM_HANDLE = "jackson.lorran";

  const plans = [
    {
      id: 1,
      months: 1,
      name: "1 Mês",
      price: "R$ 7,00",
      numericPrice: 7,
      perMonth: "R$ 7,00/mês",
      badge: "Iniciante",
      badgeColor: "bg-gray-800 text-gray-300 border-gray-700",
      savings: null,
    },
    {
      id: 2,
      months: 2,
      name: "2 Meses",
      price: "R$ 12,00",
      numericPrice: 12,
      perMonth: "R$ 6,00/mês",
      badge: "Economia",
      badgeColor: "bg-blue-900/40 text-blue-400 border-blue-500/30",
      savings: "Economize R$ 2,00",
    },
    {
      id: 3,
      months: 3,
      name: "3 Meses",
      price: "R$ 17,00",
      numericPrice: 17,
      perMonth: "R$ 5,66/mês",
      badge: "Mais Popular 🔥",
      badgeColor: "bg-orange-600 text-white font-extrabold shadow-glow",
      savings: "Economize R$ 4,00",
      highlight: true,
    },
  ];

  const handleSelectPlan = (plan) => {
    if (!user) {
      navigate("/auth?redirect=/premium");
      return;
    }
    setSelectedPlan(plan);
    setCopiedKey(false);
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const getWhatsappUrl = (plan) => {
    const username = user?.username || "seu_usuario";
    const text = `Oi! Realizei o pagamento PIX do Ballers085 Premium (${plan ? plan.name + ' - ' + plan.price : 'Plano'}). Meu usuário é: @${username}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 sm:px-6 md:px-16 py-20 pt-24 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* HERO HEADER */}
        <div className="text-center space-y-4 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Crown size={14} className="text-orange-500 fill-orange-500" />
            Seja Ballers085 Premium
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Eleve seu nível no basquete com <span className="text-orange-500">Recursos Exclusivos</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Desbloqueie o Dashboard completo de evolução do atleta, treinos de impulsão, sugestão direta de treinos e acesso antecipado a novos lançamentos.
          </p>

          {/* STATUS ATUAL DO USUÁRIO */}
          {user?.premium && (
            <div className="bg-orange-950/40 border border-orange-500/40 rounded-2xl p-5 max-w-lg mx-auto text-left shadow-glow">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-600 rounded-xl text-white">
                  <Crown size={22} className="fill-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Sua assinatura Premium está ATIVA! ✨</h3>
                  <p className="text-xs text-orange-300/80">
                    Comprado em: <span className="font-mono text-white">{user.premium_purchased_at || "Recente"}</span>
                  </p>
                  <p className="text-xs text-orange-300/80">
                    Válido até: <span className="font-mono text-white font-bold">{user.premium_expires_at || "Ativo"}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BENEFÍCIOS DESTACADOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-gray-800 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
              <TrendingUp size={24} />
            </div>
            <h3 className="font-bold text-lg text-white">Dashboard de Métricas</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Gráficos completos de taxa de acerto de arremessos, histórico de partidas e hábitos dos atletas.
            </p>
          </div>

          <div className="bg-surface border border-gray-800 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles size={24} />
            </div>
            <h3 className="font-bold text-lg text-white">Acesso Antecipado</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Experimente novos programas de treino, séries de impulsão e ferramentas antes do lançamento geral.
            </p>
          </div>

          <div className="bg-surface border border-gray-800 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Lightbulb size={24} />
            </div>
            <h3 className="font-bold text-lg text-white">Sugerir Novos Treinos</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Envie sugestões diretas de rotinas e exercícios para a equipe técnica criar e publicar na plataforma.
            </p>
          </div>
        </div>

        {/* PLANOS E PREÇOS */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Escolha o seu plano de acesso</h2>
            <p className="text-xs text-gray-400">Pagamento instantâneo via PIX (QR Code ou Chave Aleatória)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border ${
                  plan.highlight
                    ? "bg-surface border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.2)] md:-translate-y-2"
                    : "bg-surface/60 border-gray-800 hover:border-gray-700"
                }`}
              >
                {/* BADGE DO PLANO */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                  {plan.savings && (
                    <span className="text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md">
                      {plan.savings}
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div>
                    <div className="text-3xl font-black text-white">{plan.price}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{plan.perMonth}</div>
                  </div>

                  <ul className="space-y-2.5 pt-2 text-xs text-gray-300 border-t border-gray-800/80">
                    <li className="flex items-center gap-2 font-bold text-orange-400">
                      <Check size={14} className="text-orange-500 shrink-0" />
                      Dashboard Completo de Métricas
                    </li>
                    <li className="flex items-center gap-2 font-bold text-amber-300">
                      <Check size={14} className="text-amber-400 shrink-0" />
                      Acesso Antecipado a Novos Treinos
                    </li>
                    <li className="flex items-center gap-2 font-bold text-amber-300">
                      <Check size={14} className="text-amber-400 shrink-0" />
                      Formulário de Sugestão de Treino
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-500 shrink-0" />
                      Treinos de Impulsão Liberados
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-500 shrink-0" />
                      Neurocognição Nível Difícil & Lenda
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-500 shrink-0" />
                      Tempo de Troca Personalizado
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.highlight
                      ? "bg-orange-600 hover:bg-orange-500 text-white shadow-glow hover:shadow-orange-500/40"
                      : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                  }`}
                >
                  <QrCode size={16} />
                  Pagar via PIX ({plan.price})
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* INFORMAÇÕES DE ATIVAÇÃO MANUAL */}
        <div className="bg-surface/40 border border-gray-800 rounded-2xl p-6 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-xs">
            <div className="flex items-center gap-2 font-semibold text-gray-300">
              <QrCode size={18} className="text-green-500" />
              Pagamento direto via QR Code ou Chave PIX
            </div>
            <div className="flex items-center gap-2 font-semibold text-gray-300">
              <ShieldCheck size={18} className="text-orange-500" />
              Liberação direta pela equipe Ballers085
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DO PIX */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
            {/* Fechar Modal */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Cabeçalho do Modal */}
            <div className="text-center space-y-1">
              <span className="px-3 py-1 bg-orange-600/10 border border-orange-500/30 text-orange-400 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                {selectedPlan.name} — {selectedPlan.price}
              </span>
              <h3 className="font-extrabold text-2xl text-white">Pagamento via PIX ⚡</h3>
              <p className="text-xs text-gray-400">Escaneie o QR Code abaixo ou copie a chave aleatória</p>
            </div>

            {/* Imagem do QR Code */}
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl max-w-[240px] mx-auto shadow-2xl border border-gray-200">
              <img
                src="/pix_qr_code.png"
                alt="QR Code PIX Ballers085"
                className="w-48 h-48 object-contain"
              />
              <span className="text-[10px] text-gray-700 font-mono font-bold mt-2">
                Valor: {selectedPlan.price}
              </span>
            </div>

            {/* Chave Aleatória PIX */}
            <div className="bg-black/60 border border-gray-800 rounded-2xl p-4 space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Chave PIX (Aleatória):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={PIX_KEY}
                  className="w-full bg-gray-900 border border-gray-700 text-orange-400 font-mono text-xs p-2.5 rounded-xl text-ellipsis overflow-hidden focus:outline-none"
                />
                <button
                  onClick={handleCopyPixKey}
                  className={`px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                    copiedKey
                      ? "bg-green-600 text-white"
                      : "bg-orange-600 hover:bg-orange-500 text-white shadow-glow"
                  }`}
                >
                  {copiedKey ? (
                    <>
                      <CheckCircle2 size={15} /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copiar Chave
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Passo a Passo para Ativação */}
            <div className="space-y-3 bg-gray-900/50 border border-gray-800 rounded-2xl p-4 text-xs text-gray-300">
              <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5 text-orange-400">
                📌 Passo a passo para ativar:
              </h4>
              <ol className="space-y-2 list-decimal list-inside text-gray-300 leading-relaxed">
                <li>
                  Realize o PIX de <strong className="text-white">{selectedPlan.price}</strong> usando o QR Code ou a Chave acima.
                </li>
                <li>
                  Envie a foto do comprovante informando o seu usuário (<strong className="text-orange-400 font-mono">@{user?.username}</strong>).
                </li>
                <li>
                  Após enviar o comprovante no WhatsApp ou Instagram, a equipe ativa seu acesso PRO no painel!
                </li>
              </ol>
            </div>

            {/* Botões de Envio do Comprovante */}
            <div className="space-y-2 pt-2">
              <a
                href={getWhatsappUrl(selectedPlan)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-all shadow-glow cursor-pointer"
              >
                <MessageCircle size={18} />
                Enviar Comprovante pelo WhatsApp (85 98666-7136)
              </a>

              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Instagram size={18} />
                Enviar Comprovante pelo Instagram (@jackson.lorran)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
