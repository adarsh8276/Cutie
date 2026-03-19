import { useEffect, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FaMoon } from 'react-icons/fa'

type HeroProps = {
  onOpenMyHeart: () => void
}

function Starfield({ reducedMotion }: { reducedMotion: boolean }) {
  const stars = useMemo(() => {
    return Array.from({ length: 46 }).map((_, i) => {
      const left = Math.random() * 100
      const top = Math.random() * 100
      const size = 1 + Math.random() * 2.2
      const delay = Math.random() * 4
      const duration = 4 + Math.random() * 6
      const opacity = 0.35 + Math.random() * 0.65
      return { id: `s-${i}`, left, top, size, delay, duration, opacity }
    })
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const parY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    if (reducedMotion) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const nx = (e.clientX / window.innerWidth - 0.5) * 2
        const ny = (e.clientY / window.innerHeight - 0.5) * 2
        mouseX.set(nx * -18)
        mouseY.set(ny * -10)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [mouseX, mouseY, reducedMotion])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ x: parX, y: parY }}
      >
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white/90"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
            }}
            animate={
              reducedMotion
                ? { opacity: s.opacity }
                : { opacity: [0.2, s.opacity, 0.25], y: [0, -10, 0] }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: s.duration,
                    repeat: Infinity,
                    delay: s.delay,
                    ease: 'easeInOut',
                  }
            }
          />
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero({ onOpenMyHeart }: HeroProps) {
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#170022] to-[#05030a]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_15%,rgba(212,175,55,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_75%_25%,rgba(160,82,255,0.18),transparent_52%)]" />

      <Starfield reducedMotion={reducedMotion} />

      {/* Moon */}
      <motion.div
        className="absolute -top-16 right-[-40px] z-0"
        initial={{ opacity: 0, y: -18, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          animate={
            reducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, 6, 0] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.45),rgba(212,175,55,0.0)_55%)] blur-xl" />
          <div className="relative h-44 w-44 sm:h-52 sm:w-52">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(255,255,255,0.35)_45%,rgba(255,255,255,0.08)_70%)] shadow-[0_0_70px_rgba(212,175,55,0.15)]" />
            <div className="absolute -left-2 top-8 h-9 w-9 rounded-full bg-[#170022]/60 blur-sm" />
            <FaMoon className="absolute inset-0 m-auto h-10 w-10 text-yellow-300/70" />
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-wider text-white/75">
            <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.8)]" />
            A romantic Eid wish, just for you
          </p>
        </motion.div>

        <motion.h1
          className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          Eid Mubarak, My Cutieeeee...{' '}
          <span className="text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.45)]">
            ❤️
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          This Eid is more special because you are in my life
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={onOpenMyHeart}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-200 px-7 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(245,158,11,0.35)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[shine_1.2s_ease-in-out]" />
            <span className="relative">Open My Heart</span>
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/70 backdrop-blur">
            <span className="text-amber-300">🌙</span>
            <span>Scroll-stopping animations ahead</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

