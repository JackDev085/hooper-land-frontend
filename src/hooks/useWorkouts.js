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
        setWorkouts(response.data);
      } catch (err) {
        console.error("Erro ao buscar treinos:", err);
        setError(err);
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
    setFilteredWorkouts(filtered);
  }, [category, workouts, searchQuery]);

  return { workouts, filteredWorkouts, loading, error };
}
