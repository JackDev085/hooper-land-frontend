import { useState, useEffect } from "react";
import WorkoutCard from "../components/ui/WorkoutCard";
import { SkeletonCard } from "../components/ui/Skeleton";
import api from "../services/api";

export default function WorkoutHandler({ category, searchQuery }) {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token ausente. Redirecionando para login.");
        window.location.href = "/";
        return;
      }

      try {
        const response = await api.get("/workouts");
        setWorkouts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    // Filtra os treinos com base na categoria ativa e busca
    const filtered = workouts.filter((workout) => {
      const matchesCategory = workout.category === category;
      const matchesSearch = searchQuery
        ? workout.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
    setFilteredWorkouts(filtered);
  }, [category, workouts, searchQuery]);

  return (
    <>
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : filteredWorkouts.length > 0 ? (
        filteredWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))
      ) : (
        <span className="sem_treino col-span-full text-center text-gray-500 py-12">
          ❌ Sem treinos para essa categoria
        </span>
      )}
    </>
  );
}
