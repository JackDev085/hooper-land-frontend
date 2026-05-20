import "./index.css";
import { Outlet } from "react-router-dom";

// NAVBAR E FOOTER GLOBAIS + BREADCRUMB DINÂMICO
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="bg-black pb-16 md:pb-0 min-h-screen">
        {/* pb-16 para dar espaço ao BottomNav no mobile */}
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default App;
