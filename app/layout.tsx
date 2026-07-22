import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Orange Pekoe", template: "%s | Orange Pekoe" },
  description: "健康で信頼される大人としての成長を記録する、プライベートジャーナル。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <span className="footer-rule" />
          <p>Project Orange Pekoe</p>
          <small>Quiet progress, carefully kept.</small>
        </footer>
      </body>
    </html>
  );
}
