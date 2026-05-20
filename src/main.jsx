import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Componentes essenciais (carregados sync — acima do fold)
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";

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

// Fallback mínimo para Suspense (CSS spinner, sem GIF pesado)
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="loading-spinner" aria-label="Carregando..." />
    </div>
  );
}

// Configure as rotas
const router = createBrowserRouter([
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
