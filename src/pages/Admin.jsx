import { useState, useEffect } from "react";
import api from "../services/api";
import { Users, Dumbbell, PlusCircle, Trash, Check, X, Shield, Star, ShieldAlert, Crown, Clock, Lightbulb, Search } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("users");

  // Estados de dados
  const [users, setUsers] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);


  // Estado formulário de Treino
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    desc: "",
    duration: "20 min",
    category: "Livre",
    premium: false
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

  // Carrega usuários, treinos ou sugestões
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "exercises" || activeTab === "workouts") {
      fetchWorkouts();
    } else if (activeTab === "suggestions") {
      fetchSuggestions();
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

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const res = await api.get("/workouts/suggestions/all");
      setSuggestions(res.data);
    } catch (err) {
      console.error("Erro ao carregar sugestões:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Atualização administrativa de usuário (Premium com plano em meses)
  const handleSetUserPremium = async (username, premium, months = 1) => {
    try {
      const res = await api.put(`/users/${username}/admin-update`, {
        premium: premium,
        premium_plan_months: months
      });
      setUsers(users.map(u => u.username === username ? res.data : u));
    } catch (err) {
      console.error("Erro ao alterar premium:", err);
      alert("Erro ao alterar status premium do usuário.");
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

  const handleToggleWorkoutPremium = async (workoutId, currentPremium) => {
    try {
      const res = await api.put(`/workouts/${workoutId}`, {
        premium: !currentPremium
      });
      setWorkouts(workouts.map(w => w.id === workoutId ? res.data : w));
    } catch (err) {
      console.error("Erro ao alterar status premium do treino:", err);
      alert("Erro ao atualizar treino.");
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
      setNewWorkout({ name: "", desc: "", duration: "20 min", category: "Livre", premium: false });
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
    <div className="min-h-screen bg-black text-white pb-20 pt-20 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            <Shield className="text-orange-500" />
            Painel de Controle
          </h1>
          <p className="text-gray-400 text-sm mt-1">Administração geral de usuários, planos e treinos do Ballers085</p>
        </div>

        {/* Abas */}
        <div className="flex border-b border-gray-800 gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("users")}
            className={`cursor-pointer pb-4 font-bold text-sm flex items-center gap-2 border-b-2 px-1 whitespace-nowrap transition-colors ${
              activeTab === "users" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Users size={16} />
            Gerenciar Usuários & Premium
          </button>
          <button
            onClick={() => setActiveTab("workouts")}
            className={`cursor-pointer pb-4 font-bold text-sm flex items-center gap-2 border-b-2 px-1 whitespace-nowrap transition-colors ${
              activeTab === "workouts" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <PlusCircle size={16} />
            Gerenciar & Novo Treino
          </button>
          <button
            onClick={() => setActiveTab("exercises")}
            className={`cursor-pointer pb-4 font-bold text-sm flex items-center gap-2 border-b-2 px-1 whitespace-nowrap transition-colors ${
              activeTab === "exercises" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Dumbbell size={16} />
            Vincular Exercícios
          </button>
          <button
            onClick={() => setActiveTab("suggestions")}
            className={`cursor-pointer pb-4 font-bold text-sm flex items-center gap-2 border-b-2 px-1 whitespace-nowrap transition-colors ${
              activeTab === "suggestions" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Lightbulb size={16} />
            Sugestões PRO ({suggestions.length})
          </button>
        </div>

        {/* Conteúdo da Aba 1: Usuários */}
        {activeTab === "users" && (
          <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-glow animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2 text-orange-500 uppercase tracking-wider">
                  👑 Jogadores & Status Premium
                </h2>
                <p className="text-xs text-gray-400">Promova atletas para o plano PRO após confirmar o pagamento PIX</p>
              </div>

              {/* Busca por usuário */}
              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar usuário ou nome..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-black/60 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {loadingUsers ? (
              <div className="py-8 text-center text-gray-500">Carregando usuários...</div>
            ) : users.length === 0 ? (
              <div className="py-8 text-center text-gray-500">Nenhum usuário cadastrado.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                      <th className="py-3 px-4">Usuário</th>
                      <th className="py-3 px-4">Status Premium</th>
                      <th className="py-3 px-4">Data Compra</th>
                      <th className="py-3 px-4">Expiração</th>
                      <th className="py-3 px-4 text-center">Gerenciar Plano</th>
                      <th className="py-3 px-4 text-center">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50 text-xs">
                    {users
                      .filter((u) => {
                        if (!userSearchQuery) return true;
                        const query = userSearchQuery.toLowerCase();
                        return (
                          u.name?.toLowerCase().includes(query) ||
                          u.username?.toLowerCase().includes(query)
                        );
                      })
                      .map((u) => (
                      <tr key={u.username} className="hover:bg-neutral-900/40 transition-colors">

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{u.name}</div>
                          <div className="text-orange-500 font-mono text-[11px]">@{u.username}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 font-extrabold px-2.5 py-1 rounded-full border text-[10px] ${
                              u.premium
                                ? "bg-orange-600/10 text-orange-400 border-orange-500/30"
                                : "bg-gray-900 text-gray-500 border-gray-800"
                            }`}
                          >
                            <Crown size={11} className={u.premium ? "text-orange-500" : "text-gray-600"} />
                            {u.premium ? `PREMIUM (${u.premium_plan_months || 1}M)` : "GRÁTIS"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 font-mono text-[11px]">
                          {u.premium_purchased_at || "-"}
                        </td>
                        <td className="py-3.5 px-4 text-gray-300 font-mono text-[11px] font-semibold">
                          {u.premium_expires_at ? (
                            <span className="text-orange-300">{u.premium_expires_at}</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {u.premium ? (
                              <button
                                onClick={() => handleSetUserPremium(u.username, false)}
                                className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900 text-[10px] font-bold cursor-pointer"
                              >
                                Cancelar Premium
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleSetUserPremium(u.username, true, 1)}
                                  className="px-2 py-1 rounded-lg bg-orange-600/20 border border-orange-500/30 text-orange-400 hover:bg-orange-600 hover:text-white text-[10px] font-bold cursor-pointer"
                                >
                                  +1 Mês
                                </button>
                                <button
                                  onClick={() => handleSetUserPremium(u.username, true, 2)}
                                  className="px-2 py-1 rounded-lg bg-orange-600/20 border border-orange-500/30 text-orange-400 hover:bg-orange-600 hover:text-white text-[10px] font-bold cursor-pointer"
                                >
                                  +2 Meses
                                </button>
                                <button
                                  onClick={() => handleSetUserPremium(u.username, true, 3)}
                                  className="px-2 py-1 rounded-lg bg-orange-600/20 border border-orange-500/30 text-orange-400 hover:bg-orange-600 hover:text-white text-[10px] font-bold cursor-pointer"
                                >
                                  +3 Meses
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggleRole(u.username, u.role)}
                            className={`cursor-pointer inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                              u.role === "admin"
                                ? "bg-red-600/10 text-red-500 border-red-500/30"
                                : "bg-neutral-900 text-gray-400 border-gray-800"
                            }`}
                          >
                            <ShieldAlert size={12} />
                            {u.role === "admin" ? "Admin" : "Usuário"}
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

        {/* Conteúdo da Aba 2: Novo Treino & Tabela de Treinos */}
        {activeTab === "workouts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Lista de Treinos Cadastrados */}
            <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-glow space-y-4">
              <h2 className="text-lg font-bold text-orange-500 uppercase tracking-wider flex items-center gap-2">
                📋 Treinos Existentes
              </h2>
              {loadingWorkouts ? (
                <div className="py-6 text-center text-gray-500 text-xs">Carregando treinos...</div>
              ) : workouts.length === 0 ? (
                <div className="py-6 text-center text-gray-500 text-xs">Nenhum treino cadastrado.</div>
              ) : (
                <div className="space-y-3">
                  {workouts.map((w) => (
                    <div
                      key={w.id}
                      className="bg-black/40 border border-gray-800/80 rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          {w.name}
                          {w.premium && (
                            <span className="bg-orange-600/20 text-orange-400 border border-orange-500/30 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                              PRO
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{w.desc}</div>
                        <div className="text-[10px] text-gray-500 mt-1">Categoria: {w.category} | Duração: {w.duration}</div>
                      </div>

                      <button
                        onClick={() => handleToggleWorkoutPremium(w.id, w.premium)}
                        className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
                          w.premium
                            ? "bg-orange-600 text-white border-orange-500 shadow-glow"
                            : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                        }`}
                      >
                        <Crown size={12} />
                        {w.premium ? "Exclusivo PRO" : "Tornar PRO"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form de Cadastro de Treino */}
            <div className="bg-surface border border-gray-800 rounded-2xl p-6 md:p-8 shadow-glow animate-fade-in">
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
                    placeholder="Ex: Treino de Impulsão Vertical"
                    className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white placeholder-gray-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-400">Descrição</label>
                  <textarea
                    required
                    rows={3}
                    value={newWorkout.desc}
                    onChange={(e) => setNewWorkout({ ...newWorkout, desc: e.target.value })}
                    placeholder="Ex: Treino focado em pliometria e explosão de salto vertical."
                    className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white placeholder-gray-600 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
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

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider font-semibold text-gray-400">Duração</label>
                    <input
                      type="text"
                      required
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                      placeholder="Ex: 25 min"
                      className="w-full bg-black border border-gray-800 focus:border-orange-500/50 focus:outline-none rounded-xl py-3 px-4 text-sm transition-all text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="premiumCheck"
                    checked={newWorkout.premium}
                    onChange={(e) => setNewWorkout({ ...newWorkout, premium: e.target.checked })}
                    className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                  />
                  <label htmlFor="premiumCheck" className="text-xs font-bold text-gray-300 cursor-pointer flex items-center gap-1.5">
                    <Crown size={14} className="text-orange-500" />
                    Este treino é Exclusivo Premium (PRO)
                  </label>
                </div>

                {workoutSuccess && (
                  <div className="text-green-500 text-xs font-semibold flex items-center gap-1 py-1">
                    <Check size={14} /> {workoutSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submittingWorkout}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all shadow-glow disabled:opacity-50 mt-2 cursor-pointer"
                >
                  {submittingWorkout ? "Criando..." : "Criar Treino"}
                </button>
              </form>
            </div>
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
                      <option key={w.id} value={w.id}>{w.name} ({w.category}) {w.premium ? "[PRO]" : ""}</option>
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
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all shadow-glow disabled:opacity-50 text-sm cursor-pointer"
                    >
                      {submittingExercises ? "Salvando..." : "Salvar Exercícios no Treino"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Conteúdo da Aba 4: Sugestões de Treinos */}
        {activeTab === "suggestions" && (
          <div className="bg-surface border border-gray-800 rounded-2xl p-6 md:p-8 shadow-glow animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-orange-500 uppercase tracking-wider">
                💡 Sugestões de Treino Enviadas pelos Membros PRO
              </h2>
              <span className="text-xs text-gray-400">Total: {suggestions.length} sugestões</span>
            </div>

            {loadingSuggestions ? (
              <div className="py-8 text-center text-gray-500">Carregando sugestões...</div>
            ) : suggestions.length === 0 ? (
              <div className="py-8 text-center text-gray-500">Nenhuma sugestão enviada até o momento.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestions.map((s) => (
                  <div key={s.id} className="bg-black/50 border border-gray-800 rounded-2xl p-5 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {s.category}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">{s.created_at}</span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white">{s.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed whitespace-pre-wrap">{s.description}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">Enviado por:</span>
                      <span className="text-orange-400 font-mono font-bold">@{s.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

