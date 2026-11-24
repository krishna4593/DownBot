import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../Hooks/useAuth'
import Brand from '../components/Brand'
import ThemeToggle from '../components/ThemeToggle'

export default function ProfilePage() {
  const { user, refresh, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('downbot-theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }
    if (!user) refresh().catch(() => {})
  }, [refresh, user])

  async function handleLogout() {
    await logout().catch(() => {})
    navigate('/login')
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-950 dark:bg-[#0b0f17] dark:text-white">
      <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-white/10 dark:bg-[#111722] sm:px-6">
        <Brand />
        <div className="flex items-center gap-2"><ThemeToggle /><button onClick={handleLogout} className="hidden h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold dark:border-white/10 sm:block">Sign out</button></div>
      </header>
      <aside className="fixed bottom-0 left-0 top-16 hidden w-64 border-r border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#111722] md:block">
        <button className="flex h-11 w-full items-center gap-2 rounded-xl bg-[#2563eb] px-4 text-sm font-semibold text-white"><span className="text-lg">+</span> New chat</button>
        <div className="mt-7">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Recent</p>
          <div className="space-y-1">
            {['Product strategy synthesis', 'React architecture review', 'Launch plan'].map((item, index) => (
              <button key={item} className={`w-full truncate rounded-lg px-3 py-2.5 text-left text-sm ${index === 0 ? 'bg-slate-100 dark:bg-white/8' : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5'}`}>{item}</button>
            ))}
          </div>
        </div>
      </aside>
      <section className="flex min-h-screen flex-col px-4 pb-5 pt-16 md:ml-64 md:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-10">
          <div className="text-center">
            <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#2563eb] text-lg font-bold text-white">d</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Good to see you</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{user?.name || 'Restoring your workspace'}<span className="text-[#2563eb]">.</span></h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">What would you like to explore, create, or solve today?</p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {['Plan a project', 'Analyze an idea', 'Write & improve'].map((item) => (
              <button key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-semibold transition hover:border-blue-200 hover:bg-blue-50/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500/40 dark:hover:bg-blue-950/20">{item}<span className="mt-5 block text-xs font-normal text-slate-400">Start a focused chat</span></button>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_10px_35px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5">
            <textarea rows="1" placeholder="Ask Downbot anything..." className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400" />
            <button className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2563eb] text-white" aria-label="Send message">↑</button>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">Downbot can make mistakes. Verify important information.</p>
        </div>
      </section>
    </main>
  )
}
