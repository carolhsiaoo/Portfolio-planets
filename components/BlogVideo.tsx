'use client'

import { useEffect, useRef, useState } from 'react';

type BlogVideoProps = {
  src: string;
  autoplay?: boolean;
  className?: string;
};

/**
 * Memory-safe video for blog posts.
 *
 * Blog videos are served raw from Sanity (some are 30 MB+). Rendering them
 * with a plain `<video autoPlay>` makes the browser download, decode and loop
 * the whole file in memory the moment the page loads — several at once will
 * crash the tab on phones / Safari. This component:
 *   - never preloads (`preload="none"`), so nothing downloads until needed
 *   - only attaches the source once the video scrolls near the viewport
 *   - for autoplay videos, plays when visible and *unloads* when scrolled away,
 *     freeing the decoded frames so memory doesn't pile up down a long post
 */
export default function BlogVideo({ src, autoplay, className = 'w-full' }: BlogVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (inView) {
      // Attach the source lazily the first time it comes into view.
      if (el.getAttribute('src') !== src) {
        el.setAttribute('src', src);
        el.load();
      }
      if (autoplay) {
        // Set these imperatively *before* play(): on the first (soft) navigation
        // the React `muted` prop can lag the play() call, so the browser's
        // autoplay policy blocks it and the video stays a blank frame until a
        // reload. Forcing them here makes autoplay reliable on first view.
        el.muted = true;
        el.playsInline = true;
        const tryPlay = () => el.play().catch(() => {});
        tryPlay();
        // If play() raced ahead of the first decoded frame, retry once it's ready.
        el.addEventListener('loadeddata', tryPlay, { once: true });
      }
    } else {
      el.pause();
      // Only autoplay videos get fully unloaded — a manually-played video may
      // be paused mid-watch, so keep its buffer.
      if (autoplay && el.getAttribute('src')) {
        el.removeAttribute('src');
        el.load();
      }
    }
  }, [inView, src, autoplay]);

  return (
    <video
      ref={ref}
      muted={autoplay}
      loop={autoplay}
      controls={!autoplay}
      playsInline
      preload="none"
      className={className}
      // Dark placeholder so the element never flashes the white page behind it
      // before the first frame is decoded (these clips are dark).
      style={{ backgroundColor: '#0a0a0a' }}
    />
  );
}
