'use client'

import { useEffect, useRef } from 'react'

interface StarPosition {
  x: number
  y: number
}

const SIZE = 150

export default function StarPopEffect({ star }: { star: StarPosition }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const video = document.createElement('video')
    video.playsInline = true
    video.muted = true

    // Use mp4 for Safari, webm for others
    const ua = navigator.userAgent.toLowerCase()
    const isSafari = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium')
    video.src = isSafari ? '/videos/star-pop.mp4' : '/videos/star-pop.webm'

    let animationId: number

    const draw = () => {
      if (video.paused || video.ended) return

      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.drawImage(video, 0, 0, SIZE, SIZE)

      const imageData = ctx.getImageData(0, 0, SIZE, SIZE)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Use luminance to determine alpha — dark pixels become transparent
        const brightness = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
        data[i + 3] = Math.min(255, brightness * 3)
      }

      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(draw)
    }

    video.addEventListener('play', () => {
      animationId = requestAnimationFrame(draw)
    })

    video.playbackRate = 5.0
    video.currentTime = 0
    video.play().catch(() => {})

    return () => {
      cancelAnimationFrame(animationId)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  return (
    <div
      className="absolute star-video-container pointer-events-none"
      style={{
        left: star.x - SIZE / 2,
        top: star.y - SIZE / 2,
        width: SIZE,
        height: SIZE,
      }}
    >
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="w-full h-full"
      />
    </div>
  )
}
