import "./index.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { registerPushNotifications } from "./utils/notifications";

// NAVBAR E FOOTER GLOBAIS + BREADCRUMB DINÂMICO
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      registerPushNotifications();
    }
  }, [user]);
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
