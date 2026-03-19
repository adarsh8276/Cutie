import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

const buildUnsplash = (query: string, sig: number) =>
  `https://source.unsplash.com/random/800x650?${encodeURIComponent(
    query,
  )}&sig=${sig}`

export default function Memories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const hoverQuotes = useMemo(
    () => ['My Eid', 'Forever Yours', 'Love Always', 'Heart Speaks', 'Eid Magic', 'My Universe'],
    [],
  )

  const memories = useMemo(() => {
    // Add more images into `react/public/` then update this list.
    // Tip: include each filename exactly as it appears in `react/public/`.
    const localFileNames = [
      'images.jpg',
      'WhatsApp Image 2026-03-19 at 9.26.40 PM.jpeg',
      'WhatsApp Image 2026-03-19 at 9.26.41 PM.jpeg',
      'WhatsApp Image 2026-03-19 at 9.26.42 PM.jpeg',
      'WhatsApp Image 2026-03-19 at 9.26.43 PM.jpeg',
      'WhatsApp Image 2026-03-19 at 9.26.44 PM.jpeg',
      'WhatsApp Image 2026-03-19 at 9.26.46 PM.jpeg',
      'WhatsApp Image 2026-03-19 at 9.27.13 PM.jpeg',
      'WhatsApp Image 2026-03-19 at 9.27.14 PM (1).jpeg',
      'WhatsApp Image 2026-03-19 at 9.27.14 PM.jpeg',
    ]

    const localImages = localFileNames.map((name, i) => ({
      id: `local-${i + 1}`,
      url: `/${encodeURIComponent(name)}`,
      alt: `Saved memory ${i + 1}`,
    }))

    const fallbackImages = [
      { id: 'm2', url: buildUnsplash('eid,love,digital', 1), alt: 'Romantic Eid' },
      { id: 'm3', url: buildUnsplash('moon,night,love', 2), alt: 'Moon and love' },
      { id: 'm4', url: buildUnsplash('lanterns,romance,eid', 3), alt: 'Lanterns in the dark' },
      { id: 'm5', url: buildUnsplash('hands,dua,heart', 4), alt: 'Dua and heart' },
      { id: 'm6', url: buildUnsplash('flowers,romance,eid', 5), alt: 'Flowers and romance' },
      { id: 'm7', url: buildUnsplash('stars,night,love', 6), alt: 'Stars in the night' },
      { id: 'm8', url: buildUnsplash('sweet,couple,eid', 7), alt: 'A loving couple' },
      { id: 'm9', url: buildUnsplash('gold,glow,eid,love', 8), alt: 'Gold glow love' },
    ]

    return [...localImages, ...fallbackImages].slice(0, 9)
  }, [])

  return (
    <section className="relative py-16 sm:py-20">
      <FadeInSection className="mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-widest text-amber-200/70">MEMORIES</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Little moments</h2>
          </div>
          <p className="text-sm text-white/60 sm:max-w-[420px]">
            Hover for a gentle zoom. Each image is a mood for us.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.4)]"
              onMouseEnter={() => setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.img
                src={m.url}
                alt={m.alt}
                loading="lazy"
                className="h-56 w-full object-cover sm:h-52"
                animate={{
                  scale: hoveredId === m.id ? 1.08 : 1,
                  filter: hoveredId === m.id ? 'blur(0.2px) brightness(0.9)' : 'blur(0px) brightness(1)',
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === m.id ? 1 : 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0"
              />

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: hoveredId === m.id ? 1 : 0,
                  y: hoveredId === m.id ? 0 : 8,
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute inset-0 flex items-end p-4"
              >
                <div className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-widest text-amber-200/70">
                    {hoverQuotes[idx % hoverQuotes.length]}
                  </p>
                  <p className="mt-1 text-sm text-white/80"></p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}

