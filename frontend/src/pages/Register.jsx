import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner"; // ✅ Spinner import

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false); // ✅ loading state

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData
      );
      if (res.status >= 200 && res.status < 300) {
        const { user, token } = res.data;
        login(user, token);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-white-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1 text-sm font-medium text-gray-600">
              Short Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell us something about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Register"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
