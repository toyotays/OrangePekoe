"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HealthChart() {
  return (
    <div className="chart-wrap" aria-label="今週の歩数グラフ。まだデータはありません">
      <Line
        data={{
          labels,
          datasets: [{
            label: "Steps",
            data: [null, null, null, null, null, null, null],
            borderColor: "#b26b3d",
            backgroundColor: "rgba(178, 107, 61, .12)",
            fill: true,
            tension: 0.35,
          }],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { tooltip: { enabled: false } },
          scales: {
            x: { grid: { display: false }, border: { display: false }, ticks: { color: "#776f64" } },
            y: { min: 0, max: 10000, grid: { color: "rgba(20, 40, 55, .08)" }, border: { display: false }, ticks: { display: false } },
          },
        }}
      />
      <div className="chart-empty"><strong>No health data yet</strong><span>Apple HealthのCSVを追加すると、ここに変化が表示されます。</span></div>
    </div>
  );
}
