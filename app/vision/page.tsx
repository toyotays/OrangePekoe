import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getVisionBoardItems, getVisionChapters } from "@/lib/data";

export const metadata: Metadata = { title: "Vision Board" };

const statusLabels = {
  now: "すでに始まっている",
  next: "次に近づける",
  dream: "かなえたい未来",
  legacy: "次へ手渡す",
} as const;

export default function VisionPage() {
  const items = getVisionBoardItems();
  const chapters = getVisionChapters();

  return (
    <main className="vision-board-page">
      <header className="vision-board-hero shell">
        <div>
          <p className="eyebrow">FILE OP–007 · LIVING VISION</p>
          <h1>Vision<br /><em>board.</em></h1>
        </div>
        <div className="vision-board-intro">
          <p>
            ここにあるのは、予定表ではない。<br />
            見るたびに心が動く、かなえたい人生の断片。
          </p>
          <small>ONE IMAGE · ONE WISH · ALWAYS EDITABLE</small>
        </div>
      </header>

      <nav className="vision-board-legend" aria-label="ビジョンの状態">
        <div className="shell">
          {Object.entries(statusLabels).map(([status, label]) => (
            <span className={`vision-status status-${status}`} key={status}>
              <i />
              {label}
            </span>
          ))}
        </div>
      </nav>

      <section className="vision-collage shell" aria-label="現在のビジョンボード">
        {items.map((item, index) => (
          <article
            className={`vision-tile tile-${item.size} status-${item.status}`}
            key={item.id}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.imageAlt ?? ""}
                fill
                priority={index < 3}
                sizes={
                  item.size === "hero" || item.size === "wide"
                    ? "(max-width: 720px) 100vw, 66vw"
                    : "(max-width: 720px) 100vw, 33vw"
                }
              />
            ) : (
              <span className="vision-tile-monogram" aria-hidden="true">
                {item.label.slice(0, 2)}
              </span>
            )}
            <span className="vision-tile-shade" />
            <div className="vision-tile-copy">
              <div className="vision-tile-meta">
                <span>{item.label}</span>
                <small>{item.category}</small>
              </div>
              <h2>{item.title}</h2>
              <p>{item.caption}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="vision-review-strip">
        <div className="shell">
          <p className="eyebrow">A living board</p>
          <h2>追加する。かなえる。手放す。</h2>
          <div className="vision-review-questions">
            <p><span>01</span>新しく追加したいものは？</p>
            <p><span>02</span>かなったもの、近づいたものは？</p>
            <p><span>03</span>やめて削除したいものは？</p>
          </div>
        </div>
      </section>

      <section className="vision-path shell">
        <div className="vision-path-heading">
          <div>
            <p className="eyebrow">From vision to action</p>
            <h2>夢を、現実へつなぐ。</h2>
          </div>
          <p>
            ビジョンボードは未来を思い出す場所。段階と次の行動は、
            WEBジャーナルで管理する。
          </p>
        </div>
        <div className="vision-path-grid">
          {chapters.map((chapter) => (
            <article key={chapter.id}>
              <span>{chapter.code}</span>
              <small>{chapter.timeframe}</small>
              <h3>{chapter.title}</h3>
              <p>{chapter.statement}</p>
            </article>
          ))}
        </div>
        <Link className="button-primary vision-journal-link" href="/timeline">
          WEBジャーナルを見る <span>→</span>
        </Link>
      </section>

      <footer className="vision-board-closing">
        <div className="shell">
          <p className="eyebrow">The Orange Pekoe vision</p>
          <blockquote>
            速く、若く、品よく。<br />
            人生を楽しみ、その力を誰かへ手渡す。
          </blockquote>
        </div>
      </footer>
    </main>
  );
}
