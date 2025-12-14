import { useEffect, useState } from "react";
import api from "../api/axios";

export default function SweetPage() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    api.get("/sweets/").then((res) => setSweets(res.data));
  }, []);

  const buy = async (id) => {
    await api.post(`/sweets/${id}/purchase/`);
    setSweets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, quantity: s.quantity - 1 } : s))
    );
  };
  const [query, setQuery] = useState("");

useEffect(() => {
  api.get(`/sweets/?search=${query}`).then((res) => setSweets(res.data));
}, [query]);


  return (
    <div style={{ padding: 24 }}>
      <h2>Sweets</h2>
      {sweets.map((s) => (
        <div key={s.id} style={card}>
          <b>{s.name}</b> – ₹{s.price}
          <span>Stock: {s.quantity}</span>
          <button disabled={s.quantity === 0} onClick={() => buy(s.id)}>
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#020617",
  marginBottom: 12,
  padding: 16,
  borderRadius: 8,
  color: "white",
};
