import type { Metadata } from "next";
import Image from "next/image";
import { getVisionChapters } from "@/lib/data";

export const metadata: Metadata = { title: "Vision Board" };

export default function VisionPage() {
  const chapters = getVisionChapters();

  return (
    <div className="vision-story-page">
      <header className="vision-story-intro shell">
        <div>
          <p className="eyebrow">Personal direction · Eyes only</p>
          <p className="vision-story-file">FILE OP–007 / LIVING VISION</p>
          <h1>Vision<br /><em>in motion.</em></h1>
        </div>
        <div className="vision-story-intro-copy">
          <p>夢だけを並べるのではなく、すでに持っている力から、次の世代へ手渡す未来まで。</p>
          <small>Scroll to advance the story</small>
        </div>
      </header>

      <nav className="vision-story-index" aria-label="ビジョンの段階">
        <div className="shell">
          {chapters.map((chapter) => (
            <a href={`#${chapter.id}`} key={chapter.id}>
              <span>{chapter.code}</span>
              <small>{chapter.timeframe}</small>
            </a>
          ))}
        </div>
      </nav>

      <div className="vision-story">
        {chapters.map((chapter, index) => (
          <article className={`vision-story-chapter chapter-${chapter.id}`} id={chapter.id} key={chapter.id}>
            <div className="vision-story-image">
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
              />
              <span className="vision-story-shade" />
            </div>
            <div className="shell vision-story-content">
              <div className="vision-story-heading">
                <p><span>{chapter.code}</span>{chapter.phase}</p>
                <h2>{chapter.title}</h2>
                <strong>{chapter.timeframe}</strong>
              </div>
              <div className="vision-story-panel">
                <p className="vision-story-statement">{chapter.statement}</p>
                <div className="vision-story-milestones">
                  {chapter.milestones.map((milestone) => (
                    <section key={`${chapter.id}-${milestone.label}`}>
                      <p>{milestone.label}</p>
                      <h3>{milestone.text}</h3>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="vision-story-closing">
        <div className="shell">
          <p className="eyebrow">The Orange Pekoe vision</p>
          <blockquote>速く、若く、品よく。<br />人生を楽しみ、その力を誰かへ手渡す。</blockquote>
          <p>このビジョンは固定された計画ではなく、今の自分に合わせて育て続ける。</p>
        </div>
      </footer>
    </div>
  );
}
