import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import useDashboardData from "../../hooks/useDashboardData";

export default function InventoryChart() {
  const { inventory } = useDashboardData();

  return (
    <div style={card}>
      <h3>Live Stock Levels</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={inventory}>
          <XAxis dataKey="name" />
          <Tooltip />
          <defs>
            <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <Bar dataKey="quantity" fill="url(#stockGrad)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const card = { background: "#020617", padding: 16, borderRadius: 12 };
