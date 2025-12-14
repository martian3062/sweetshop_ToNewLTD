import React, { useState } from "react";
import api from "../../api/axios";

export default function AdminSweetModal({ sweet, onClose, onSaved }) {
  const [form, setForm] = useState(
    sweet || { name: "", category: "traditional", price: 10, quantity: 10 }
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

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{sweet ? "Edit Sweet" : "Add Sweet"}</h3>

        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <select value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="traditional">Traditional</option>
          <option value="chocolate">Chocolate</option>
          <option value="milk">Milk</option>
          <option value="dryfruit">Dryfruit</option>
        </select>

        <input type="number" value={form.price}
          onChange={e => setForm({ ...form, price: +e.target.value })} />

        <input type="number" value={form.quantity}
          onChange={e => setForm({ ...form, quantity: +e.target.value })} />

        <div style={{ marginTop: 12 }}>
          <button className="btn btn-primary" onClick={save}>Save</button>
          <button className="btn btn-outline" onClick={onClose} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
