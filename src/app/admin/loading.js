export default function AdminLoading() {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-4 w-36 rounded bg-white/10" />
            <div className="mt-4 h-10 w-64 rounded bg-white/10" />
            <div className="mt-3 h-4 w-80 max-w-full rounded bg-white/10" />
  
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-2xl border border-white/10 bg-white/[0.06]"
                />
              ))}
            </div>
  
            <div className="mt-8 h-96 rounded-2xl border border-white/10 bg-white/[0.06]" />
  
            <div className="mt-6 h-72 rounded-2xl border border-white/10 bg-white/[0.06]" />
          </div>
        </div>
      </main>
    );
  }