import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

type LoveLetterProps = {
  open: boolean
  letterKey: number
  musicOn: boolean
  onToggleMusic: () => void
  onGoCelebrate: () => void
}

export default function LoveLetter({
  open,
  letterKey,
  musicOn,
  onToggleMusic,
  onGoCelebrate,
}: LoveLetterProps) {
  const letterText = useMemo(
    () =>
      `On this beautiful Eid, I just want to say that you are the most precious part of my life.\n\nEvery time I think of you, my heart feels calmer, warmer, and stronger.\nYou make ordinary moments shine, and you turn “someday” into “right now.”\n\nI pray Allah keeps you close to me always.\nEid Mubarak, my love ❤️`,
    [],
  )

  const [typed, setTyped] = useState('')
  const [audioError, setAudioError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!open) {
      setTyped('')
      return
    }

    setTyped('')
    const startDelay = 200
    const tickMs = 22
    const startedAt = Date.now() + startDelay

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const i = Math.max(0, Math.min(letterText.length, Math.floor(elapsed / tickMs)))
      setTyped(letterText.slice(0, i))
      if (i >= letterText.length) window.clearInterval(interval)
    }, 30)

    return () => window.clearInterval(interval)
  }, [open, letterKey, letterText])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    setAudioError(null)
    if (musicOn) {
      audio
        .play()
        .then(() => {})
        .catch(() => setAudioError('Music couldn’t start. Add an MP3 in `public/music/`.'))
    } else {
      audio.pause()
    }
  }, [musicOn])

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <audio ref={audioRef} src="/music/eid-mubarak.mp3" preload="none" />
      <AnimatePresence>
        {open && (
          <motion.div
            key={letterKey}
            initial={{ opacity: 0, y: 26, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-3xl bg-[linear-gradient(120deg,rgba(245,158,11,0.25),rgba(170,59,255,0.20),rgba(245,158,11,0.10))] blur-xl opacity-50" />

            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_10%_0%,rgba(245,158,11,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_90%_10%,rgba(170,59,255,0.20),transparent_55%)]" />

              <div className="relative px-6 py-8 sm:px-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs tracking-widest text-amber-200/70">
                      A DIGITAL LETTER FOR YOU
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                      Eid Mubarak, My Love
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Take a breath. Let the words arrive like a warm hug.
                    </p>
                  </div>

                  <div className="flex items-center justify-start gap-3">
                    <button
                      onClick={onToggleMusic}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur hover:border-white/25 hover:bg-white/10 transition"
                      aria-pressed={musicOn}
                      type="button"
                    >
                      {musicOn ? (
                        <FaVolumeUp className="text-amber-200" />
                      ) : (
                        <FaVolumeMute className="text-amber-200" />
                      )}
                      Music
                    </button>
                  </div>
                </div>

                {audioError && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-xs text-rose-200/90"
                  >
                    {audioError}
                  </motion.p>
                )}

                <div className="mt-7">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm text-white/70">
                        <span className="text-amber-200/80">To:</span> My Love
                      </div>
                      <div className="text-xs text-white/50">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-white/85 sm:text-lg">
                      {typed}
                      <motion.span
                        className="inline-block w-[10px]"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.05, repeat: Infinity }}
                      >
                        |
                      </motion.span>
                    </div>

                    <div className="mt-6 text-right text-sm text-white/70">
                      With all my love,
                      <div className="mt-1 text-amber-200/85 font-semibold">Me</div>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      onClick={onGoCelebrate}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-200 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(245,158,11,0.35)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-200"
                      type="button"
                    >
                      <span className="relative">Go to Celebration</span>
                    </button>

                    <p className="text-xs text-white/55">
                      Click when your heart is ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <div className="pt-6 text-center text-white/60">
          Your letter will appear here when you open your heart.
        </div>
      )}
    </div>
  )
}

