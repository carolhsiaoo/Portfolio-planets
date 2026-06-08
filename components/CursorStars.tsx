'use client'

import { useEffect, useRef, useState } from 'react'
import StarPopEffect from './StarPopEffect'

interface StarVideo {
  id: number
  x: number
  y: number
  createdAt: number
}

export default function CursorStars() {
  const [stars, setStars] = useState<StarVideo[]>([])
  const nextIdRef = useRef(0)

  const [isSmallDevice, setIsSmallDevice] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    setIsSmallDevice(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsSmallDevice(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isSmallDevice) return

    let timeout: NodeJS.Timeout | null = null
    let lastX = 0
    let lastY = 0
    let currentTarget: HTMLElement | null = null

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') !== null

      const interactiveElement =
        target.tagName === 'A' || target.tagName === 'BUTTON'
          ? target
          : target.closest('a') || target.closest('button') || target.closest('.cursor-pointer')

      const distanceMoved = Math.sqrt(
        Math.pow(event.clientX - lastX, 2) + Math.pow(event.clientY - lastY, 2)
      )

      const shouldTrigger =
        isInteractive &&
        !timeout &&
        (currentTarget !== interactiveElement || distanceMoved > 50)

      if (shouldTrigger) {
        timeout = setTimeout(() => {
          timeout = null
        }, 300)

        lastX = event.clientX
        lastY = event.clientY
        currentTarget = interactiveElement

        const newStar: StarVideo = {
          id: nextIdRef.current++,
          x: event.clientX,
          y: event.clientY,
          createdAt: Date.now()
        }

        setStars(prev => {
          const updated = [...prev, newStar]
          return updated.slice(-3)
        })
      }

      if (!isInteractive) {
        currentTarget = null
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setStars(prev => prev.filter(star => now - star.createdAt < 700))
    }, 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(cleanupInterval)
      if (timeout) clearTimeout(timeout)
    }
  }, [isSmallDevice])

  return (
    <div className="fixed inset-0 pointer-events-none z-100">
      {stars.map(star => (
        <StarPopEffect key={star.id} star={star} />
      ))}
    </div>
  )
}
