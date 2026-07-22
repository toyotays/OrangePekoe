import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function HomeIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>;
}
export function TimelineIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M6 8v8M10 6h10M10 18h10"/></svg>;
}
export function HealthIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/><path d="M4.8 12h4l1.4-3 3.2 6 1.4-3h4.4"/></svg>;
}
export function WardrobeIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M9 5a3 3 0 1 1 4.8 2.4L21 12l-2 3-3-2v8H8v-8l-3 2-2-3 7.2-4.6"/></svg>;
}
export function LeafIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M20 4c-7 0-12 3-12 9 0 3 2 5 5 5 6 0 7-7 7-14Z"/><path d="M4 21c2-6 6-9 12-12"/></svg>;
}
export function ArrowIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}
