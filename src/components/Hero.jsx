import AuthButton from "./AuthButton";
import GetStartedButton from "./GetStartedButton";

function Hero() {
    return (
      <header
        id="home"
        className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
        />
  
        {/* Navigation */}
        <nav
          className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Kavya<span className="text-cyan-400">Labs</span>
          </a>
  
          <div className="flex items-center gap-5">
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Features
            </a>

            <AuthButton />
          </div>
        </nav>
  
        {/* Hero content */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              AI-powered workspace for ambitious teams
            </div>
  
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Turn ideas into
              <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                action with AI.
              </span>
            </h1>
  
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Kavya Labs helps startup teams transform scattered ideas into
              focused insights and smarter workflows, so you can spend less time
              organizing and more time building.
            </p>
  
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <GetStartedButton />
  
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Explore Features
                <span aria-hidden="true">↓</span>
              </a>
            </div>
  
            <p className="mt-5 text-sm text-slate-500">
              Built for founders and fast-moving startup teams.
            </p>
          </div>
  
          {/* Abstract product preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-90 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-3xl"
            />
  
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      Kavya Workspace
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      Product Launch
                    </p>
                  </div>
  
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  </div>
                </div>
  
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-medium text-slate-400">
                      AI INSIGHTS
                    </p>
                    <p className="mt-3 text-3xl font-semibold">12</p>
                    <p className="mt-2 text-xs text-cyan-300">
                      Ready to review
                    </p>
                  </div>
  
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-medium text-slate-400">
                      TEAM FOCUS
                    </p>
                    <p className="mt-3 text-3xl font-semibold">84%</p>
                    <p className="mt-2 text-xs text-violet-300">
                      Aligned this week
                    </p>
                  </div>
                </div>
  
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium">AI recommendations</p>
                    <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-300">
                      Live
                    </span>
                  </div>
  
                  <div className="space-y-3">
                    <div className="h-2.5 w-full rounded-full bg-slate-700">
                      <div className="h-2.5 w-4/5 rounded-full bg-cyan-400" />
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-700">
                      <div className="h-2.5 w-2/3 rounded-full bg-violet-400" />
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-700">
                      <div className="h-2.5 w-1/2 rounded-full bg-slate-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
  
  export default Hero