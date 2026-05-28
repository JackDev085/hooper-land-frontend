import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home as HomeIcon,
  Dumbbell,
  MapPin,
  TreeDeciduous,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  // Categorias com ícones SVG em vez de imagens pesadas
  const categories = [
    {
      name: "Em casa",
      icon: HomeIcon,
      gradient: "from-blue-600 to-blue-800",
      description: "Exercícios simples, apenas com o peso corporal.",
    },
    {
      name: "Na academia",
      icon: Dumbbell,
      gradient: "from-gray-600 to-gray-800",
      description: "Exercícios com equipamentos de academia.",
    },
    {
      name: "Na quadra",
      icon: MapPin,
      gradient: "from-orange-600 to-orange-800",
      description: "Práticas na quadra.",
    },
    {
      name: "Ao ar Livre",
      icon: TreeDeciduous,
      gradient: "from-green-600 to-green-800",
      description: "Exercícios ao ar livre.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-dvh flex items-center justify-center overflow-hidden">
        {/* Background image with parallax effect */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(min-width: 768px)" srcSet="/hero-c.webp" type="image/webp" />
          <source srcSet="/hero-m.webp" type="image/webp" />
          <img
            src="/hero-m.webp"
            alt="Basketball Training"
            className="w-full h-full object-cover"
            loading="lazy"
            fetchPriority="high"
            width={640}
            height={960}
            decoding="sync"
          />
        </picture>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 pt-20">
          <div className="animate-fade-in-up">
            {/* Badge 
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 backdrop-blur-sm rounded-full text-orange-400 text-sm font-medium mb-6">
              <Sparkles size={16} />
              Plataforma de treinos de basquete
            </div>
            */}

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 uppercase tracking-tight">
              Eleve Seu <span className="text-gradient">Jogo</span>
            </h1>



            <video className="rounded-md mb-4 md:hidden" autoPlay loop muted playsInline>
              <source fetchPriority="high" src="hero.webm" type="video/webm" />
            </video>

            <p className="text-lg italic md:text-xl max-w-2xl mx-auto mb-10 text-gray-300 leading-relaxed">
              "Treinos para quem não tem ideia do que treinar. Essa é a premissa
              do{" "}
              <span className="text-orange-500 font-semibold">Ballers085"</span>
              .
            </p>

            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auth?r=true"
                  className="
                    group px-8 py-4 bg-orange-600 hover:bg-orange-500 
                    rounded-xl font-bold text-lg 
                    transition-all duration-300
                    hover:shadow-glow hover:-translate-y-1
                    flex items-center justify-center gap-2
                  "
                >
                  Começar agora
                  <ChevronRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/auth"
                  className="
                    px-8 py-4 border-2 border-white/30 hover:border-white 
                    hover:bg-white hover:text-black
                    rounded-xl font-bold text-lg 
                    transition-all duration-300
                    hover:-translate-y-1
                  "
                >
                  Já tenho conta
                </Link>
              </div>
            ) : (
              <div className="flex gap-4 justify-center">
                <Link
                  to="/workouts"
                  className="
                    group px-8 py-4 bg-orange-600 hover:bg-orange-500 
                    rounded-xl font-bold text-lg 
                    transition-all duration-300
                    hover:shadow-glow hover:-translate-y-1
                    flex items-center gap-2
                  "
                >
                  Ver treinos
                  <ChevronRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator 
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
        */}
      </section>

      {/* SOBRE SECTION */}
      <section className="py-24 px-6 md:px-20 bg-black" id="sobre">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">
            A Importância de Saber o{" "}
            <span className="text-orange-500">que Treinar</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Sabemos que
            o maior desafio de muitos jogadores amadores e de rua não é a falta
            de esforço, mas sim a ausência de um direcionamento.
            Não saber quais os melhores exercícios ou a quantia
            ideal de repetições, muitas horas em quadra não geram a evolução que
            o jogador espera.
          </p>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Atualmente é difícil encontrar conteúdos de qualidade e de forma
            organizada que expliquem o passo a passo de como melhorar habilidades fundamentais
            no basquete.
          </p>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Aqui você encontrará treinos completos com
            descrições e vídeos para evoluir em diferentes aspectos do jogo.
          </p>
        </div>
      </section>

      {/* CATEGORIAS DE TREINO */}
      <section
        className="py-24 px-6 md:px-20 bg-gradient-to-b from-black via-neutral-950 to-black"
        id="treinos"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">
            Consigo treinar apenas na quadra?
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Claro que não! São vários ambientes para você escolher
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className={`
                    group relative rounded-2xl overflow-hidden cursor-pointer 
                    border border-gray-800 hover:border-orange-500/50
                    transition-all duration-500 ease-out
                    hover:shadow-glow hover:-translate-y-2
                    bg-gradient-to-br ${cat.gradient} 
                    p-8 h-56 flex flex-col items-center justify-center
                    animate-fade-in-up
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                  {/* Icon */}
                  <div className="relative z-10 p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                    <Icon size={36} strokeWidth={1.5} className="text-white" />
                  </div>

                  {/* Label */}
                  <span className="relative z-10 text-xl font-bold uppercase tracking-wide">
                    {cat.name}
                  </span>
                  <span className="relative z-10 text-sm text-white/70 mt-1 text-center">
                    {cat.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 px-6 md:px-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-orange-600 to-red-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.3),transparent)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase text-white">
            Pronto Para Começar?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/90">
            Acesse os treinos completos e dê o próximo passo na sua evolução.
          </p>
          {user ? (
            <Link
              to="/workouts"
              className="
                group inline-flex items-center gap-2
                px-10 py-5 bg-black text-white 
                rounded-xl text-lg font-bold 
                transition-all duration-300
                hover:bg-gray-900 hover:shadow-lg hover:-translate-y-1
              "
            >
              Ver treinos
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <Link
              to="/auth?r=true"
              className="
                group inline-flex items-center gap-2
                px-10 py-5 bg-black text-white 
                rounded-xl text-lg font-bold 
                transition-all duration-300
                hover:bg-gray-900 hover:shadow-lg hover:-translate-y-1
              "
            >
              Registre-se gratuitamente
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
