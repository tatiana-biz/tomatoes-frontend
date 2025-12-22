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

  const FALLBACK_HERO_URL =
    'https://flamesimagestorage.blob.core.windows.net/files/b3060c4d-4ed8-488e-a227-a906795778ee_1766425472901_prj_stpc6td2/fd3a6d49-286b-4e43-a018-0ba6b6c545f6-bluetomatoes.jpeg'
  const heroImageUrl = import.meta.env.VITE_HERO_IMAGE_URL || FALLBACK_HERO_URL

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

  // Robust scroll progress: 0 when the section reaches the top of the viewport, 1 after ~90vh of scrolling past it
  useEffect(() => {
    const el = observeRef.current
    if (!el) return
    // Compute the section's page offset once; this remains stable across scrolls
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

  // Motion bounds — stronger on scroll and hover; reduced if user prefers less motion
  const baseMotion = prefersReducedMotion ? 0.6 : 1.6
  const hoverBoost = hoverActive ? 1.3 : 1
  const motionFactor = baseMotion * hoverBoost
  const rotX = progress * 12 * motionFactor + pointerTilt.x
  const rotY = progress * 16 * motionFactor + pointerTilt.y
  const transY = progress * 24 * motionFactor
  const scaleUp = 1 + progress * 0.12 * motionFactor

  // Neon intensity tied to progress
  const neonIntensity = prefersReducedMotion ? 0.5 + progress * 0.2 : 0.6 + progress * 0.35

  // Node constellation (relative to center of the stage)
  const nodes = [
    { x: -48, y: -24, z: 18, size: 74, glow: 0.6 },
    { x: 52, y: -16, z: 24, size: 86, glow: 0.35 },
    { x: -26, y: 36, z: 12, size: 64, glow: 0.4 },
    { x: 64, y: 52, z: 20, size: 72, glow: 0.25 },
    { x: -72, y: 46, z: 28, size: 80, glow: 0.5 },
  ]

  const links = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [0, 4],
  ]

  function separated(node, i) {
    const mag = Math.sqrt(node.x * node.x + node.y * node.y) || 1
    const dirX = node.x / mag
    const dirY = node.y / mag
    const spread = 16 + (i % 3) * 3
    const jitterX = Math.sin(i * 1.2) * 2
    const jitterY = Math.cos(i * 1.1) * 1.5
    const sepX = dirX * spread * progress + jitterX * progress
    const sepY = dirY * spread * progress + jitterY * progress
    const liftZ = node.z + progress * 5
    return { x: node.x + sepX, y: node.y + sepY, z: liftZ }
  }

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
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              For founders in tech, fintech and AI
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Systems that run your business, quietly
            </h1>
            <p className="mt-5 text-base text-blue-100/90 sm:text-lg">
              Blue Tomatoes is a business automation agency you can hire when starting or scaling a new venture. We design and build invisible operations—payments, onboarding, reporting, and AI-enabled workflows—so you can ship faster and focus on the product.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-105">
                Start a project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#solutions" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/15 hover:text-white">
                Explore solutions
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-xs text-blue-200/80">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
                <span>Pragmatic sprints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
                <span>Fintech-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
                <span>AI-enabled workflows</span>
              </div>
            </div>
          </div>

          {/* Visual column: image if provided, else abstract constellation */}
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

              {heroImageUrl ? (
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
                  {/* Neon edge ring */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[24px]"
                    style={{
                      boxShadow:
                        `0 0 0 2px rgba(56,189,248,${0.38 + neonIntensity * 0.28}), 0 0 38px rgba(56,189,248,${0.4 + neonIntensity * 0.28}), 0 0 82px rgba(59,130,246,${0.32 + neonIntensity * 0.24})`,
                      mixBlendMode: 'screen',
                    }}
                  />
                  {/* Brightened brand wash */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[24px]"
                    style={{
                      background:
                        `radial-gradient(closest-side, rgba(34,211,238,${0.22 + neonIntensity * 0.28}), rgba(59,130,246,${0.14 + neonIntensity * 0.22}), transparent 70%)`,
                      mixBlendMode: 'screen',
                      filter: 'blur(4px)'
                    }}
                  />
                  {/* Neon rails: top & bottom */}
                  <div
                    className="pointer-events-none absolute left-6 right-6 top-6 h-[2px] rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(56,189,248,0.95), rgba(59,130,246,0.95), transparent)',
                      filter: 'blur(6px)',
                      opacity: 0.38 + neonIntensity * 0.42,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute left-6 right-6 bottom-6 h-[2px] rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(56,189,248,0.95), rgba(59,130,246,0.95), transparent)',
                      filter: 'blur(6px)',
                      opacity: 0.34 + neonIntensity * 0.38,
                    }}
                  />
                  {/* Neon rails: left & right */}
                  <div
                    className="pointer-events-none absolute top-10 bottom-10 left-6 w-[2px] rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent, rgba(56,189,248,0.95), rgba(59,130,246,0.95), transparent)',
                      filter: 'blur(6px)',
                      opacity: 0.3 + neonIntensity * 0.38,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute top-10 bottom-10 right-6 w-[2px] rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent, rgba(56,189,248,0.95), rgba(59,130,246,0.95), transparent)',
                      filter: 'blur(6px)',
                      opacity: 0.3 + neonIntensity * 0.38,
                    }}
                  />
                  {/* Soft border */}
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/10" />
                </div>
              ) : (
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[520px] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${transY}px) scale(${scaleUp})`,
                    transformStyle: 'preserve-3d',
                    transition: prefersReducedMotion ? 'transform 280ms ease-out' : 'transform 140ms ease-out',
                    willChange: 'transform',
                  }}
                >
                  {/* Neon ring behind constellation */}
                  <div
                    className="absolute inset-0 rounded-[24px]"
                    style={{
                      boxShadow:
                        `0 0 0 2px rgba(56,189,248,${0.34 + neonIntensity * 0.26}), 0 0 48px rgba(56,189,248,${0.36 + neonIntensity * 0.26}), 0 0 92px rgba(59,130,246,${0.3 + neonIntensity * 0.24})`,
                      mixBlendMode: 'screen',
                    }}
                  />

                  {/* SVG connectors */}
                  <svg viewBox="0 0 520 340" className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="connGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(56,189,248,0.85)" />
                        <stop offset="100%" stopColor="rgba(59,130,246,0.85)" />
                      </linearGradient>
                    </defs>
                    {links.map(([a, b], i) => {
                      const A = separated(nodes[a], a)
                      const B = separated(nodes[b], b)
                      const centerX = 260
                      const centerY = 170
                      const cx = centerX + (A.x + B.x) / 2
                      const cy = centerY + (A.y + B.y) / 2
                      const dx = B.x - A.x
                      const dy = B.y - A.y
                      const len = Math.sqrt(dx * dx + dy * dy) || 1
                      const nx = -dy / len
                      const ny = dx / len
                      const curve = (6 + (A.z + B.z) * 0.12) * progress
                      const cpx = cx + nx * curve
                      const cpy = cy + ny * curve
                      const x1 = centerX + A.x
                      const y1 = centerY + A.y
                      const x2 = centerX + B.x
                      const y2 = centerY + B.y
                      const d = `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`

                      return (
                        <path
                          key={`link-${i}`}
                          d={d}
                          stroke="url(#connGradient)"
                          strokeWidth={1.8}
                          fill="none"
                          opacity={0.82}
                          style={{ filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.55))' }}
                        />
                      )}
                    )}
                  </svg>

                  {/* Glass nodes with neon glow */}
                  {nodes.map((n, i) => {
                    const p = separated(n, i)
                    const s = n.size
                    const lift = i % 2 === 0 ? 12 : 7
                    const opacity = 0.2 + progress * 0.08
                    const glowOpacity = clamp(n.glow * (0.38 + progress * 0.65), 0.14, 0.75)
                    return (
                      <div
                        key={`node-${i}`}
                        className="absolute rounded-[24px] border border-white/15 bg-white/10 backdrop-blur will-change-transform"
                        style={{
                          width: s,
                          height: s,
                          left: 260 - s / 2,
                          top: 170 - s / 2,
                          transform: `translate3d(${p.x}px, ${p.y}px, ${p.z + lift}px) scale(${scaleUp})`,
                          boxShadow:
                            `inset 0 0 0 1px rgba(255,255,255,0.06), 0 16px 44px rgba(0,0,0,0.46), 0 0 36px rgba(56,189,248,${0.28 + neonIntensity * 0.28})`,
                          backgroundImage:
                            'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                          opacity,
                          transition: prefersReducedMotion ? 'transform 280ms ease-out, opacity 280ms ease-out' : 'transform 140ms ease-out, opacity 140ms ease-out',
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              `radial-gradient(closest-side, rgba(56,189,248,${0.24 + neonIntensity * 0.18}), rgba(59,130,246,${0.18 + neonIntensity * 0.14}), transparent 70%)`,
                            filter: 'blur(9px)',
                            opacity: glowOpacity,
                            transition: prefersReducedMotion ? 'opacity 280ms linear' : 'opacity 140ms linear',
                          }}
                        />
                      </div>
                    )
                  })}
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
