import React, { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register/", form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <button>Register</button>
    </form>
  );
}

const formStyle = {
  maxWidth: 400,
  margin: "80px auto",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};
