import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);
      const { user, token } = res.data;

      login(user, token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-white flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start w-full max-w-5xl">
        {/* Login Form Box */}
        <div className="bg-white rounded-xl shadow-2xl p-8 min-w-[400px] flex-shrink-0">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>

        {/* Small Demo Credentials Box */}
        <div className="w-full md:w-[220px] bg-blue-50 border border-blue-200 rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 text-center">Demo Login</h3>
          <div className="mb-2">
            <p className="text-sm text-gray-700 font-medium">Email</p>
            <p className="text-sm font-mono text-blue-700">john@gmail.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Password</p>
            <p className="text-sm font-mono text-blue-700">john</p>
          </div>
        </div>
      </div>
    </div>
  );
}
