import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStrategicRetreats } from "@/lib/data";

export const metadata: Metadata = {
  title: "戦略的撤退",
  description: "終えた活動と、そこから得たものを静かに残す記録。",
};

export default function StrategicRetreatPage() {
  const retreats = getStrategicRetreats();

  return (
    <div className="strategic-retreat-page">
      <header className="strategic-retreat-hero shell">
        <p className="eyebrow">FILE OP–009 · STRATEGIC RETREAT</p>
        <h1>戦略的<br /><em>撤退。</em></h1>
        <p>
          続けないと決めることも、前へ進むための選択。<br />
          終えた活動を消さず、経験として静かに残す。
        </p>
      </header>

      <section className="strategic-retreat-records shell" aria-labelledby="retreat-records-title">
        <div className="strategic-retreat-heading">
          <p className="eyebrow">What we leave behind</p>
          <h2 id="retreat-records-title">残して、次へ進む。</h2>
        </div>

        {retreats.map((retreat) => (
          <article className="strategic-retreat-record" key={retreat.id}>
            <div className="strategic-retreat-record-intro">
              <span>{retreat.label}</span>
              <time dateTime={retreat.decidedAt}>{retreat.decidedAt.replaceAll("-", ".")}</time>
              <h3>{retreat.title}</h3>
              <p>{retreat.statement}</p>
            </div>

            <div className="strategic-retreat-items">
              {retreat.items.map((item) => (
                <section className="strategic-retreat-item" key={item.title}>
                  {item.image ? (
                    <div className="strategic-retreat-image">
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 800px) 100vw, 45vw"
                      />
                    </div>
                  ) : null}
                  <div>
                    <span>{item.label}</span>
                    <h4>{item.title}</h4>
                    <p>{item.caption}</p>
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>

      <nav className="strategic-retreat-back shell" aria-label="ビジョンボードへ戻る">
        <Link href="/vision-board/"><span aria-hidden="true">←</span> ビジョンボードへ戻る</Link>
      </nav>
    </div>
  );
}
