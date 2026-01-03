import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      if (res.data.user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
