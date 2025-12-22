import { CreditCard, UserCheck, Bot, BarChart3, ShieldCheck, Plug } from 'lucide-react'

function Features() {
  const features = [
    {
      title: 'Payments & Billing Automation',
      desc: 'Subscription management, invoicing, reconciliation and dunning flows that just work.',
      tagline: 'Built fast, launched faster.',
      icon: CreditCard,
    },
    {
      title: 'Customer Onboarding & KYC',
      desc: 'Seamless signup, identity verification and approvals tailored to fintech and AI products.',
      tagline: 'Weeks to value, days to insights.',
      icon: UserCheck,
    },
    {
      title: 'AI Copilots & Internal Tools',
      desc: 'Chat-based assistants and dashboards that speed up operations across your stack.',
      tagline: 'Velocity without the chaos.',
      icon: Bot,
    },
    {
      title: 'Data Pipelines & Analytics',
      desc: 'From event tracking to reporting — visibility into what matters from day one.',
      tagline: 'Results measured in sprints, not quarters.',
      icon: BarChart3,
    },
    {
      title: 'Compliance & Security',
      desc: 'Best practices for data handling, permissions, and auditability baked in.',
      tagline: 'Guardrails set up from day one.',
      icon: ShieldCheck,
    },
    {
      title: 'Integrations',
      desc: 'Stripe, Plaid, Slack, Notion, HubSpot, OpenAI and more — connected the right way.',
      tagline: 'Ship integrations in days, not months.',
      icon: Plug,
    },
  ]

  return (
    <section id="solutions" className="relative mx-auto mt-20 max-w-7xl px-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Automation building blocks</h2>
        <p className="mt-3 text-blue-100">Pick what you need now; add more as you scale.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-inner">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-1 text-sm text-blue-100/90">{f.desc}</p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="mt-4 text-xs text-blue-200/80">{f.tagline}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Features
