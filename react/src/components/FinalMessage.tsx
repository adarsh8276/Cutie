import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import FadeInSection from './FadeInSection'

export default function FinalMessage() {
  return (
    <section className="relative py-20 sm:py-28">
      <FadeInSection className="mx-auto w-full max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_15%,rgba(245,158,11,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_85%_30%,rgba(170,59,255,0.20),transparent_58%)]" />

          <div className="relative px-6 py-12 sm:px-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <p className="text-xs tracking-widest text-amber-200/70">
                  FINAL MESSAGE
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  I am grateful for you every single day. Eid Mubarak, my love{' '}
                  <span className="text-rose-200" aria-hidden="true">
                    ❤️
                  </span>
                </h2>
              </div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,113,133,0.30),transparent_60%)] blur-xl" />
                  <FaHeart className="relative text-rose-200" style={{ fontSize: 46 }} />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/70"
            >
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.7)]" />
              Made with love for you
            </motion.div>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}

