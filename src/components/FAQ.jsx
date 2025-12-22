function FAQ() {
  const faqs = [
    {
      q: 'What is Blue Tomatoes?',
      a: 'We are a business automation agency for tech, fintech, and AI founders. Hire us when you are planning or starting a new venture—we design and build systems that quietly run your operations.'
    },
    {
      q: 'How do you work?',
      a: 'We operate in focused sprints with clear deliverables. We audit your stack, design pragmatic workflows, and build integrations and internal tools that create momentum from week one.'
    },
    {
      q: 'What does a typical engagement look like?',
      a: 'Start with a 1-week sprint to validate the approach and ship a working core. From there, we scale the system in small iterations and add guardrails for security and compliance.'
    },
    {
      q: 'Who do you work with?',
      a: 'Early-stage teams and solo founders with ambitious products. Fintech and AI tooling are common, but we tailor the system to your specific goals.'
    },
  ]

  return (
    <section id="faq" className="relative mx-auto mt-24 max-w-7xl px-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">FAQs</h2>
        <p className="mt-3 text-blue-100">Answers to the most common questions.</p>
      </div>

      <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        {faqs.map((f, i) => (
          <div key={f.q} className="p-5">
            <div className="text-base font-semibold text-white">{f.q}</div>
            <div className="mt-2 text-sm text-blue-100/90">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
