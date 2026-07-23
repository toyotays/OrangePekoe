import Link from "next/link";
import { HealthIcon, HomeIcon, TimelineIcon, VisionIcon, WardrobeIcon } from "./icons";

const nav = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/timeline/", label: "Timeline", icon: TimelineIcon },
  { href: "/health/", label: "Health", icon: HealthIcon },
  { href: "/wardrobe/", label: "Wardrobe", icon: WardrobeIcon },
  { href: "/vision/", label: "Vision", icon: VisionIcon },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Orange Pekoe ホーム">
          <span className="brand-mark">OP</span>
          <span>
            <strong>Orange Pekoe</strong>
            <small>Personal Journal</small>
          </span>
        </Link>
        <nav aria-label="メインナビゲーション">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link href={href} key={href} className="nav-link">
              <Icon />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
