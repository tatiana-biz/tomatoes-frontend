function CTA() {
  return (
    <section id="cta" className="relative mx-auto mt-24 max-w-5xl px-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 p-8 backdrop-blur">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">Ready to automate your venture?</h3>
          <p className="mt-3 text-blue-100">Tell us about your product and goals. We’ll send a pragmatic plan with timelines, integrations, and pricing.</p>
          <form className="mt-6 grid gap-3 sm:grid-cols-2">
            <input type="text" placeholder="Name" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none" />
            <input type="email" placeholder="Email" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none" />
            <input type="text" placeholder="Company" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none sm:col-span-2" />
            <textarea placeholder="What are you building?" className="h-28 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none sm:col-span-2" />
            <button type="submit" className="sm:col-span-2 mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:brightness-105 transition">
              Get my plan
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CTA
