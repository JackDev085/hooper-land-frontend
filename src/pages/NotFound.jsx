import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-page">
      {/* Ambient glow */}
      <div className="not-found-glow" />

      <div className="not-found-content animate-fade-in-up">
        {/* Big 404 */}
        <h1 className="not-found-code">
          4<span className="not-found-ball">🏀</span>4
        </h1>

        <h2 className="not-found-title">Fora de quadra!</h2>

        <p className="not-found-text">
          A página que você procura não existe ou foi movida.
          <br />
          Volte para a quadra principal.
        </p>

        <Link to="/" className="not-found-btn group">
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-1"
          />
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
