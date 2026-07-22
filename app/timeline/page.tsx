import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { getTimeline } from "@/lib/data";

export const metadata: Metadata = { title: "Timeline" };

const labels = { fordays: "FORDAYS", milestone: "MILESTONE", health: "HEALTH", project: "PROJECT" };

export default function TimelinePage() {
  const entries = [...getTimeline()].reverse();
  return (
    <div className="shell page-shell">
      <PageHeading eyebrow="The story so far" title="Timeline" description="節目を振り返れば、続けてきた時間が見えてくる。" />
      <div className="timeline-list">
        {entries.map((entry) => {
          const date = new Date(`${entry.date}T00:00:00`);
          return (
            <article className="timeline-entry" key={`${entry.date}-${entry.title}`}>
              <time dateTime={entry.date}><strong>{date.getDate()}</strong><span>{date.toLocaleDateString("en", { month: "short" }).toUpperCase()}</span><small>{date.getFullYear()}</small></time>
              <span className={`timeline-dot ${entry.category}`} />
              <div><p className="tag">{labels[entry.category]}</p><h2>{entry.title}</h2><p>{entry.description}</p></div>
            </article>
          );
        })}
      </div>
      <p className="data-note">このページの記録は <code>data/timeline.yml</code> で管理されています。</p>
    </div>
  );
}
