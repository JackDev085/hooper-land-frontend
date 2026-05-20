import React from "react";

export default function Privacy() {
  return (
    <div className="w-full min-h-screen bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-8 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold uppercase text-orange-500 mb-8">
          Política de Privacidade
        </h1>
        
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como as suas informações pessoais são coletadas, usadas e compartilhadas quando você visita ou utiliza o site Ballers085 (o "Site").
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Informações Pessoais que Coletamos</h2>
          <p>
            Quando você visita o Site, coletamos automaticamente determinadas informações sobre o seu dispositivo, incluindo informações sobre o seu navegador, endereço IP, fuso horário e alguns dos cookies instalados no seu dispositivo. Além disso, à medida que você navega no Site, coletamos informações sobre páginas da web individuais ou produtos que você visualiza.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Uso dos seus Dados</h2>
          <p>
            Usamos as Informações Pessoais que coletamos para nos comunicarmos com você; rastrear possíveis riscos ou fraudes e, quando de acordo com as preferências que você compartilhou conosco, fornecer informações ou publicidade relacionadas aos nossos produtos ou serviços.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Compartilhamento e Publicidade</h2>
          <p>
            Poderemos compartilhar suas informações com terceiros que nos ajudam a utilizar suas informações. Por exemplo, utilizamos o Google AdSense para exibir anúncios relevantes ao nosso público esportivo. Você pode ler mais sobre como o Google usa suas Informações Pessoais através de suas políticas de termos de serviço do AdSense.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Seus Direitos</h2>
          <p>
            Se você é um residente europeu ou brasileiro sob a LGPD, você tem o direito de acessar as informações pessoais que mantemos sobre você. Se você quiser exercer esse direito, por favor entre em contato conosco através dos nossos e-mails de suporte.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Atualizações</h2>
          <p>
            Podemos atualizar esta política de privacidade periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
          </p>
        </div>
      </div>
    </div>
  );
}
