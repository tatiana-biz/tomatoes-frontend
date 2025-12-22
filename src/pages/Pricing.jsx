import Navbar from '../components/Navbar'

function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Pricing</h1>
          <p className="mt-3 text-blue-100">Simple, sprint-based engagement.</p>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-col gap-3 text-center">
            <div className="text-lg font-semibold text-white">1-week Sprint</div>
            <div className="text-4xl font-bold text-white">$1.3k</div>
            {/* What's included in a single sprint */}
            <div className="mt-2 text-sm text-blue-100">
              What fits into one sprint:
              <ul className="mt-2 list-disc space-y-1 text-left pl-6">
                <li>Discovery workshop and scope definition</li>
                <li>Prototype of one core workflow (e.g., onboarding or payments)</li>
                <li>Initial integrations (Stripe, Notion, Airtable, email, basic AI agents)</li>
                <li>Security and access setup, logging and simple reporting</li>
                <li>Roadmap + next-step plan to extend the system</li>
              </ul>
            </div>
            {/* Recommended number of sprints */}
            <div className="mt-4 text-sm text-blue-100">
              How many sprints to start with:
              <ul className="mt-2 list-disc space-y-1 text-left pl-6">
                <li>Founders validating an MVP: 1–2 sprints</li>
                <li>Teams preparing for launch: 2–3 sprints</li>
                <li>Operations-heavy products (fintech/AI platforms): 3–5 sprints</li>
              </ul>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="text-xs text-blue-200/80">Fixed scope, clear deliverables, momentum from week one. Add sprints as you need more capability.</div>
            <a href="/contact" className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:brightness-105 transition">
              Start a sprint
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Pricing
