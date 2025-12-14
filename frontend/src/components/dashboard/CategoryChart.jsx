import { PieChart, Pie, Cell, Tooltip } from "recharts";
import useDashboardData from "../../hooks/useDashboardData";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

export default function CategoryChart() {
  const { categories } = useDashboardData();

  return (
    <div style={card}>
      <h3>Category Distribution</h3>
      <PieChart width={300} height={300}>
        <Pie data={categories} dataKey="value" outerRadius={120}>
          {categories.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

const card = { background: "#020617", padding: 16, borderRadius: 12 };
