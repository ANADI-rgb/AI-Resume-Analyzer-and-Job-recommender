import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function JobMatchChart({ jobs = [] }) {
  const data = jobs.map((job) => ({
    name: job.job.replace(" requiring", ""),
    score: Number(job.score),
  }));

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">
      <h2 className="text-2xl font-bold mb-6">
        Job Match Analysis
      </h2>

      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis type="number" />

            <YAxis
              dataKey="name"
              type="category"
              width={180}
            />

            <Tooltip />

            <Bar
              dataKey="score"
              fill="#06b6d4"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}