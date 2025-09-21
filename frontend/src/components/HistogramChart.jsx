import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HistogramChart({ title, data }) {
  console.log("data ", data, title);
  // histogram into chart data
  const chartData = data.histogram.map((h) => ({
    range: h.end ? `${h.start}-${h.end}` : `${h.start}+`,
    density: (h.density * 100).toFixed(1),
  }));

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="density" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
