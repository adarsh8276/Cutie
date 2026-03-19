import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import FadeInSection from './FadeInSection'

type CelebrationProps = {
  trigger: number
  onCelebrate: () => void
}

function usePrefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function ConfettiCanvas({ run }: { run: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!run) return
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = usePrefersReducedMotion()
    if (reducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1))
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const colors = ['#FDE68A', '#F59E0B', '#C084FC', '#FB7185', '#E9D5FF']
    const count = 240

    const w = window.innerWidth
    const h = window.innerHeight

    const particles = Array.from({ length: count }).map(() => {
      const x = w * 0.5 + (Math.random() - 0.5) * w * 0.8
      return {
        x,
        y: h * 0.55 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 6,
        vy: -6 - Math.random() * 7,
        size: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    })

    const gravity = 0.55
    const drag = 0.99
    const start = performance.now()
    const duration = 2800

    let raf = 0
    const tick = () => {
      const now = performance.now()
      const t = now - start

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.vy += gravity
        p.vx *= drag
        p.vy *= drag
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr

        const life = 1 - Math.min(1, t / duration)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.max(0, Math.min(1, life))
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.45)
        ctx.restore()
      }

      if (t < duration) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [run])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden="true"
    />
  )
}

function FloatingHearts({ run }: { run: number }) {
  const reducedMotion = usePrefersReducedMotion()

  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      return {
        id: `h-${i}`,
        left: 10 + Math.random() * 80,
        top: 70 + Math.random() * 20,
        drift: (Math.random() - 0.5) * 120,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 0.55,
        duration: 1.6 + Math.random() * 1.3,
      }
    })
  }, [])

  return (
    <AnimatePresence>
      {run ? (
        <motion.div
          key={run}
          className="pointer-events-none fixed inset-0 z-[55]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {reducedMotion
            ? null
            : hearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.9 }}
                  animate={{ opacity: 1, y: -220, x: h.drift, scale: 1.12 }}
                  transition={{
                    duration: h.duration,
                    delay: h.delay,
                    ease: 'easeOut',
                  }}
                  exit={{ opacity: 0 }}
                  style={{ left: `${h.left}%`, top: `${h.top}%` }}
                  className="absolute"
                >
                  <FaHeart
                    className="drop-shadow-[0_8px_18px_rgba(251,113,133,0.35)] text-rose-200"
                    style={{ fontSize: h.size }}
                  />
                </motion.div>
              ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function Celebration({ trigger, onCelebrate }: CelebrationProps) {
  return (
    <section className="relative py-16 sm:py-20">
      <FadeInSection className="mx-auto w-full max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(251,113,133,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_85%_20%,rgba(245,158,11,0.18),transparent_60%)]" />

          <div className="relative px-6 py-10 sm:px-10">
            <p className="text-xs tracking-widest text-amber-200/70">
              CELEBRATION ANIMATION
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Confetti for our Eid
            </h2>
            <p className="mt-3 max-w-[520px] text-sm leading-relaxed text-white/65">
              Press the button and let a little magic fall from the sky.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onCelebrate}
                type="button"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-200 px-7 py-3 text-sm font-semibold text-black shadow-[0_0_34px_rgba(245,158,11,0.42)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-200"
              >
                <span className="relative">
                  Celebrate with Me
                  <span className="ml-2 inline-block align-middle text-amber-900">
                    🎆
                  </span>
                </span>
              </button>

              <p className="text-xs text-white/55">
                Tip: click again to replay the celebration.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      <ConfettiCanvas run={trigger} />
      <FloatingHearts run={trigger} />
    </section>
  )
}

