const features = [
    {
      number: "01",
      title: "AI-powered insights",
      description:
        "Turn scattered information into clear, actionable insights that help your team make confident decisions.",
    },
    {
      number: "02",
      title: "Smarter workflows",
      description:
        "Bring ideas and priorities into one focused workspace designed to keep fast-moving teams moving.",
    },
    {
      number: "03",
      title: "Built for collaboration",
      description:
        "Keep your team aligned around the work that matters without adding another complicated process.",
    },
    {
      number: "04",
      title: "Simple from day one",
      description:
        "Start quickly with an intuitive experience that keeps the technology out of your way.",
    },
  ]
  
  function Features() {
    return (
      <section
        id="features"
        className="scroll-mt-8 bg-white px-6 py-24 text-slate-950 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Why Kavya Labs
            </p>
  
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Less busywork.
              <br />
              More forward motion.
            </h2>
  
            <p className="mt-6 text-lg leading-8 text-slate-600">
              A focused AI workspace designed to help startup teams turn
              information into decisions and decisions into progress.
            </p>
          </div>
  
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-cyan-300">
                    {feature.number}
                  </span>
  
                  <span
                    aria-hidden="true"
                    className="text-2xl text-slate-300 transition group-hover:text-violet-500"
                  >
                    ↗
                  </span>
                </div>
  
                <h3 className="mt-8 text-xl font-bold">{feature.title}</h3>
  
                <p className="mt-3 max-w-lg leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Features