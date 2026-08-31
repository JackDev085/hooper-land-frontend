import { useState, useEffect } from "react";
import api from "../services/api";

export default function useWorkouts({ category, searchQuery } = {}) {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/workouts");
        let apiData = response.data || [];

        const neuroWorkout = {
          id: 999,
          name: "Neurocognição: Drible por Comandos",
          desc: "Treino cognitivo dinâmico para tomadas de decisão rápidas sob comandos de voz de drible, pernada e raquetada.",
          duration: "Ajustável",
          category: "Livre",
          slug: "neuro-cognition",
          premium: true
        };

        if (!apiData.some(w => w.id === 999 || w.slug === "neuro-cognition")) {
          apiData = [neuroWorkout, ...apiData];
        }

        setWorkouts(apiData);
      } catch (err) {
        console.error("Erro ao buscar treinos:", err);
        const localFallbacks = [
          {
            id: 999,
            name: "Neurocognição: Drible por Comandos",
            desc: "Treino cognitivo dinâmico para tomadas de decisão rápidas sob comandos de voz de drible, pernada e raquetada.",
            duration: "Ajustável",
            category: "Livre",
            slug: "neuro-cognition",
            premium: true
          },
        ];
        setWorkouts(localFallbacks);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    const filtered = workouts.filter((workout) => {
      const matchesCategory = category && category.toLowerCase() !== "todos"
        ? workout.category.toLowerCase() === category.toLowerCase()
        : true;
      const matchesSearch = searchQuery
        ? workout.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });

    // Coloca os treinos PRO / Premium no topo da lista
    const isPro = (w) => {
      const isImpulsao = w.name?.toLowerCase().includes("impuls");
      const isNeuro = w.id === 999 || w.slug === "neuro-cognition";
      return Boolean(w.premium || isImpulsao || isNeuro);
    };

    const sorted = [...filtered].sort((a, b) => {
      const aPro = isPro(a);
      const bPro = isPro(b);
      if (aPro && !bPro) return -1;
      if (!aPro && bPro) return 1;
      return 0;
    });

    setFilteredWorkouts(sorted);
  }, [category, workouts, searchQuery]);


  return { workouts, filteredWorkouts, loading, error };
}
