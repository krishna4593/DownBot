export default function AuthCard({ title, subtitle, children }) {
  return (
    <main className="min-h-screen bg-[#f8f9fb] px-5 py-12 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <section className="w-full rounded-2xl border border-slate-200 bg-white px-7 py-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:px-10 sm:py-10">
          <header className="mb-8">
            <div className="mb-8 flex items-center gap-2 text-xl font-bold tracking-tight text-slate-950">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#2563eb] text-sm text-white">d</span>
              downbot
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          </header>
          {children}
        </section>
      </div>
    </main>
  )
}
