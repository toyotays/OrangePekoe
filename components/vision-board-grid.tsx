"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { VisionBoardItem } from "@/lib/data";

type VisionBoardGridProps = {
  items: VisionBoardItem[];
};

export function VisionBoardGrid({ items }: VisionBoardGridProps) {
  const [selectedItem, setSelectedItem] = useState<VisionBoardItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedItem]);

  return (
    <>
      <section className="vision-collage shell" aria-label="現在のビジョンボード">
        {items.map((item, index) => (
          <article
            className={`vision-tile tile-${item.size} status-${item.status}`}
            key={item.id}
          >
            {item.image ? (
              <button
                className="vision-tile-open"
                type="button"
                onClick={() => setSelectedItem(item)}
                aria-label={`${item.title}の画像を拡大表示`}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </button>
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

      {selectedItem?.image ? (
        <div
          className="vision-lightbox"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedItem(null);
          }}
        >
          <section
            className="vision-lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vision-lightbox-title"
            aria-describedby="vision-lightbox-caption"
          >
            <button
              className="vision-lightbox-close"
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="拡大画像を閉じる"
              autoFocus
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="vision-lightbox-image">
              <Image
                src={selectedItem.image}
                alt={selectedItem.imageAlt ?? ""}
                fill
                sizes="100vw"
              />
            </div>
            <div className="vision-lightbox-copy">
              <p>{selectedItem.label} · {selectedItem.category}</p>
              <h2 id="vision-lightbox-title">{selectedItem.title}</h2>
              <p id="vision-lightbox-caption">{selectedItem.caption}</p>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
