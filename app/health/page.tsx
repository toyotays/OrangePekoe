import type { Metadata } from "next";
import { HealthChart } from "@/components/health-chart";
import { HealthIcon } from "@/components/icons";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Health" };

const metrics = [
  { label: "Weight", unit: "kg" },
  { label: "BMI", unit: "" },
  { label: "Body fat", unit: "%" },
  { label: "Sleep", unit: "hrs" },
];

export default function HealthPage() {
  return (
    <div className="shell page-shell">
      <PageHeading eyebrow="Health, observed gently" title="Health" description="数値は判定ではなく、身体から届く小さな便り。" action={<span className="privacy-badge">Private data</span>} />
      <div className="metric-grid">
        {metrics.map((metric) => <article className="metric-card" key={metric.label}><span>{metric.label}</span><strong>— <small>{metric.unit}</small></strong><p>データ未登録</p></article>)}
      </div>
      <div className="health-layout">
        <section className="panel chart-panel">
          <div className="panel-heading"><div><p className="eyebrow">This week</p><h2>Daily steps</h2></div><HealthIcon /></div>
          <HealthChart />
        </section>
        <aside className="panel import-panel">
          <span className="import-icon">CSV</span>
          <h2>Apple Healthをつなぐ</h2>
          <p>書き出したCSVを読み込み、歩数や睡眠の変化をまとめます。</p>
          <button type="button" disabled>Import coming soon</button>
          <small>Version 0.1では表示基盤までを用意しています。</small>
        </aside>
      </div>
    </div>
  );
}
