import Navbar from '../components/Navbar'

function Solutions() {
  const solutions = [
    {
      title: 'Payments & Billing',
      desc: 'Subscription management, invoicing, reconciliation, dunning, with clean data flows.'
    },
    {
      title: 'Onboarding & KYC',
      desc: 'Identity verification and approvals tailored to fintech and AI products.'
    },
    {
      title: 'AI Copilots & Tools',
      desc: 'Chat assistants and internal dashboards that accelerate operations.'
    },
    {
      title: 'Pipelines & Analytics',
      desc: 'Event tracking, reporting and visibility into the metrics that matter.'
    },
    {
      title: 'Security & Compliance',
      desc: 'Guardrails, permissions and auditability built in from day one.'
    },
    {
      title: 'Integrations',
      desc: 'Stripe, Plaid, Slack, Notion, HubSpot, OpenAI and more—wired the right way.'
    },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Solutions</h1>
          <p className="mt-3 text-blue-100">Pick what you need now; add more as you grow.</p>
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
