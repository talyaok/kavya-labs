function Footer() {
    const year = new Date().getFullYear()
  
    return (
      <footer className="bg-slate-950 px-6 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <a
                href="#home"
                className="text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Kavya<span className="text-cyan-400">Labs</span>
              </a>
  
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                An AI-powered workspace helping ambitious teams turn ideas into
                focused action.
              </p>
            </div>
  
            <nav
              className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-400"
              aria-label="Footer navigation"
            >
              <a
                href="#home"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Home
              </a>
              <a
                href="#features"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Features
              </a>
              <a
                href="mailto:hello@kavyalabs.example"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Contact
              </a>
            </nav>
          </div>
  
          <div className="flex flex-col gap-3 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Kavya Labs. All rights reserved.</p>
            <p>Built for what&apos;s next.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer