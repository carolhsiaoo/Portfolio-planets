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
 *   - once started, muted autoplay loops are left running (not paused or
 *     unloaded) when scrolled away: iOS Safari repaints a paused/detached
 *     off-screen video as a black box on return, so keeping it alive avoids that
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
    } else if (!autoplay) {
      // Manual (controls) videos pause when scrolled away. Muted autoplay loops
      // are left running: iOS Safari evicts the decoded frame of a paused or
      // src-detached off-screen <video> and repaints it black on return, so
      // keeping them alive (iOS throttles off-screen playback anyway) avoids the
      // black box. This is also why we no longer remove src here.
      el.pause();
    }
  }, [inView, src, autoplay]);

  return (
    <video
      ref={ref}
      autoPlay={autoplay}
      muted={autoplay}
      loop={autoplay}
      controls={!autoplay}
      playsInline
      // Autoplay clips preload their first frame once the src attaches (near the
      // viewport) so they show a frame instead of a black box; manual videos stay
      // fully lazy. The native `autoplay` attribute above is the primary trigger
      // (reliable for muted inline video, esp. iOS); the JS play() is a backup.
      preload={autoplay ? 'metadata' : 'none'}
      className={className}
      // Dark placeholder so the element never flashes the white page behind it
      // before the first frame is decoded (these clips are dark).
      style={{ backgroundColor: '#0a0a0a' }}
    />
  );
}
