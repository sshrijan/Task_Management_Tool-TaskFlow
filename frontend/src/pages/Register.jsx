import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userService from "../services/userService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordHash: "",
    role: "Member",
  });

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      await userService.create(formData);

      alert("Registration successful! Please login.");

      navigate("/");

    } catch (error) {

      console.error(error);
      alert("Registration failed.");

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
            Create your account
          </p>
        </div>


        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">

          <form onSubmit={handleSubmit} className="space-y-6">


            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    name:e.target.value
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white"
                required
              />
            </div>


            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    email:e.target.value
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

              <input
                type="password"
                value={formData.passwordHash}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    passwordHash:e.target.value
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white"
                required
              />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-semibold text-lg text-white"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>


          </form>


          <p className="text-center mt-6 text-gray-500 text-sm">

            Already have an account?

            <Link
              to="/"
              className="text-blue-400 ml-1 hover:underline"
            >
              Sign in
            </Link>

          </p>


        </div>

      </div>

    </div>
  );
};


export default Register;