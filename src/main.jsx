import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Componentes essenciais (carregados sync — acima do fold)
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import ScrollToTop from "./components/utils/ScrollToTop";

// Lazy load de todas as páginas (code splitting automático)
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Workouts = lazy(() => import("./pages/Workouts.jsx"));
const Exercises = lazy(() => import("./pages/Exercises.jsx"));
const Games = lazy(() => import("./pages/Games.jsx"));
const GameDetail = lazy(() => import("./pages/GamesDetail.jsx"));
const Me = lazy(() => import("./pages/Me.jsx"));
const Donate = lazy(() => import("./pages/Donate.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const ExercisePlayer = lazy(() => import("./pages/ExercisePlayer.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

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
      {/*
        path: "exercises",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Exercises />
          </Suspense>
        ),
        */
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
          <Suspense fallback={<PageLoader />}>
            <Me />
          </Suspense>
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
  // Layout imersivo (sem Navbar/Footer — experiência de player)
  {
    path: "/",
    element: <PlayerLayout />,
    children: [
      {
        path: "exercises",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExercisePlayer />
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
