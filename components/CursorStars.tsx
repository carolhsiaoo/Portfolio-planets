'use client'

import { useEffect, useRef, useState } from 'react'

interface StarVideo {
  id: number
  x: number
  y: number
  createdAt: number
}

export default function CursorStars() {
  const [stars, setStars] = useState<StarVideo[]>([])
  const nextIdRef = useRef(0)
  const videoPoolRef = useRef<HTMLVideoElement[]>([])
  const [isSafari, setIsSafari] = useState(false)

  // Detect Safari and disable effect
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isSafariBrowser = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium')
    setIsSafari(isSafariBrowser)
  }, [])

  // Preload video into pool
  useEffect(() => {
    // Skip preloading for Safari
    if (isSafari) return

    // Create a pool of 5 video elements for reuse
    for (let i = 0; i < 5; i++) {
      const video = document.createElement('video')
      video.src = '/videos/star-pop.webm'
      video.playsInline = true
      video.muted = true
      video.preload = 'auto'
      // Speed up 3 seconds to 0.6 seconds: 3 / 0.6 = 5x speed
      video.playbackRate = 5.0
      videoPoolRef.current.push(video)
    }

    return () => {
      videoPoolRef.current.forEach(video => {
        video.src = ''
      })
      videoPoolRef.current = []
    }
  }, [isSafari])

  useEffect(() => {
    // Disable effect for Safari
    if (isSafari) return

    let timeout: NodeJS.Timeout | null = null
    let lastX = 0
    let lastY = 0
    let currentTarget: HTMLElement | null = null

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Check if hovering over interactive elements
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') !== null

      // Get the actual interactive element
      const interactiveElement =
        target.tagName === 'A' || target.tagName === 'BUTTON'
          ? target
          : target.closest('a') || target.closest('button') || target.closest('.cursor-pointer')

      // Calculate distance moved
      const distanceMoved = Math.sqrt(
        Math.pow(event.clientX - lastX, 2) + Math.pow(event.clientY - lastY, 2)
      )

      // Only trigger if:
      // 1. We're on an interactive element AND
      // 2. No timeout is active AND
      // 3. Either we just entered a new element OR moved significantly (>50px)
      const shouldTrigger =
        isInteractive &&
        !timeout &&
        (currentTarget !== interactiveElement || distanceMoved > 50)

      if (shouldTrigger) {
        // Throttle to every 300ms (increased from 150ms)
        timeout = setTimeout(() => {
          timeout = null
        }, 300)

        lastX = event.clientX
        lastY = event.clientY
        currentTarget = interactiveElement

        // Create new star
        const newStar: StarVideo = {
          id: nextIdRef.current++,
          x: event.clientX,
          y: event.clientY,
          createdAt: Date.now()
        }

        setStars(prev => {
          // Keep only the last 3 stars for performance
          const updated = [...prev, newStar]
          return updated.slice(-3)
        })
      }

      // Reset current target when leaving interactive elements
      if (!isInteractive) {
        currentTarget = null
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Clean up old stars
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setStars(prev => prev.filter(star => now - star.createdAt < 700))
    }, 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(cleanupInterval)
      if (timeout) clearTimeout(timeout)
    }
  }, [isSafari])

  return (
    <div className="fixed inset-0 pointer-events-none z-100">
      {stars.map(star => (
        <StarVideo key={star.id} star={star} />
      ))}
    </div>
  )
}

function StarVideo({ star }: { star: StarVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      // Speed up 3 seconds to 0.6 seconds: 3 / 0.6 = 5x speed
      videoRef.current.playbackRate = 5.0
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [])

  return (
    <div
      className="absolute star-video-container"
      style={{
        left: star.x - 75, // Center the 150px video on cursor
        top: star.y - 75,
        width: '150px',
        height: '150px'
      }}
    >
      <video
        ref={videoRef}
        className="star-video"
        playsInline
        muted
        preload="auto"
        style={{
          mixBlendMode: 'screen',
          opacity: 0.95
        }}
      >
        <source src="/videos/star-pop.webm" type="video/webm" />
        <source src="/videos/star-pop.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
