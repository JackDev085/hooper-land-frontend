import { useState, useEffect } from "react";
import api from "../services/api";
import { Users, Dumbbell, PlusCircle, Trash, Check, X, Shield, Star, ShieldAlert } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("users");

  // Estados de dados
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  // Estado formulário de Treino
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    description: "",
    category: "Livre"
  });
  const [submittingWorkout, setSubmittingWorkout] = useState(false);
  const [workoutSuccess, setWorkoutSuccess] = useState("");

  // Estado formulário de Exercícios
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const [exercisesList, setExercisesList] = useState([
    { name: "", reps: "", link_video: "" }
  ]);
  const [submittingExercises, setSubmittingExercises] = useState(false);
  const [exerciseSuccess, setExerciseSuccess] = useState("");

  // Carrega usuários e treinos
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "exercises" || activeTab === "workouts") {
      fetchWorkouts();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchWorkouts = async () => {
    setLoadingWorkouts(true);
    try {
      const res = await api.get("/workouts");
      setWorkouts(res.data);
      if (res.data.length > 0 && !selectedWorkoutId) {
        setSelectedWorkoutId(res.data[0].id.toString());
      }
    } catch (err) {
      console.error("Erro ao carregar treinos:", err);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  // Atualização administrativa de usuário
  const handleTogglePremium = async (username, currentPremium) => {
    try {
      const res = await api.put(`/users/${username}/admin-update`, {
        premium: !currentPremium
      });
      setUsers(users.map(u => u.username === username ? res.data : u));
    } catch (err) {
      console.error("Erro ao alterar premium:", err);
      alert("Erro ao alterar status premium.");
    }
  };

  const handleToggleRole = async (username, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (newRole === "user" && !window.confirm("Tem certeza que deseja remover as permissões de administrador deste usuário?")) {
      return;
    }
    try {
      const res = await api.put(`/users/${username}/admin-update`, {
        role: newRole
      });
      setUsers(users.map(u => u.username === username ? res.data : u));
    } catch (err) {
      console.error("Erro ao alterar permissão:", err);
      alert("Erro ao alterar permissão do usuário.");
    }
  };

  // Submit de Treino
  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    setSubmittingWorkout(true);
    setWorkoutSuccess("");
    try {
      await api.post("/workouts/", newWorkout);
      setWorkoutSuccess("Treino criado com sucesso!");
      setNewWorkout({ name: "", description: "", category: "Livre" });
      fetchWorkouts();
    } catch (err) {
      console.error("Erro ao criar treino:", err);
      alert("Erro ao criar treino.");
    } finally {
      setSubmittingWorkout(false);
    }
  };

  // Manipulação de múltiplos exercícios
  const handleExerciseChange = (index, field, value) => {
    const updated = [...exercisesList];
    updated[index][field] = value;
    setExercisesList(updated);
  };

  const addExerciseRow = () => {
    setExercisesList([...exercisesList, { name: "", reps: "", link_video: "" }]);
  };

  const removeExerciseRow = (index) => {
    if (exercisesList.length === 1) return;
    setExercisesList(exercisesList.filter((_, idx) => idx !== index));
  };

  // Submit de Exercícios
  const handleCreateExercises = async (e) => {
    e.preventDefault();
    if (!selectedWorkoutId) {
      alert("Selecione um treino primeiro!");
      return;
    }
    setSubmittingExercises(true);
    setExerciseSuccess("");
    try {
      await api.post(`/exercises/?workout_id=${selectedWorkoutId}`, exercisesList);
      setExerciseSuccess("Exercícios adicionados com sucesso ao treino!");
      setExercisesList([{ name: "", reps: "", link_video: "" }]);
    } catch (err) {
      console.error("Erro ao adicionar exercícios:", err);
      alert("Erro ao adicionar exercícios. Verifique os campos.");
    } finally {
      setSubmittingExercises(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-2 flex items-center gap-2">
          <Shield className="text-orange-500" />
          Painel de Controle
        </h1>
        <p className="text-gray-400 text-sm mb-8">Administração geral do Ballers085</p>

        {/* Abas */}
        <div className="flex border-b border-gray-800 gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("users")}
            className={`cursor-pointer pb-4 font-bold text-sm flex items-center gap-2 border-b-2 px-1 whitespace-nowrap transition-colors ${activeTab === "users" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400 hover:text-white"
              }`}
          >
            <Users size={16} />
            Gerenciar Usuários
          </button>
          <button
            onClick={() => setActiveTab("workouts")}
            className={`cursor-pointer pb-4 font-bold text-sm flex items-center gap-2 border-b-2 px-1 whitespace-nowrap transition-colors ${activeTab === "workouts" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400 hover:text-white"
              }`}
          >
            <PlusCircle size={16} />
            Novo Treino
          </button>
          <button
            onClick={() => setActiveTab("exercises")}
            className={`cursor-pointer pb-4 font-bold text-sm flex items-center gap-2 border-b-2 px-1 whitespace-nowrap transition-colors ${activeTab === "exercises" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400 hover:text-white"
              }`}
          >
            <Dumbbell size={16} />
            Vincular Exercícios
          </button>
        </div>

        {/* Conteúdo da Aba 1: Usuários */}
        {activeTab === "users" && (
          <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-glow animate-fade-in">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-500 uppercase tracking-wider">
              👥 Jogadores Cadastrados
            </h2>

            {loadingUsers ? (
              <div className="py-8 text-center text-gray-500">Carregando usuários...</div>
            ) : users.length === 0 ? (
              <div className="py-8 text-center text-gray-500">Nenhum usuário cadastrado.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      <th className="py-3 px-4">Nome</th>
                      <th className="py-3 px-4">Username</th>
                      <th className="py-3 px-4">Instagram</th>
                      <th className="py-3 px-4 text-center">Premium</th>
                      <th className="py-3 px-4 text-center">Permissões</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50 text-sm">
                    {users.map((user) => (
                      <tr key={user.username} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">{user.name}</td>
                        <td className="py-3.5 px-4 text-orange-500">@{user.username}</td>
                        <td className="py-3.5 px-4 text-gray-400">{user.instagram ? `@${user.instagram}` : "-"}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleTogglePremium(user.username, user.premium)}
                            className={`cursor-pointer inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border transition-all ${user.premium
                              ? "bg-orange-600/10 text-orange-500 border-orange-500/30"
                              : "bg-neutral-900 text-gray-500 border-gray-800"
                              }`}
                          >
                            <Star size={12} className={user.premium ? "fill-orange-500" : ""} />
                            {user.premium ? "Premium" : "Grátis"}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggleRole(user.username, user.role)}
                            className={`cursor-pointer inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border transition-all ${user.role === "admin"
                              ? "bg-red-600/10 text-red-500 border-red-500/30"
                              : "bg-neutral-900 text-gray-400 border-gray-800"
                              }`}
                          >
                            <ShieldAlert size={12} />
                            {user.role === "admin" ? "Admin" : "Usuário"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo da Aba 2: Novo Treino */}
        {activeTab === "workouts" && (
          <div className="bg-surface border border-gray-800 rounded-2xl p-6 md:p-8 shadow-glow animate-fade-in max-w-xl mx-auto">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-500 uppercase tracking-wider">
              🏋️ Cadastrar Novo Treino
            </h2>
            <form onSubmit={handleCreateWorkout} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-400">Nome do Treino</label>
                <input
                  type="text"
                  required
                  value={newWorkout.name}
                  onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                  placeholder="Ex: Pliometria e Salto"
                  className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white placeholder-gray-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-400">Descrição</label>
                <textarea
                  required
                  rows={3}
                  value={newWorkout.description}
                  onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                  placeholder="Ex: Treino focado em explosão e impulsão vertical."
                  className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white placeholder-gray-600 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-400">Categoria</label>
                <select
                  value={newWorkout.category}
                  onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
                  className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white"
                >
                  <option value="Casa">Casa 🏠</option>
                  <option value="Academia">Academia 🏢</option>
                  <option value="Quadra">Quadra 🏀</option>
                  <option value="Livre">Livre 🌳</option>
                </select>
              </div>

              {workoutSuccess && (
                <div className="text-green-500 text-xs font-semibold flex items-center gap-1 py-1">
                  <Check size={14} /> {workoutSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingWorkout}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all shadow-glow disabled:opacity-50 mt-2"
              >
                {submittingWorkout ? "Criando..." : "Criar Treino"}
              </button>
            </form>
          </div>
        )}

        {/* Conteúdo da Aba 3: Vincular Exercícios */}
        {activeTab === "exercises" && (
          <div className="bg-surface border border-gray-800 rounded-2xl p-6 md:p-8 shadow-glow animate-fade-in">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-500 uppercase tracking-wider">
              🏀 Adicionar Exercícios a um Treino
            </h2>

            {loadingWorkouts ? (
              <div className="py-8 text-center text-gray-500">Carregando treinos...</div>
            ) : workouts.length === 0 ? (
              <div className="py-8 text-center text-gray-500">Você precisa criar um treino antes de adicionar exercícios.</div>
            ) : (
              <form onSubmit={handleCreateExercises} className="space-y-6">
                {/* Seleção do Treino */}
                <div className="space-y-1 max-w-sm">
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-400">Selecionar Treino</label>
                  <select
                    value={selectedWorkoutId}
                    onChange={(e) => setSelectedWorkoutId(e.target.value)}
                    className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white"
                  >
                    {workouts.map(w => (
                      <option key={w.id} value={w.id}>{w.name} ({w.category})</option>
                    ))}
                  </select>
                </div>

                {/* Lista de Exercícios Dinâmica */}
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 block border-b border-gray-800 pb-2">Exercícios</label>

                  {exercisesList.map((ex, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end bg-black/30 p-4 rounded-xl border border-gray-800/40 relative">
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-500 font-bold block mb-1">Exercício #{index + 1}</span>
                        <input
                          type="text"
                          required
                          placeholder="Nome do exercício"
                          value={ex.name}
                          onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                          className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-gray-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 font-semibold block sm:hidden">Repetições/Tempo</span>
                        <input
                          type="text"
                          required
                          placeholder="Ex: 3x10 rep ou 45 seg"
                          value={ex.reps}
                          onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                          className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-gray-600"
                        />
                      </div>

                      <div className="space-y-1 flex gap-2 items-center">
                        <div className="flex-1">
                          <input
                            type="text"
                            required
                            placeholder="Nome do vídeo (ex: flexao)"
                            value={ex.link_video}
                            onChange={(e) => handleExerciseChange(index, "link_video", e.target.value)}
                            className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-gray-600"
                          />
                        </div>
                        {exercisesList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExerciseRow(index)}
                            className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white p-2.5 rounded-xl border border-red-500/20 transition-all cursor-pointer"
                          >
                            <Trash size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={addExerciseRow}
                    className="cursor-pointer border-2 border-dashed border-gray-700 hover:border-orange-500/50 text-gray-400 hover:text-orange-500 font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle size={14} />
                    Adicionar mais um exercício
                  </button>

                  <div className="flex-1 flex flex-col justify-end">
                    {exerciseSuccess && (
                      <div className="text-green-500 text-xs font-semibold flex items-center gap-1 py-1.5">
                        <Check size={14} /> {exerciseSuccess}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={submittingExercises}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all shadow-glow disabled:opacity-50 text-sm"
                    >
                      {submittingExercises ? "Salvando..." : "Salvar Exercícios no Treino"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
