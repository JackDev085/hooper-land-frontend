import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Componentes essenciais (carregados sync — acima do fold)
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import ScrollToTop from "./components/utils/ScrollToTop";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";

// Captura erros de chunk load e força recarregamento do app para trazer a versão nova do deploy
window.addEventListener("error", (e) => {
  const isChunkError = e.message && (
    e.message.includes("ChunkLoadError") ||
    e.message.includes("Loading chunk") ||
    e.message.includes("Failed to fetch dynamically imported module")
  );
  if (isChunkError) {
    console.warn("Erro de carregamento de módulo/chunk. Recarregando a página...");
    window.location.reload();
  }
}, true);

// Lazy load de todas as páginas (code splitting automático)
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Workouts = lazy(() => import("./pages/Workouts.jsx"));
const NeuroCognition = lazy(() => import("./pages/NeuroCognition.jsx"));
const Exercises = lazy(() => import("./pages/Exercises.jsx"));
const Games = lazy(() => import("./pages/Games.jsx"));
const GameDetail = lazy(() => import("./pages/GamesDetail.jsx"));
const Me = lazy(() => import("./pages/Me.jsx"));
const Donate = lazy(() => import("./pages/Donate.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const UserDash = lazy(() => import("./pages/UserDash.jsx"));

// Fallback mínimo para Suspense (CSS spinner, sem GIF pesado)
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="loading-spinner" aria-label="Carregando..." />
    </div>
  );
}

// Layout imersivo — sem Navbar, Footer ou BottomNav
function PlayerLayout() {
  return (
    <>
      <ScrollToTop />
      <main className="bg-black min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

// Configure as rotas
const router = createBrowserRouter([
  // Layout principal (com Navbar + Footer + BottomNav)
  {
    path: "/",
    element: <App />,
    errorElement: (
      <>
        <Navbar />
        <main className="bg-black pb-16 md:pb-0 min-h-screen">
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        </main>
        <Footer />
        <BottomNav />
      </>
    ),
    children: [
      {
        path: "auth",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: "/", // Rota padrão para Home
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
        index: true,
      },
      {
        path: "workouts",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Workouts />
          </Suspense>
        ),
      },
      {
        path: "neuro-cognition",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NeuroCognition />
          </Suspense>
        ),
      },
      {
        path: "exercises",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Exercises />
          </Suspense>
        ),
      },
      {
        path: "games",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Games />
          </Suspense>
        ),
      },
      {
        path: "game/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <GameDetail />
          </Suspense>
        ),
      },
      {
        path: "me",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <Me />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Suspense fallback={<PageLoader />}>
              <Admin />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "dash",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <UserDash />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "support",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Donate />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Privacy />
          </Suspense>
        ),
      },
      {
        path: "terms",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
