import React from "react";

export default function Terms() {
  return (
    <div className="w-full min-h-screen bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-8 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold uppercase text-orange-500 mb-8">
          Termos de Uso
        </h1>
        
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            Ao acessar o site <strong>Ballers085</strong>, o usuário adere aos termos de serviço, todas as leis e regulamentos aplicáveis. Você concorda que é responsável pelo cumprimento de todas as leis locais e leis desportivas. Se você não concordar em obedecer, está proibido de acessar este site.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Uso das Informações de Exercícios</h2>
          <p>
            A Ballers085 fornece tutoriais e treinamentos voltados ao basquete e rotinas físicas para atletas não-profissionais e entusiastas de esportes.
            Esses materiais não substituem o aconselhamento de profissionais médicos, educadores físicos ou fisioterapeutas. O uso de nosso conteúdo, a intensidade do seu treinamento e possíveis lesões são de sua inteira responsabilidade.
            Sempre indicamos que você faça um exame médico antes de começar atividades de impacto elevado como o basquete.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Uso de Licença</h2>
          <p>
            É concedida permissão para o uso dos recursos descritos em nosso site para treinos individuais. Isso não inclui a permissão para:
          </p>
          <ul className="list-disc pl-8 space-y-2 mt-2">
            <li>Modificar ou copiar os materiais de vídeo/áudio ou de cronômetros dos nossos cartões de exercícios;</li>
            <li>Usar o material para qualquer finalidade de monetização que não esteja expressamente aprovada por escrito (revender ou criar clubes de assinatura);</li>
            <li>Remover quaisquer direitos autorais das descrições ou vídeos que possam aparecer associados aos exercícios de basquete;</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Links de Terceiros e Publicidade</h2>
          <p>
            A Ballers085 não analisou todos os sites vinculados a ele e não é responsável pelo conteúdo dessas páginas de anunciantes (incluindo mas não limitado a links patrocinados usando a rede Google AdSense). A aparição de qualquer link não implica o endosso da plataforma.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Modificações nos Termos de Serviço</h2>
          <p>
            A plataforma pode revisar os termos do serviço do site a qualquer momento, sem notificação prévia. Usando este site, você declara estar de acordo com a versão vigente correspondente a esses termos de serviço voltados à comunidade do basquete.
          </p>
        </div>
      </div>
    </div>
  );
}
