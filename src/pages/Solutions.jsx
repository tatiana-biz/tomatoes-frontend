import Navbar from '../components/Navbar'

function Solutions() {
  const solutions = [
    {
      title: 'Payments & Billing Automation',
      desc: 'Subscription management, invoicing, reconciliation and dunning flows that just work.'
    },
    {
      title: 'Customer Onboarding & KYC',
      desc: 'Seamless signup, identity verification and approvals tailored to fintech and AI products.'
    },
    {
      title: 'AI Copilots & Internal Tools',
      desc: 'Chat-based assistants and dashboards that speed up operations across your stack.'
    },
    {
      title: 'Data Pipelines & Analytics',
      desc: 'From event tracking to reporting — visibility into what matters from day one.'
    },
    {
      title: 'Compliance & Security',
      desc: 'Best practices for data handling, permissions, and auditability baked in.'
    },
    {
      title: 'Integrations',
      desc: 'Stripe, Plaid, Slack, Notion, HubSpot, OpenAI and more — connected the right way.'
    },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
            For founders in tech, fintech and AI
          </div>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Quietly powerful business automation</h1>
          <p className="mt-3 text-blue-100">Systems that feel engineered, not cobbled together. Pick what you need now; add more as you scale.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-3 h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-inner"></div>
              <div className="text-lg font-semibold text-white">{s.title}</div>
              <div className="mt-1 text-sm text-blue-100/90">{s.desc}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Solutions
