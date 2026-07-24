import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getVisionBoardItems } from "@/lib/data";

export const metadata: Metadata = { title: "Vision Board" };

const statusLabels = {
  now: "すでに始まっている",
  next: "次に近づける",
  dream: "かなえたい未来",
  legacy: "次へ手渡す",
} as const;

export default function VisionBoardPage() {
  const items = getVisionBoardItems();

  return (
    <main className="vision-board-page">
      <header className="vision-board-hero shell">
        <div>
          <p className="eyebrow">FILE OP–008 · LIVING BOARD</p>
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

      <section className="vision-board-switch">
        <div className="shell">
          <div>
            <p className="eyebrow">From images to meaning</p>
            <h2>この一枚一枚を、どう生きるか。</h2>
          </div>
          <p>
            Visionには、好きなこと、自由、恩送りをどうつなぐかを記している。
            ボードで感じた未来を、生き方の方角へ戻す。
          </p>
          <Link className="button-primary" href="/vision/">
            Visionを読む <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
