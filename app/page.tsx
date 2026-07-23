import Link from "next/link";
import { ArrowIcon, HealthIcon, LeafIcon, TimelineIcon, VisionIcon, WardrobeIcon } from "@/components/icons";
import { getTimeline } from "@/lib/data";

const modules = [
  { href: "/health/", label: "Health", copy: "身体の変化を、数字で静かに見つめる。", icon: HealthIcon, tone: "sage" },
  { href: "/timeline/", label: "Timeline", copy: "節目と日々の積み重ねを、一つの物語に。", icon: TimelineIcon, tone: "navy" },
  { href: "/wardrobe/", label: "Wardrobe", copy: "長く付き合う品と、その手入れの記録。", icon: WardrobeIcon, tone: "brown" },
  { href: "/vision/", label: "Vision", copy: "次の一手から遠い夢まで、進む方角を一枚に。", icon: VisionIcon, tone: "black" },
];

export default function Home() {
  const latest = getTimeline().at(-1);

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">A personal health & gentleman journal</p>
          <h1>日々を整え、<br /><em>信頼を重ねる。</em></h1>
          <p className="lead">50代からの健康、身だしなみ、活動。小さな変化を丁寧に残し、昨日より少しよい自分へ。</p>
          <div className="hero-actions">
            <Link href="/health/" className="button primary">今日の記録を見る <ArrowIcon /></Link>
            <Link href="/timeline/" className="text-link">これまでの歩み <ArrowIcon /></Link>
          </div>
        </div>
        <div className="hero-emblem" aria-hidden="true">
          <div className="emblem-ring"><LeafIcon /><span>Since</span><strong>2026</strong></div>
          <p>Health · Style · Character</p>
        </div>
      </section>

      <section className="shell journal-overview" aria-labelledby="overview-title">
        <div className="section-heading">
          <div><p className="eyebrow">The journal</p><h2 id="overview-title">今を知り、歩みを残す</h2></div>
          <p>記録は評価のためではなく、変化に気づくために。</p>
        </div>
        <div className="module-grid four-up">
          {modules.map(({ href, label, copy, icon: Icon, tone }) => (
            <Link href={href} className={`module-card ${tone}`} key={href}>
              <span className="module-icon"><Icon /></span>
              <span><strong>{label}</strong><small>{copy}</small></span>
              <ArrowIcon className="module-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="shell latest-note">
        <div className="date-block"><span>JUL</span><strong>22</strong><small>2026</small></div>
        <div>
          <p className="eyebrow">Latest milestone</p>
          <h2>{latest?.title}</h2>
          <p>{latest?.description}</p>
        </div>
        <Link href="/timeline/" className="round-link" aria-label="タイムラインを開く"><ArrowIcon /></Link>
      </section>

      <section className="closing-statement">
        <div className="shell">
          <span className="ornament">✦</span>
          <blockquote>“大きく変わるのではなく、<br />小さく整え続ける。”</blockquote>
          <p>THE ORANGE PEKOE PRINCIPLE</p>
        </div>
      </section>
    </>
  );
}
