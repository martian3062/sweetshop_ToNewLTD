import React, { useState } from "react";
import api from "../../api/axios";

export default function AdminSweetModal({ sweet, onClose, onSaved }) {
  const [form, setForm] = useState(
    sweet || {
      name: "",
      category: "traditional",
      price: 10,
      quantity: 10,
    }
  );

  const save = async () => {
    if (sweet) {
      await api.put(`/sweets/${sweet.id}/`, form);
    } else {
      await api.post("/sweets/", form);
    }
    onSaved();
    onClose();
  };

  const remove = async () => {
    if (!sweet) return;
    await api.delete(`/sweets/${sweet.id}/`);
    onSaved();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          width: 320,
          borderRadius: 8,
        }}
      >
        <h3>{sweet ? "Edit Sweet" : "Add Sweet"}</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={{ width: "100%", marginBottom: 8 }}
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          style={{ width: "100%", marginBottom: 8 }}
        >
          <option value="traditional">Traditional</option>
          <option value="chocolate">Chocolate</option>
          <option value="dryfruit">Dry Fruit</option>
          <option value="milk">Milk</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          style={{ width: "100%", marginBottom: 8 }}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
          style={{ width: "100%", marginBottom: 12 }}
        />

        <button onClick={save}>💾 Save</button>
        {sweet && (
          <button
            onClick={remove}
            style={{ marginLeft: 8 }}
          >
            🗑 Delete
          </button>
        )}
        <button
          onClick={onClose}
          style={{ marginLeft: 8 }}
        >
          ❌ Close
        </button>
      </div>
    </div>
  );
}
