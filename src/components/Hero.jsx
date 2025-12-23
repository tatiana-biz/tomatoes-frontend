import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function Hero() {
  const [inView, setInView] = useState(false)
  const observeRef = useRef(null)

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

  // Parallax tilt + scroll motion
  const cardRef = useRef(null)
  const [parallax, setParallax] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const onMouseMove = (e) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
      const y = clamp((e.clientY - rect.top) / rect.height, 0, 1)
      setParallax({ x, y })
    }
    const onScroll = () => setScrollY(window.scrollY || 0)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [prefersReducedMotion])

  // Subtle ambient animation tick
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion) return
    let raf
    const loop = () => {
      setTick((t) => (t + 1) % 10000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [prefersReducedMotion])

  const maxTilt = 9 // degrees
  const rotateX = prefersReducedMotion ? 0 : (0.5 - parallax.y) * maxTilt
  const rotateY = prefersReducedMotion ? 0 : (parallax.x - 0.5) * maxTilt
  const rollZ = prefersReducedMotion ? 0 : Math.sin(tick / 140) * 1.2 + clamp(scrollY * 0.01, -3, 3)
  const liftY = prefersReducedMotion ? 0 : Math.sin(tick / 120) * 6 + clamp(scrollY * 0.06, -22, 22)

  // Parallax offsets for inner glow layers
  const glowOffsetX = prefersReducedMotion ? 0 : (parallax.x - 0.5) * 14
  const glowOffsetY = prefersReducedMotion ? 0 : (parallax.y - 0.5) * 14

  return (
    <section className="relative overflow-hidden pt-28" ref={observeRef}>
      {/* Global page gradients */}
      <div className="absolute inset-0 opacity-35">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_0%,rgba(34,211,238,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_80%_0%,rgba(59,130,246,0.16),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy column */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
              For founders in fintech & consulting
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
              We are a business automation agency. Building for speed and confidence — from day one.
            </p>
          </div>

          {/* Visual column (interactive neon card with parallax & scroll motion) */}
          <div className="relative h-[520px] w-full">
            <div
              ref={cardRef}
              className={`relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/20 backdrop-blur-lg transition-opacity duration-500 ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Ambient washes following cursor */}
              <div
                className="pointer-events-none absolute -inset-10"
                style={{
                  transform: `translate3d(${glowOffsetX}px, ${glowOffsetY}px, 0)`,
                  transition: prefersReducedMotion ? 'transform 300ms ease-out' : 'transform 90ms ease-out',
                }}
              >
                <div className="absolute inset-0" style={{
                  background:
                    'radial-gradient(260px_220px_at_30%_30%, rgba(34,211,238,0.18), transparent 70%), radial-gradient(340px_260px_at_70%_65%, rgba(59,130,246,0.20), transparent 70%)',
                  filter: 'blur(10px)',
                  opacity: 0.45,
                }} />
                <div className="absolute inset-0" style={{
                  background:
                    'radial-gradient(280px_280px_at_50%_50%, rgba(255,255,255,0.06), transparent 70%)',
                  filter: 'blur(18px)',
                  opacity: 0.35,
                }} />
              </div>

              {/* Card container with perspective */}
              <div className="absolute left-1/2 top-1/2 w-[740px] max-w-full -translate-x-1/2 -translate-y-1/2">
                <div
                  className="relative w-full rounded-2xl"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="relative w-full overflow-hidden rounded-2xl"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translateY(${liftY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rollZ}deg)`,
                      transition: prefersReducedMotion ? 'transform 300ms ease-out' : 'transform 75ms ease-out',
                      boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Image inside the animated card */}
                    <img
                      src="https://flamesimagestorage.blob.core.windows.net/files/c804a46c-c7fe-492b-9049-2cc7f565f6b2_1766478910387_prj_stpc6td2/732a8a6d-43d0-4cd4-bc7b-f2885248c8c1-bluetomatoes.jpeg"
                      alt="Hero visual"
                      className="block h-auto w-full"
                      style={{
                        display: 'block',
                        background: 'linear-gradient(180deg, rgba(2,6,23,0.9), rgba(10,12,20,0.9))',
                      }}
                    />

                    {/* Soft image overlay to blend with theme */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                      }}
                    />

                    {/* Soft inner ring */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
