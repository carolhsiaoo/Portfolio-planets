'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const STAGGER = 0.025

const TextRoll: React.FC<{
  children: string
  className?: string
  center?: boolean
}> = ({ children, className, center = false }) => {
  const [variant, setVariant] = useState<'initial' | 'hovered'>('initial')
  const isHovering = useRef(false)
  const rollInDone = useRef(false)
  const locked = useRef(false)

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true
    if (locked.current) return
    locked.current = true
    rollInDone.current = false
    setVariant('hovered')
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false
    // Only roll back if the roll-in already finished
    if (rollInDone.current) {
      setVariant('initial')
    }
  }, [])

  const handleAnimationComplete = useCallback(() => {
    if (!rollInDone.current) {
      // Roll-in just finished
      rollInDone.current = true
      if (!isHovering.current) {
        // Mouse already left — roll back now
        setVariant('initial')
      }
    } else {
      // Roll-back just finished — unlock for next hover
      locked.current = false
      rollInDone.current = false
    }
  }, [])

  return (
    <motion.span
      className={cn('relative block overflow-hidden', className)}
      style={{ lineHeight: 0.75 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={variant}
    >
      <span className="block">
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: '-100%' },
              }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block"
              key={i}
              {...(i === children.length - 1 && {
                onAnimationComplete: handleAnimationComplete,
              })}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          )
        })}
      </span>
      <span className="absolute inset-0">
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              variants={{
                initial: { y: '100%' },
                hovered: { y: 0 },
              }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block"
              key={i}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          )
        })}
      </span>
    </motion.span>
  )
}

export default TextRoll
