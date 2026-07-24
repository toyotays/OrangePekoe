import type { Metadata } from "next";
import Link from "next/link";
import { getVisionChapters } from "@/lib/data";

export const metadata: Metadata = { title: "Vision" };

export default function VisionPage() {
  const chapters = getVisionChapters();

  return (
    <main className="vision-board-page vision-direction-page">
      <header className="vision-board-hero shell">
        <div>
          <p className="eyebrow">FILE OP–007 · PERSONAL DIRECTION</p>
          <h1>My<br /><em>vision.</em></h1>
        </div>
        <div className="vision-board-intro">
          <p>
            何を持ちたいかではなく、どう生きたいか。<br />
            好きなこと、自由、恩送りを、一つの方角へ。
          </p>
          <small>PURPOSE · VALUES · DIRECTION · LEGACY</small>
        </div>
      </header>

      <section className="vision-creed">
        <div className="shell">
          <p className="eyebrow">The reason behind the vision</p>
          <blockquote>
            好きなことで突き抜ける。<br />
            楽しいことをたくさんやっていい。<br />
            その楽しさは、いつか何かにつながっていく。
          </blockquote>
          <div className="vision-creed-grid">
            <article>
              <span>01 · MASTERY</span>
              <h2>上手くなり、勝つ</h2>
              <p>車、レース、IT。知識と技術を身につけ、自分の力で形にする。</p>
            </article>
            <article>
              <span>02 · CONNECTION</span>
              <h2>必要とされる</h2>
              <p>Fordays、配信、仲間との時間。人と会い、楽しさと価値を届ける。</p>
            </article>
            <article>
              <span>03 · FREEDOM</span>
              <h2>選べる豊かさ</h2>
              <p>お金を活動の燃料に変え、大切な人が自分の人生を選べる安心をつくる。</p>
            </article>
            <article>
              <span>04 · GIFT</span>
              <h2>恩を次へ送る</h2>
              <p>受け取った無償の愛を、楽しそうに活動する背中で子どもたちへ手渡す。</p>
            </article>
          </div>
        </div>
      </section>

      <section className="vision-path shell" aria-labelledby="vision-path-title">
        <div className="vision-path-heading">
          <div>
            <p className="eyebrow">A life in five stages</p>
            <h2 id="vision-path-title">今ある力を、未来へつなぐ。</h2>
          </div>
          <p>
            すでに持っているものを出発点に、稼ぐ力と影響力を育てる。
            得た自由を、大切な人と次の世代へ手渡していく。
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
      </section>

      <section className="vision-board-switch">
        <div className="shell">
          <div>
            <p className="eyebrow">See it, feel it</p>
            <h2>この方角を、写真と言葉で見る。</h2>
          </div>
          <p>
            ビジョンボードは、理屈を整理する場所ではない。
            車、レース、旅、仕事、配信、二人の夢を、一目で感じるための場所。
          </p>
          <Link className="button-primary" href="/vision-board/">
            ビジョンボードを見る <span>→</span>
          </Link>
        </div>
      </section>

      <footer className="vision-board-closing">
        <div className="shell">
          <p className="eyebrow">The Orange Pekoe vision</p>
          <blockquote>
            好きなことを思い切り突き詰め、<br />
            その楽しさと身につけた力を、<br />
            大切な人の自由と次の世代の希望へつなげる。
          </blockquote>
          <p>速く、若く、品よく。必要とされ、自分にしかできないことを成し遂げる。</p>
        </div>
      </footer>
    </main>
  );
}
