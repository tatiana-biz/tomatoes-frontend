import Navbar from '../components/Navbar'

function Blog() {
  const posts = [
    {
      title: 'Shipping fast without breaking things',
      date: 'Dec 2025',
      excerpt: 'Our approach to balancing speed, quality, and calm operations when building automations.'
    },
    {
      title: 'Quiet automation patterns for fintech',
      date: 'Nov 2025',
      excerpt: 'Designing flows that are reliable, observable, and easy to iterate on.'
    },
    {
      title: 'AI copilots that actually help ops teams',
      date: 'Oct 2025',
      excerpt: 'Where assistants shine, where they don’t, and how to embed them without chaos.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
            Notes for founders in tech, fintech and AI
          </div>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Insights & Updates</h1>
          <p className="mt-3 text-blue-100">Short, useful posts about automation, product ops, and shipping calmly.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <a
              key={p.title}
              href="#"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 hover:ring-1 hover:ring-white/20"
            >
              <div className="flex items-center justify-between text-xs text-blue-200/80">
                <span>{p.date}</span>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-cyan-200">Post</span>
              </div>
              <div className="mt-3 text-lg font-semibold text-white group-hover:text-white/90">{p.title}</div>
              <div className="mt-2 text-sm text-blue-100/90">{p.excerpt}</div>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Blog
