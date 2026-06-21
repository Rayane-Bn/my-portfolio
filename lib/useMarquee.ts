"use client";

import { useEffect, useRef } from "react";

/**
 * Drives one marquee row by directly writing `transform` on every frame,
 * instead of a CSS `@keyframes` loop. Two problems that caused with the
 * CSS version, both fixed by this:
 *
 * 1. "Resets / jumps" — a CSS animation restarts from 0% any time the
 *    element re-renders, which looks like a visible snap. Here, position
 *    lives in a ref that nothing ever discards, and "pausing" just stops
 *    calling requestAnimationFrame — the transform is left exactly where
 *    it was, so resuming is seamless.
 * 2. "Feels empty" — the old version translated by a fixed -50%, which
 *    only works if the row is duplicated *exactly* twice. On a very wide
 *    screen the duplicated content could end up barely wider than the
 *    row itself, so there wasn't enough buffer before the wrap. This
 *    version measures the real rendered width of one copy and wraps
 *    against that, so it's correct regardless of how many copies the
 *    caller renders or how wide the row is.
 */
export function useMarquee(
  trackRef: React.RefObject<HTMLDivElement | null>,
  options: { speed: number; paused: boolean; copies: number },
) {
  const position = useRef(0);
  const pausedRef = useRef(options.paused);
  const speedRef = useRef(options.speed);

  useEffect(() => {
    pausedRef.current = options.paused;
  }, [options.paused]);

  useEffect(() => {
    speedRef.current = options.speed;
  }, [options.speed]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let copyWidth = track.scrollWidth / options.copies;

    const measure = () => {
      copyWidth = track.scrollWidth / options.copies;
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    function frame(now: number) {
      const dt = now - last;
      last = now;

      if (!pausedRef.current && copyWidth > 0) {
        position.current -= speedRef.current * (dt / 1000);
        if (position.current <= -copyWidth) position.current += copyWidth;
        if (position.current > 0) position.current -= copyWidth;
        track!.style.transform = `translateX(${position.current}px)`;
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [trackRef, options.copies]);
}
