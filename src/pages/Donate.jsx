import { useState } from "react";
import { Heart, Copy, Check, Mail, Share2, Sparkles } from "lucide-react";

export default function Donate() {
  const [shareMessage, setShareMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Ballers085",
      text: "Confira o Ballers085 - Treinos e rachas de basquete!",
      url: "https://ballers085.vercel.app",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareMessage("Link copiado!");
        setTimeout(() => setShareMessage(""), 2000);
      }
    } catch (err) {
      console.error("Erro ao compartilhar:", err);
    }
  };

  const pixKey = "3fe461ef-92f5-4eb7-842c-dd0773f04e76";

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const reasons = [
    {
      emoji: "💪🏼",
      title: "Novos Treinos",
      description:
        "Sua contribuição ajuda a serem criados novos treinos.",
    },
    {
      emoji: "🚀",
      title: "Novas Funcionalidades",
      description:
        "Seu apoio nos ajuda a desenvolver novas features e melhorias.",
    },
    {
      emoji: "💡",
      title: "Suas Sugestões",
      description: "Apoiadores ganham voz ativa no desenvolvimento do projeto.",
    },
    {
      emoji: "🎯",
      title: "Comunidade Melhor",
      description:
        "Mais recursos para manter servidores rápidos e adicionar treinos.",
    },
    {
      emoji: "🏆",
      title: "Reconhecimento",
      description: "Apoiadores são creditados e ganham acesso antecipado.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-orange-900/40 to-black py-24 px-6 pt-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-500/20 rounded-2xl animate-pulse-glow">
              <Heart
                className="w-12 h-12 text-orange-500"
                fill="currentColor"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-wider">
            Apoie o Projeto
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            O <span className="text-orange-500 font-bold">Ballers085</span> é
            um projeto desenvolvido gratuitamente para ajudar atletas e
            entusiastas do basquete a melhorarem seu desempenho.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Why support */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-wider flex items-center gap-3">
            <Sparkles className="text-orange-500" />
            Por que Apoiar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="
                  group bg-surface rounded-2xl p-8 
                  border border-gray-800 hover:border-orange-500/50 
                  transition-all duration-500
                  hover:shadow-glow hover:-translate-y-1
                  animate-fade-in-up
                "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {reason.emoji}
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-500">
                  {reason.title}
                </h3>
                <p className="text-gray-400">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PIX Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-wider">
            Faça Sua Doação
          </h2>

          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/20 rounded-3xl p-8 md:p-12 border-2 border-orange-600/30">
            <h3 className="text-2xl font-bold mb-4 text-center">
              PIX Cópia e Cola
            </h3>
            <p className="text-gray-300 text-center mb-8">
              Qualquer valor é bem-vindo! Sua contribuição nos motiva a
              continuar.
            </p>

            {/* PIX field */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">
                Chave PIX (Aleatória)
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  readOnly
                  value={pixKey}
                  className="flex-1 bg-surface text-white px-4 py-3 rounded-xl border border-gray-700 font-mono text-sm"
                />
                <button
                  onClick={handleCopyPix}
                  className={`
                    px-6 py-3 rounded-xl font-bold 
                    transition-all duration-300 
                    flex items-center justify-center gap-2 whitespace-nowrap
                    ${copied
                      ? "bg-green-600 hover:bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                      : "bg-orange-600 hover:bg-orange-500 hover:shadow-glow hover:-translate-y-0.5"
                    }
                  `}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-black/30 rounded-xl p-6 border border-gray-800/50">
              <h4 className="font-bold text-orange-500 mb-4 uppercase tracking-wider">
                Como Enviar:
              </h4>
              <ol className="space-y-3 text-gray-300 text-sm">
                {[
                  'Copie a chave PIX acima clicando no botão "Copiar"',
                  "Abra seu app de banco e vá para a opção PIX",
                  "Cole a chave, defina o valor e confirme",
                  "Pronto! Obrigado pelo apoio! 🙏",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Other ways */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-wider">
            Outras Formas de Contribuir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-surface rounded-2xl p-8 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 text-center hover:shadow-glow hover:-translate-y-1">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3">Compartilhe</h3>
              <p className="text-gray-400 mb-6">
                Divulgue o projeto com seus amigos
              </p>
              <button
                onClick={handleShare}
                className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-surface-elevated hover:bg-gray-800 rounded-xl transition-all font-medium"
              >
                <Share2 size={18} />
                {shareMessage || "Compartilhar"}
              </button>
            </div>

            <div className="group bg-surface rounded-2xl p-8 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 text-center hover:shadow-glow hover:-translate-y-1">
              <div className="text-4xl mb-4">💌</div>
              <h3 className="text-xl font-bold mb-3">Envie Sugestões</h3>
              <p className="text-gray-400 mb-6">
                Suas ideias são valiosas para nós
              </p>
              <a
                href="mailto:jackson.nasc20@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-elevated hover:bg-gray-800 rounded-xl transition-all font-medium"
              >
                <Mail size={18} />
                Enviar Email
              </a>
            </div>
          </div>
        </section>

        {/* Thanks */}
        <section className="text-center py-16 border-t border-gray-800">
          <h2 className="text-3xl font-extrabold mb-6 text-orange-500">
            Obrigado pelo Apoio! 🙏
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Cada apoiador faz diferença e nos motiva a criar um projeto cada vez
            melhor. Você é parte essencial do sucesso do Ballers085!
          </p>
          <div className="text-6xl animate-float">❤️</div>
        </section>
      </div>
    </div>
  );
}
