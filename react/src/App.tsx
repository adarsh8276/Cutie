import { useMemo, useRef, useState } from 'react'
import Hero from './components/Hero'
import LoveLetter from './components/LoveLetter'
import Quotes from './components/Quotes'
import Celebration from './components/Celebration'
import Memories from './components/Memories'
import FinalMessage from './components/FinalMessage'
import CursorGlow from './components/CursorGlow'
import { motion } from 'framer-motion'

export default function App() {
  const letterSectionRef = useRef<HTMLDivElement | null>(null)
  const celebrateSectionRef = useRef<HTMLDivElement | null>(null)
  const quotesSectionRef = useRef<HTMLDivElement | null>(null)

  const [letterOpen, setLetterOpen] = useState(false)
  const [letterKey, setLetterKey] = useState(0)

  const [musicOn, setMusicOn] = useState(false)
  const [celebrationTrigger, setCelebrationTrigger] = useState(0)

  const canScroll = useMemo(() => true, [])

  const scrollToEl = (el: HTMLElement | null | undefined) => {
    if (!canScroll || !el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onOpenMyHeart = () => {
    setLetterOpen(true)
    setLetterKey((k) => k + 1)
    setMusicOn(true) // Start music right after user click (autoplay-friendly)
    requestAnimationFrame(() => scrollToEl(letterSectionRef.current))
  }

  const onGoCelebrate = () => {
    requestAnimationFrame(() => scrollToEl(celebrateSectionRef.current))
  }

  const onCelebrate = () => {
    setCelebrationTrigger((t) => t + 1)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="bg-noise" />
      <CursorGlow />

      <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <div className="text-sm font-semibold text-white/80">
            Eid Mubarak
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToEl(letterSectionRef.current)}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur transition hover:bg-white/10 hover:border-white/25"
            >
              Letter
            </button>
            <button
              type="button"
              onClick={() => scrollToEl(quotesSectionRef.current)}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur transition hover:bg-white/10 hover:border-white/25"
            >
              Quotes
            </button>
            <button
              type="button"
              onClick={() => scrollToEl(celebrateSectionRef.current)}
              className="rounded-full border border-amber-200/30 bg-amber-200/10 px-4 py-2 text-xs text-amber-200 backdrop-blur transition hover:bg-amber-200/15"
            >
              Celebrate
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero onOpenMyHeart={onOpenMyHeart} />

        <motion.div ref={letterSectionRef} id="letter" className="relative">
          <div className="py-14 sm:py-16">
            <LoveLetter
              open={letterOpen}
              letterKey={letterKey}
              musicOn={musicOn}
              onToggleMusic={() => setMusicOn((v) => !v)}
              onGoCelebrate={onGoCelebrate}
            />
          </div>
        </motion.div>

        <div ref={quotesSectionRef} id="quotes" />
        <Quotes />

        <div ref={celebrateSectionRef} id="celebrate" />
        <Celebration trigger={celebrationTrigger} onCelebrate={onCelebrate} />

        <Memories />
        <FinalMessage />

        <footer className="pb-12 text-center text-xs text-white/45">
          Made with love. Eid Mubarak.
        </footer>
      </main>
    </div>
  )
}

