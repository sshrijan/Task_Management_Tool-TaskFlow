import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authService.login(formData);

      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "Member") {
        navigate("/member");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-3">
            TaskFlow
          </h1>
          <p className="text-gray-400">
            Sign in to your account
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white"
                required
              />
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-2">
                    Password
                </label>

                <div className="relative">

                    <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({
                        ...formData,
                        password: e.target.value,
                        })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 pr-14 text-white"
                    required
                    />

                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-semibold text-lg text-white"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Don't have an account?
            <a
              href="/register"
              className="text-blue-400 ml-1 hover:underline"
            >
              Register here
            </a>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;