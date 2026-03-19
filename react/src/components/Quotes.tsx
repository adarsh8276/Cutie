import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

const quotes = [
  { text: 'You are my Eid, my happiness, my forever', accent: 'amber' },
  { text: 'Every moment with you feels like a celebration', accent: 'violet' },
  { text: 'Eid is beautiful, but you make it magical', accent: 'rose' },
]

export default function Quotes() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [paused])

  const active = quotes[index]

  const accentClass =
    active.accent === 'amber'
      ? 'text-amber-200'
      : active.accent === 'violet'
        ? 'text-violet-200'
        : 'text-rose-200'

  return (
    <section className="relative py-16 sm:py-20">
      <FadeInSection className="mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-widest text-amber-200/70">
              EID MUBARAK HO MERI CHAND......
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Words that sparkle
            </h2>
          </div>
          <p className="text-sm text-white/60 sm:max-w-[360px]">
            Hover to pause. Let the romance rotate gently.
          </p>
        </div>

        <div className="relative mt-8">
          <div
            className="absolute -inset-2 rounded-3xl bg-[linear-gradient(120deg,rgba(245,158,11,0.18),rgba(170,59,255,0.18),transparent)] blur-xl"
            aria-hidden="true"
          />

          <div
            className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="px-6 py-8 sm:px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      className={`h-2 w-2 rounded-full ${accentClass} shadow-[0_0_20px_rgba(245,158,11,0.35)]`}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <p className="text-xs font-semibold tracking-widest text-white/60">
                      {index + 1} / {quotes.length}
                    </p>
                  </div>

                  <p className="mt-5 text-xl leading-relaxed text-white sm:text-2xl">
                    “
                    <span className={`font-semibold ${accentClass}`}>
                      {active.text}
                    </span>
                    ”
                  </p>

                  <p className="mt-4 text-sm text-white/60">
                    Because loving you feels like Eid every day.
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIndex((i) => (i - 1 + quotes.length) % quotes.length)}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/25"
                    type="button"
                    aria-label="Previous quote"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % quotes.length)}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/25"
                    type="button"
                    aria-label="Next quote"
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 sm:justify-end">
                  {quotes.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === index ? 'bg-amber-200' : 'bg-white/25 hover:bg-white/35'
                      }`}
                      aria-label={`Go to quote ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}

