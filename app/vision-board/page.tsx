import type { Metadata } from "next";
import Link from "next/link";
import { VisionBoardGrid } from "@/components/vision-board-grid";
import { getVisionBoardItems } from "@/lib/data";

export const metadata: Metadata = { title: "Vision Board" };

const statusLabels = {
  now: "すでに始まっている",
  next: "次に近づける",
  dream: "かなえたい未来",
  legacy: "次へ手渡す",
} as const;

const feasibilityOrder = { high: 0, medium: 1, long: 2 } as const;
const statusOrder = { now: 0, next: 1, dream: 2, legacy: 3 } as const;

export default function VisionBoardPage() {
  const items = getVisionBoardItems()
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const feasibilityDifference =
        feasibilityOrder[a.item.feasibility ?? "long"] -
        feasibilityOrder[b.item.feasibility ?? "long"];

      if (feasibilityDifference !== 0) return feasibilityDifference;

      const statusDifference =
        statusOrder[a.item.status] - statusOrder[b.item.status];

      return statusDifference || a.index - b.index;
    })
    .map(({ item }) => item);

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

      <VisionBoardGrid items={items} />

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
