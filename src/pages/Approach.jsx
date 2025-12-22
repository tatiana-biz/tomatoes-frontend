import Navbar from '../components/Navbar'

function ApproachPage() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Systems Audit',
      desc: 'Understand goals, constraints, and the current tooling landscape. Identify automation opportunities with ROI.'
    },
    {
      number: '02',
      title: 'Design & Prototype',
      desc: 'Blueprint the workflow, craft the data model, and prototype the critical path with realistic integrations.'
    },
    {
      number: '03',
      title: 'Build & Integrate',
      desc: 'Implement backend services, dashboards, and AI assistants. Ship in small iterations for fast feedback.'
    },
    {
      number: '04',
      title: 'Launch & Iterate',
      desc: 'Measure impact, refine automations, and add guardrails. Scale with confidence as the venture grows.'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Approach</h1>
          <p className="mt-3 text-blue-100">Focused on outcomes, not endless sprints.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.number} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-sm font-mono text-cyan-200">{s.number}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-blue-100/90">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ApproachPage
