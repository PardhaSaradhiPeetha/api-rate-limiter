import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "./utils/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
      });

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 transition p-3 rounded font-semibold"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 cursor-pointer">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}