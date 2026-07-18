"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [main, setMain] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 3s, pause on hover
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setMain((current) => (current + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isPaused, images.length]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — zoom on hover, auto-slides */}
      <div
        className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-[var(--color-surface)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Image
          key={images[main]}
          src={images[main] ?? ""}
          alt={`${title} screenshot ${(main ?? 0) + 1}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          priority
        />

        {/* Slide counter */}
        {images.length > 1 && (
          <span className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-white backdrop-blur-sm">
            {main + 1} / {images.length}
          </span>
        )}

        {/* Progress dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setMain(i); setIsPaused(true); }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === main
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => { setMain(i); setIsPaused(true); }}
              aria-label={`View screenshot ${i + 1}`}
              className={`group relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                i === main
                  ? "border-[var(--color-accent)]"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] cursor-pointer"/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}