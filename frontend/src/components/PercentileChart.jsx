import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function PercentileChart ({ title, data }) {
  const chartData = data.histogram.map((h) => ({
    range: h.end ? `${h.start}-${h.end}` : `${h.start}+`,
    density: h.density * 100,
  }));

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis unit="%" />
          <Tooltip />
          <Line type="monotone" dataKey="density" stroke="#f43f5e" strokeWidth={2} />
          <ReferenceLine
            x={data.percentiles.p75}
            stroke="red"
            label="p75"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
