import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function Hero() {
  const [inView, setInView] = useState(false)
  const [progress, setProgress] = useState(0)
  const observeRef = useRef(null)
  const stageRef = useRef(null)

  // Switch back to our very initial default visual
  const FALLBACK_HERO_URL =
    'https://flamesimagestorage.blob.core.windows.net/files/b3060c4d-4ed8-488e-a227-a906795778ee_1766425472901_prj_stpc6td2/fd3a6d49-286b-4e43-a018-0ba6b6c545f6-bluetomatoes.jpeg'
  const heroImageUrl = FALLBACK_HERO_URL

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Observe visibility (fade-in)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setInView(entry.isIntersecting)
      },
      { threshold: 0 }
    )
    if (observeRef.current) obs.observe(observeRef.current)
    return () => obs.disconnect()
  }, [])

  // Robust scroll progress
  useEffect(() => {
    const el = observeRef.current
    if (!el) return
    const rect0 = el.getBoundingClientRect()
    const scrollTop0 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const elTopPage = rect0.top + scrollTop0

    const update = () => {
      const vh = window.innerHeight || 800
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const scrolledPastTop = scrollTop - elTopPage
      const range = vh * 0.9
      const p = clamp(scrolledPastTop / range, 0, 1)
      setProgress(p)
    }
    const onScroll = () => requestAnimationFrame(update)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Pointer parallax + hover boost
  const [pointerTilt, setPointerTilt] = useState({ x: 0, y: 0 })
  const [hoverActive, setHoverActive] = useState(false)
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const nx = clamp(dx / (rect.width / 2), -1, 1)
      const ny = clamp(dy / (rect.height / 2), -1, 1)
      const factor = prefersReducedMotion ? 0.35 : 1
      setPointerTilt({ x: ny * 12 * factor, y: -nx * 16 * factor })
    }
    const onEnter = () => setHoverActive(true)
    const onLeave = () => {
      setHoverActive(false)
      setPointerTilt({ x: 0, y: 0 })
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReducedMotion])

  // Motion bounds
  const baseMotion = prefersReducedMotion ? 0.6 : 1.6
  const hoverBoost = hoverActive ? 1.3 : 1
  const motionFactor = baseMotion * hoverBoost
  const rotX = progress * 12 * motionFactor + pointerTilt.x
  const rotY = progress * 16 * motionFactor + pointerTilt.y
  const transY = progress * 24 * motionFactor
  const scaleUp = 1 + progress * 0.12 * motionFactor

  // Neon intensity tied to progress
  const neonIntensity = prefersReducedMotion ? 0.5 + progress * 0.2 : 0.6 + progress * 0.35

  return (
    <section className="relative overflow-hidden pt-28" ref={observeRef}>
      {/* Global page gradients */}
      <div className="absolute inset-0 opacity-35">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_0%,rgba(34,211,238,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_80%_0%,rgba(59,130,246,0.16),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy column (updated to screenshot style + copy) */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
              For founders in tech, fintech and AI
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Quietly powerful business automation
            </h1>
            <p className="mt-4 text-base text-blue-100/90 sm:text-lg">
              Systems that feel engineered, not cobbled together. Launch faster, operate leaner, and scale with confidence — from payments to onboarding to AI-enabled workflows.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="/contact#book-a-call" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-105">
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/solutions" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/15 hover:text-white">
                Explore Solutions
              </a>
            </div>
            {/* Supporting line */}
            <p className="mt-7 text-sm text-blue-200/80">
              Built for speed and confidence — from day one.
            </p>
          </div>

          {/* Visual column: image card with subtle neon edge (default image) */}
          <div className="relative h-[520px] w-full">
            <div
              ref={stageRef}
              className={`relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/20 backdrop-blur will-change-transform transition-opacity duration-500 ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
            >
              {/* Stage background + subtle neon wash */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(220px_220px_at_35%_35%, rgba(34,211,238,0.22), transparent 70%), radial-gradient(260px_260px_at_70%_65%, rgba(59,130,246,0.22), transparent 70%)',
                    filter: 'blur(6px)',
                    opacity: 0.35 + progress * 0.25,
                    transition: prefersReducedMotion ? 'opacity 280ms ease-out' : 'opacity 140ms ease-out',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                  }}
                />
              </div>

              {heroImageUrl && (
                <div
                  className="absolute left-1/2 top-1/2 h-[380px] w-[620px] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${transY}px) scale(${scaleUp})`,
                    transformStyle: 'preserve-3d',
                    transition: prefersReducedMotion ? 'transform 280ms ease-out' : 'transform 140ms ease-out',
                    willChange: 'transform',
                  }}
                >
                  <img
                    src={heroImageUrl}
                    alt="Hero visual"
                    className="h-full w-full rounded-[24px] object-cover"
                    style={{
                      boxShadow:
                        '0 28px 70px rgba(0,0,0,0.48), inset 0 0 0 1px rgba(255,255,255,0.06)',
                    }}
                  />
                  {/* Subtle neon edge accent on top-left */}
                  <div
                    className="pointer-events-none absolute left-4 right-28 top-5 h-[2px] rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(56,189,248,0.0), rgba(56,189,248,0.95), rgba(59,130,246,0.95), rgba(59,130,246,0.0))',
                      filter: 'blur(6px)',
                      opacity: 0.42 + neonIntensity * 0.32,
                    }}
                  />
                  {/* Soft border */}
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/10" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
