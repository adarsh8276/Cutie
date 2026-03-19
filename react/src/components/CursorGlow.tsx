import { useEffect, useMemo, useState } from 'react'

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)

  const isFinePointer = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(pointer: fine)').matches
  }, [])

  useEffect(() => {
    setEnabled(isFinePointer)
    if (!isFinePointer) return

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const commit = () => {
      raf = 0
      document.documentElement.style.setProperty('--cursor-x', `${x}px`)
      document.documentElement.style.setProperty('--cursor-y', `${y}px`)
    }

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (raf) return
      raf = window.requestAnimationFrame(commit)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [isFinePointer])

  return (
    <div
      aria-hidden="true"
      className={`cursor-glow ${enabled ? 'is-enabled' : ''}`}
    />
  )
}

