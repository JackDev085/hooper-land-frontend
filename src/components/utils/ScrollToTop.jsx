import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente que rola a página para o topo sempre que a rota muda.
 * Deve ser colocado dentro do Router.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
