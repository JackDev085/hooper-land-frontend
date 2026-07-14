import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Calendar,
  Target,
  Trophy,
  Lock,
  Sparkles,
  ChevronRight,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import api from "../services/api";

// Sub-components
import QuantitativeSummary from "../components/athlete_evolution/QuantitativeSummary";
import DashboardTab from "../components/athlete_evolution/DashboardTab";
import JournalTab from "../components/athlete_evolution/JournalTab";
import GamesTab from "../components/athlete_evolution/GamesTab";
import GoalsTab from "../components/athlete_evolution/GoalsTab";

// Form modals
import JournalFormModal from "../components/athlete_evolution/JournalFormModal";
import GameFormModal from "../components/athlete_evolution/GameFormModal";
import GoalFormModal from "../components/athlete_evolution/GoalFormModal";

// Detail modals
import JournalDetailModal from "../components/athlete_evolution/JournalDetailModal";
import GameDetailModal from "../components/athlete_evolution/GameDetailModal";
import GoalDetailModal from "../components/athlete_evolution/GoalDetailModal";

export default function UserDash() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Tabs: 'dashboard' | 'journal' | 'games' | 'goals'
  const [activeTab, setActiveTab] = useState(user?.premium ? "dashboard" : "journal");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [daysFilter, setDaysFilter] = useState(30);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [goalsList, setGoalsList] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [competitionsList, setCompetitionsList] = useState([]);

  // Modal triggers
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Selected entities for detail modal
  const [selectedJournalDetail, setSelectedJournalDetail] = useState(null);
  const [selectedGameDetail, setSelectedGameDetail] = useState(null);
  const [selectedGoalDetail, setSelectedGoalDetail] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    if (!user) {
      setDashboardData({
        habits: [],
        consistency: {
          workouts_this_month: 0,
          weekly_frequency: 0,
          streak: 0
        }
      });
      setRecentGames([]);
      setCompetitionsList([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      if (user?.premium) {
        const dashRes = await api.get(`/athlete/dashboard?days=${daysFilter}`);
        setDashboardData(dashRes.data);
      } else {
        setDashboardData({
          habits: [],
          consistency: {
            workouts_this_month: 0,
            weekly_frequency: 0,
            streak: 0
          }
        });
      }

      // const goalsRes = await api.get("/athlete/goals");
      // setGoalsList(goalsRes.data);

      const gamesRes = await api.get("/athlete/game");
      setRecentGames(gamesRes.data);

      const compsRes = await api.get("/athlete/competitions");
      setCompetitionsList(compsRes.data || []);
    } catch (err) {
      console.error("Erro ao carregar dados do dashboard:", err);
      setErrorMsg("Falha ao carregar dados. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [daysFilter, user]);

  // Clean alerts after 4 seconds
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  const handleSuccess = (msg) => {
    setSuccessMsg(msg);
    fetchData();
  };

  const handleError = (msg) => {
    setErrorMsg(msg);
  };

  // Toggle Goal Completed status
  const handleToggleGoal = async (id, isCompleted) => {
    try {
      await api.patch(`/athlete/goals/${id}/toggle`);
      setSuccessMsg("Status da meta atualizado!");
      fetchData();
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao atualizar meta.");
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/athlete/goals/${id}`);
      setSuccessMsg("Meta excluída com sucesso.");
      fetchData();
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao excluir meta.");
    }
  };

  const handleDeleteGame = async (id) => {
    if (!user) {
      alert("Faça login para gerenciar suas partidas.");
      navigate("/auth");
      return;
    }
    try {
      await api.delete(`/athlete/game/${id}`);
      setSuccessMsg("Partida excluída com sucesso.");
      fetchData();
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao excluir partida.");
    }
  };

  const handleOpenJournalModal = () => {
    if (!user) {
      alert("Faça login para registrar suas atividades e acompanhar sua evolução!");
      navigate("/auth");
      return;
    }
    setShowJournalModal(true);
  };

  const handleOpenGameModal = () => {
    if (!user) {
      alert("Faça login para registrar suas partidas e acompanhar suas estatísticas!");
      navigate("/auth");
      return;
    }
    setShowGameModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-28 selection:bg-orange-500 selection:text-black">

      {/* Alert Messages */}
      {successMsg && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in backdrop-blur-lg">
          <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
          <span className="text-sm font-semibold">{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="fixed top-24 right-6 z-50 bg-red-950/90 border border-red-500/40 text-red-300 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in backdrop-blur-lg">
          <AlertCircle className="text-red-400 shrink-0" size={18} />
          <span className="text-sm font-semibold">{errorMsg}</span>
        </div>
      )}

      <div className="max-w-6xl w-full mx-auto flex flex-col gap-8">

        {/* Header Title & Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">
                {user?.premium ? "Premium Hub" : "Athlete Evolution"}
              </span>
              <span className="px-2 py-0.5 bg-orange-600/10 text-orange-500 text-[10px] font-black rounded border border-orange-500/20 uppercase tracking-widest">
                Ecosystem
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
              Evolução do <span className="text-orange-500">Atleta</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-2 font-medium">
              Diário de hábitos, metas de performance e estatísticas de jogo integradas em um painel interativo.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 rounded-2xl border border-zinc-900">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${activeTab === "dashboard" ? "bg-orange-600 text-black shadow-glow" : "text-zinc-400 hover:text-white"
                }`}
            >
              <TrendingUp size={14} /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab("journal")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${activeTab === "journal" ? "bg-orange-600 text-black shadow-glow" : "text-zinc-400 hover:text-white"
                }`}
            >
              <Calendar size={14} /> Diário
            </button>
            <button
              onClick={() => setActiveTab("games")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${activeTab === "games" ? "bg-orange-600 text-black shadow-glow" : "text-zinc-400 hover:text-white"
                }`}
            >
              <Trophy size={14} /> Estatísticas
            </button>
            {/*

              <button
              onClick={() => setActiveTab("goals")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${activeTab === "goals" ? "bg-orange-600 text-black shadow-glow" : "text-zinc-400 hover:text-white"
                }`}
                >
              <Target size={14} /> Metas
            </button>
           */ }
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex min-h-[50vh] justify-center items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Carregando painel do atleta...</span>
            </div>
          </div>
        )}

        {/* Tab Contents */}
        {!loading && dashboardData && (
          <>
            {activeTab === "dashboard" && (
              !user?.premium ? (
                <div className="bg-zinc-950/85 border border-zinc-800/80 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto w-full mt-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500" />

                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-orange-500/10 rounded-full border border-orange-500/30 text-orange-500">
                      <Lock size={40} className="stroke-[2.5]" />
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6">
                    <Sparkles size={12} className="fill-orange-400" /> Dashboard de Evolução Premium
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 text-white leading-none">
                    PAINEL DE <span className="text-orange-500">EVOLUÇÃO</span> COMPLETO
                  </h2>

                  <p className="text-zinc-450 text-xs sm:text-sm font-medium mb-8 leading-relaxed max-w-lg mx-auto">
                    Obtenha uma visão analítica completa dos seus hábitos, estatísticas consolidadas de arremessos e comparações automáticas de desempenho ao longo do tempo. Registre suas atividades e faça upgrade a qualquer momento para desbloquear os gráficos!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => alert("Entre em contato com a equipe administrativa do Ballers085 para realizar o upgrade de seu plano para Premium!")}
                      className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase text-xs rounded-xl transition duration-300 shadow-glow flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                    >
                      Fazer Upgrade para Premium <ChevronRight size={14} />
                    </button>
                    <Link
                      to="/support"
                      className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl border border-zinc-800 transition duration-300 flex items-center justify-center"
                    >
                      Apoie o Projeto
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <QuantitativeSummary
                    dashboardData={dashboardData}
                    recentGames={recentGames}
                    goalsList={goalsList}
                  />
                  <DashboardTab
                    dashboardData={dashboardData}
                    daysFilter={daysFilter}
                    setDaysFilter={setDaysFilter}
                    setActiveTab={setActiveTab}
                  />
                </div>
              )
            )}

            {activeTab === "journal" && (
              <JournalTab
                dashboardData={dashboardData}
                onOpenRegister={handleOpenJournalModal}
                onSelectDetail={setSelectedJournalDetail}
              />
            )}

            {activeTab === "games" && (
              <GamesTab
                recentGames={recentGames}
                competitions={competitionsList}
                onOpenRegister={handleOpenGameModal}
                onSelectDetail={setSelectedGameDetail}
                onDeleteGame={handleDeleteGame}
              />
            )}

            {/*
            {activeTab === "goals" && (
              <GoalsTab
                goalsList={goalsList}
                onOpenRegister={() => setShowGoalModal(true)}
                onSelectDetail={setSelectedGoalDetail}
                onCompleteGoal={(id) => handleToggleGoal(id, false)}
                onDeleteGoal={handleDeleteGoal}
              />
            )}
            */}
          </>
        )}

        {/* Form Modals */}
        <JournalFormModal
          isOpen={showJournalModal}
          onClose={() => setShowJournalModal(false)}
          onSuccess={handleSuccess}
          onError={handleError}
        />

        <GameFormModal
          isOpen={showGameModal}
          onClose={() => setShowGameModal(false)}
          onSuccess={handleSuccess}
          onError={handleError}
        />

        {/*
        <GoalFormModal
          isOpen={showGoalModal}
          onClose={() => setShowGoalModal(false)}
          onSuccess={handleSuccess}
          onError={handleError}
        />
        */}

        {/* Detail Modals */}
        <JournalDetailModal
          item={selectedJournalDetail}
          onClose={() => setSelectedJournalDetail(null)}
        />

        <GameDetailModal
          item={selectedGameDetail}
          competitions={competitionsList}
          onClose={() => setSelectedGameDetail(null)}
        />

        {/*
        <GoalDetailModal
          item={selectedGoalDetail}
          onClose={() => setSelectedGoalDetail(null)}
        />
        */}

      </div>
    </div>
  );
}
