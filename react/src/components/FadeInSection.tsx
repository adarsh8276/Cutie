import type { PropsWithChildren } from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type FadeInSectionProps = PropsWithChildren<{
  className?: string
  delayMs?: number
}>

export default function FadeInSection({
  className,
  delayMs = 0,
  children,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.65, delay: delayMs / 1000, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

