import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f97316",
  "#eab308",
  "#ef4444",
  "#14b8a6",
];

export default function SkillsPieChart({ skills = [] }) {
  const data = skills.map((skill) => ({
    name: skill,
    value: 1,
  }));

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">
      <h2 className="text-2xl font-bold mb-6">
        Skills Distribution
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}