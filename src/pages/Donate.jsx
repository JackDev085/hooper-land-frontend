import { useState } from "react";
import { Heart, Copy, Check, Mail, Share2, Sparkles, QrCode } from "lucide-react";

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
      <div className="relative bg-linear-to-b from-orange-900/40 to-black py-24 px-6 pt-28 overflow-hidden">
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
          <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-wider text-center md:text-left">
            Faça Sua Doação
          </h2>

          <div className="bg-linear-to-br from-orange-900/30 to-red-900/20 rounded-3xl p-6 md:p-10 border-2 border-orange-600/30">
            <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
              Qualquer valor é super bem-vindo! Escolha a opção mais conveniente para você realizar a sua contribuição.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Coluna 1: QR Code */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 flex flex-col justify-between items-center text-center">
                <div className="w-full">
                  <h4 className="text-lg font-bold mb-3 text-orange-500 uppercase tracking-wider flex items-center justify-center gap-2">
                    <QrCode className="w-5 h-5" />
                    QR Code PIX
                  </h4>
                  <p className="text-sm text-gray-400 mb-6">
                    Aponte a câmera do celular no seu aplicativo de banco para escanear:
                  </p>
                </div>

                <div className="relative p-3 bg-white rounded-2xl w-48 h-48 mx-auto shadow-[0_0_25px_rgba(249,115,22,0.25)] hover:scale-105 transition-transform duration-300">
                  <img
                    src="/pix_qr_code.png"
                    alt="QR Code PIX"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div className="mt-4 text-xs text-gray-500 italic">
                  Escaneie pelo aplicativo de banco
                </div>
              </div>

              {/* Coluna 2: PIX Copia e Cola */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 flex flex-col justify-between text-center">
                <div>
                  <h4 className="text-lg font-bold mb-3 text-orange-500 uppercase tracking-wider flex items-center justify-center gap-2">
                    <Copy className="w-5 h-5" />
                    PIX Copie e Cola
                  </h4>
                  <p className="text-sm text-gray-400 mb-6">
                    Se estiver usando o celular, copie a chave e cole na área de PIX do seu banco:
                  </p>
                </div>

                {/* PIX field */}
                <div className="space-y-4">
                  <div className="bg-surface/50 rounded-xl p-3 border border-gray-700/50">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
                      Chave PIX (Aleatória)
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixKey}
                        className="flex-1 bg-surface text-white px-3 py-2 rounded-lg border border-gray-600 font-mono text-xs focus:outline-none"
                      />
                      <button
                        onClick={handleCopyPix}
                        className={`
                          px-4 py-2 rounded-lg font-bold text-sm
                          transition-all duration-300 
                          flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer
                          ${copied
                            ? "bg-green-600 hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                            : "bg-orange-600 hover:bg-orange-500 hover:shadow-glow hover:-translate-y-0.5"
                          }
                        `}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copiar
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-black/30 rounded-xl p-4 border border-gray-800/50">
                    <h5 className="font-bold text-orange-500 text-xs mb-2 uppercase tracking-wider">
                      Como Usar:
                    </h5>
                    <ol className="space-y-1.5 text-gray-300 text-xs list-decimal pl-4">
                      <li>Clique no botão "Copiar".</li>
                      <li>Abra seu aplicativo de banco e acesse a área PIX.</li>
                      <li>Escolha a opção "PIX Copia e Cola" ou cole a chave diretamente.</li>
                    </ol>
                  </div>
                </div>
              </div>
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
