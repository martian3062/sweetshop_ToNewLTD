import React, { useEffect, useState } from "react";
import api from "../api/axios";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell,
  ResponsiveContainer, LineChart, Line
} from "recharts";

import AdminSweetModal from "../components/admin/AdminSweetModal";

const COLORS = ["#7c7cff", "#38bdf8", "#a78bfa", "#22c55e"];

export default function DashboardPage() {
  const [sweets, setSweets] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editSweet, setEditSweet] = useState(null);

  const loadData = async () => {
    const res = await api.get("/sweets/");
    setSweets(res.data);
  };

  const loadTopSelling = async () => {
    const res = await api.get("/sweets/top_selling/");
    setTopSelling(res.data);
  };

  useEffect(() => {
    loadData();
    loadTopSelling();
  }, []);

  const purchase = async (id) => {
    await api.post(`/sweets/${id}/purchase/`);
    loadData();
    loadTopSelling();
  };

  const generateRandom = async () => {
    await api.post("/sweets/generate_random/");
    loadData();
    loadTopSelling();
  };

  const categoryData = Object.values(
    sweets.reduce((acc, s) => {
      acc[s.category] = acc[s.category] || { name: s.category, value: 0 };
      acc[s.category].value += s.quantity;
      return acc;
    }, {})
  );

  return (
    <div className="dashboard">
      <h2>📊 Sweet Shop Analytics Dashboard</h2>

      <div style={{ marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={generateRandom}>
          🎲 Random Inventory
        </button>
        <button
          className="btn btn-outline"
          onClick={() => { setEditSweet(null); setShowModal(true); }}
          style={{ marginLeft: 10 }}
        >
          ➕ Add Sweet
        </button>
      </div>

      {/* TABLE */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Category</th><th>Price</th><th>Qty</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td>₹{s.price}</td>
                <td>{s.quantity}</td>
                <td>
                  <button className="btn btn-buy" onClick={() => purchase(s.id)}>🛒 Buy</button>
                  <button
                    className="btn btn-outline"
                    onClick={() => { setEditSweet(s); setShowModal(true); }}
                    style={{ marginLeft: 6 }}
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHARTS */}
      <div className="charts">
        <div className="card">
          <ResponsiveContainer height={260}>
            <BarChart data={sweets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#7c7cff" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <ResponsiveContainer height={260}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" label>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <ResponsiveContainer height={260}>
            <LineChart data={topSelling}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sold"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showModal && (
        <AdminSweetModal
          sweet={editSweet}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            loadData();
            loadTopSelling();
          }}
        />
      )}
    </div>
  );
}
