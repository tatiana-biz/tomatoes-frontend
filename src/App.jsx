import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Approach from './components/Approach'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative overlays */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_0%,rgba(34,211,238,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_80%_0%,rgba(59,130,246,0.12),transparent_60%)]" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Features />
        <Approach />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
