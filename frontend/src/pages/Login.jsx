import React, { useState } from "react";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login/",
        {
          username: form.username.trim(),
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      login(res.data);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={submit} className="auth-card">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
