import type { Metadata } from "next";
import { WardrobeIcon } from "@/components/icons";
import { PageHeading } from "@/components/page-heading";
import { getWardrobe } from "@/lib/data";

export const metadata: Metadata = { title: "Wardrobe" };

export default function WardrobePage() {
  const items = getWardrobe();
  return (
    <div className="shell page-shell">
      <PageHeading eyebrow="Things worth keeping" title="Wardrobe" description="よい物を選び、手入れをして、長く付き合う。" />
      <div className="wardrobe-intro"><WardrobeIcon /><p><strong>{items.length} pieces</strong><span>最初のワードローブ</span></p></div>
      <div className="wardrobe-grid">
        {items.map((item, index) => (
          <article className="wardrobe-card" key={item.name}>
            <div className={`item-visual ${item.accent}`}><span>{String(index + 1).padStart(2, "0")}</span><WardrobeIcon /></div>
            <div><p className="tag">{item.category}</p><h2>{item.name}</h2><p>{item.detail}</p><small>Care record — not started</small></div>
          </article>
        ))}
      </div>
    </div>
  );
}
