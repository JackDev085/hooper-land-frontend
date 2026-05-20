import { Instagram, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-t from-black via-black to-neutral-950 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
              Ballers<span className="text-orange-500">085</span>
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Descubra treinos de basquete e locais de racha para elevar seu
              jogo.
            </p>
          </div>

          {/* Institutional Links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="text-white font-semibold mb-2">Institucional</h4>
            <Link to="/about" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
              Sobre Nós
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>

          {/* Connect/Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/jackson.lorran/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-orange-500/20 rounded-xl text-gray-400 hover:text-orange-500 transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:jackson.nasc20@gmail.com"
                className="p-3 bg-white/5 hover:bg-orange-500/20 rounded-xl text-gray-400 hover:text-orange-500 transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            {/* Support CTA */}
            <Link
              to="/support"
              className="flex items-center gap-2 px-4 py-2 bg-orange-600/20 hover:bg-orange-600 text-orange-400 hover:text-white rounded-xl text-sm font-medium transition-all duration-300"
            >
              <Heart size={16} className="animate-pulse" />
              Apoie o projeto
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {currentYear} Ballers085. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito com{" "}
              <Heart size={12} className="text-red-500 fill-current" /> para a
              comunidade do basquete
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
