import React from "react";

export default function About() {
  return (
    <div className="w-full min-h-screen bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-8 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold uppercase text-orange-500 mb-8">
          Sobre Nós
        </h1>
        
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            Bem-vindo à <strong>Ballers085</strong>, a plataforma definitiva criada por e para apaixonados por basquete. Nós entendemos a dificuldade que os jogadores amadores e aspirantes a profissionais enfrentam na hora de encontrar treinos estruturados, dicas de fundamentos e uma comunidade unida. Nossa missão é democratizar o acesso ao treinamento de alto nível.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Nossa História</h2>
          <p>
            A ideia da Ballers085 surgiu nas quadras de rua, onde percebemos que o talento sobra, mas o direcionamento técnico muitas vezes falta. Muitos jogadores querem evoluir seus arremessos, melhorar o controle de bola (ball handling) e aprimorar o condicionamento físico, mas não sabem por onde começar. Em vez de depender de vídeos soltos na internet, decidimos criar um ambiente centralizado, com rotinas de treino para diferentes tipos de ambientes: casa, academia, quadra e espaços livres.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">O Que Oferecemos</h2>
          <p>
            Na Ballers085, nós estruturamos exercícios focados nas mecânicas reais de jogo. Oferecemos catálogos detalhados de treinos de pivô, alas e armadores. Nosso sistema permite que você acompanhe o que precisa ser feito no dia, com séries, repetições e descrições claras, minimizando o risco de lesões e maximizando a performance esportiva.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Nossa Visão</h2>
          <p>
            Queremos ser o maior hub de desenvolvimento de basquete do Brasil e do mundo para o atleta não-profissional. Acreditamos que o esporte transforma vidas, ensina disciplina, trabalho em equipe e resiliência. A Ballers085 não é apenas um aplicativo, é um movimento para elevar o nível do basquete jogado nos rachas de fim de semana, nas ligas amadoras e nas competições de base.
          </p>
          <p>
            Junte-se a nós. Eleve o seu jogo com a Ballers085.
          </p>
        </div>
      </div>
    </div>
  );
}
