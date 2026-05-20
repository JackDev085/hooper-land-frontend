import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("r")) {
      setIsLogin(false);
    }
  }, [location.search]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorMsg("");

    try {
      if (isLogin) {
        const params = new URLSearchParams();
        params.append("username", data.username.toLowerCase());
        params.append("password", data.password);

        const response = await api.post("/token", params.toString(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response.status === 200) {
          login(response.data.access_token, response.data);
          navigate("/workouts");
        }
      } else {
        const response = await api.post("/register", {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
        });

        if (response.status === 201 || response.status === 200) {
          setErrorMsg("Conta criada com sucesso! Faça login.");
          setIsLogin(true);
          reset();
        }
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      setErrorMsg(
        error?.response?.data?.detail || "Erro ao processar requisição",
      );
    }
  };

  const toggleMode = () => {
    setIsLogin((s) => !s);
    reset();
    setErrorMsg("");
  };

  const password = watch("password");

  const inputClasses = (hasError) => `
    w-full px-4 py-3 pl-12
    bg-black/50 backdrop-blur-sm
    border rounded-xl
    text-white placeholder-gray-500
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-orange-500/50
    ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-gray-700 focus:border-orange-500 hover:border-gray-600"
    }
  `;

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-6 py-20 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold uppercase tracking-wide mb-2">
              {isLogin ? "Entrar" : "Registrar"}
            </h1>
            <p className="text-gray-400">
              {isLogin ? "Bem-vindo de volta!" : "Crie sua conta gratuita"}
            </p>
          </div>

          {/* Alert message */}
          {errorMsg && (
            <div
              className={`
                mb-6 p-4 rounded-xl text-sm font-medium
                animate-fade-in
                ${
                  errorMsg.includes("sucesso")
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }
              `}
            >
              {errorMsg}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Name field - Register only */}
            {!isLogin && (
              <div className="space-y-2 animate-slide-up">
                <label className="text-sm text-gray-400 font-medium">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    {...register("name", { required: "Nome é obrigatório" })}
                    type="text"
                    className={inputClasses(errors.name)}
                    placeholder="Seu nome completo"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                </div>
                {errors.name && (
                  <span className="text-red-400 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
            )}

            {/* Username field */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register("username", {
                    required: "Usuário é obrigatório",
                  })}
                  type="text"
                  className={inputClasses(errors.username)}
                  placeholder="seu_usuario"
                  aria-invalid={errors.username ? "true" : "false"}
                />
              </div>
              {errors.username && (
                <span className="text-red-400 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`${inputClasses(errors.password)} pr-12`}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password requirements - Register only */}
              {!isLogin && (
                <div className="text-xs text-gray-500 space-y-1 mt-2">
                  <p>A senha deve conter:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li>Mínimo de 8 caracteres</li>
                    <li>1 caractere especial</li>
                    <li>1 dígito</li>
                  </ul>
                </div>
              )}

              {errors.password && (
                <span className="text-red-400 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm password and email - Register only */}
            {!isLogin && (
              <>
                <div className="space-y-2 animate-slide-up">
                  <label className="text-sm text-gray-400 font-medium">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register("confirmPassword", {
                        required: "Confirmação é obrigatória",
                        validate: (v) =>
                          v === password || "As senhas não coincidem",
                      })}
                      type={showPassword ? "text" : "password"}
                      className={inputClasses(errors.confirmPassword)}
                      placeholder="••••••••"
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-400 text-sm">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 animate-slide-up">
                  <label className="text-sm text-gray-400 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register("email", {
                        required: "Email é obrigatório",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Email inválido",
                        },
                      })}
                      type="email"
                      className={inputClasses(errors.email)}
                      placeholder="seu.email@exemplo.com"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-400 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full py-4 mt-4 
                bg-orange-600 hover:bg-orange-500 
                disabled:bg-orange-600/50 disabled:cursor-not-allowed
                rounded-xl text-lg font-bold 
                transition-all duration-300
                hover:shadow-glow hover:-translate-y-0.5
                disabled:hover:shadow-none disabled:hover:translate-y-0
                flex items-center justify-center gap-2
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Aguarde...
                </>
              ) : isLogin ? (
                "Entrar"
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-gray-400 mt-8">
            {isLogin ? "Ainda não possui conta? " : "Já possui conta? "}
            <button
              onClick={toggleMode}
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              {isLogin ? "Registre-se" : "Entrar"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
