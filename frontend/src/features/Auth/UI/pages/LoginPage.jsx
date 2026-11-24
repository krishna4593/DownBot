import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../Hooks/useAuth'
import AuthField from '../components/AuthField'
import Brand from '../components/Brand'
import ThemeToggle from '../components/ThemeToggle'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const { login, status, error, clearError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('downbot-theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  function update(event) {
    clearError()
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    try {
      await login(form)
      navigate('/profile')
    } catch {}
  }

  const fieldError = (field) => error?.errors?.find((item) => item.field === field)?.message
  const visibleError = error?.errors?.length ? error : null

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-slate-950 transition-colors dark:bg-[#0b0f17] dark:text-white lg:grid lg:grid-cols-[58%_42%]">
      <section className="relative hidden overflow-hidden border-r border-slate-200/70 bg-[#f7f6f2] p-10 lg:flex lg:flex-col dark:border-white/10 dark:bg-[#0b0f17] xl:p-16">
        <div className="absolute right-[-120px] top-[-160px] h-96 w-96 rounded-full bg-blue-100/70 dark:bg-blue-950/40" />
        <Brand />
        <div className="relative z-10 my-auto max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#2563eb]" /> Intelligent workspace
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">Think bigger.<br /><span className="text-[#2563eb]">Chat smarter.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500 dark:text-slate-400">Research, synthesize, and build with an AI partner that keeps up with your thinking.</p>
          <div className="mt-10 space-y-3">
            <div className="ml-10 max-w-md rounded-2xl rounded-br-md bg-white px-5 py-4 text-sm text-slate-700 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:bg-white/8 dark:text-slate-200">Turn 42 sources into a clear Q3 strategy.</div>
            <div className="max-w-lg rounded-2xl rounded-bl-md bg-[#2563eb] px-5 py-5 text-sm leading-6 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)]">
              I found three recurring inflection points. The strongest opportunity is a 34% increase in automated execution.
              <div className="mt-3 flex items-center gap-2 text-xs text-blue-100"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 184 tokens/sec</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
          <span>Built for focused minds</span><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> All systems operational</span>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center bg-white px-5 py-10 dark:bg-[#111722] sm:px-10 lg:px-12">
        <div className="absolute right-5 top-5"><ThemeToggle /></div>
        <div className="w-full max-w-[430px]">
          <div className="mb-10 lg:hidden"><Brand /></div>
          <div className="mb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2563eb]">Welcome back</p>
            <h2 className="text-3xl font-bold tracking-tight">Sign in to Downbot</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Continue to your intelligent workspace.</p>
          </div>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
            <GoogleIcon /> Continue with Google
          </button>
          <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200 dark:bg-white/10" /> or sign in with email <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" /></div>
          <form onSubmit={submit} className="space-y-5">
            {visibleError && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">{visibleError.message}</p>}
            <AuthField label="Email address" name="email" type="email" value={form.email} onChange={update} placeholder="name@example.com" autoComplete="email" error={fieldError('email')} />
            <div>
              <div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="text-sm font-semibold">Password</label><button type="button" className="text-xs font-semibold text-[#2563eb]">Forgot password?</button></div>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} placeholder="••••••••" autoComplete="current-password" className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50 dark:border-white/10 dark:bg-white/5 dark:focus:ring-blue-950" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              {fieldError('password') && <p className="mt-2 text-xs text-red-600">{fieldError('password')}</p>}
            </div>
            <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 accent-[#2563eb]" /> Keep me signed in</label>
            <button type="submit" disabled={status === 'loading'} className="h-12 w-full rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"> {status === 'loading' ? 'Signing in...' : 'Sign in to Downbot →'} </button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">New to Downbot? <Link to="/register" className="font-semibold text-[#2563eb]">Create an account</Link></p>
        </div>
      </section>
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.18c0-.71-.06-1.39-.18-2.05H12v3.88h5.25a4.49 4.49 0 01-1.95 2.94v2.44h3.16c1.85-1.7 2.89-4.21 2.89-7.21z" />
      <path fill="#34A853" d="M12 21.72c2.64 0 4.85-.88 6.46-2.34l-3.16-2.44c-.88.59-2 .94-3.3.94-2.53 0-4.67-1.71-5.44-4.01H3.29v2.52A9.75 9.75 0 0012 21.72z" />
      <path fill="#FBBC05" d="M6.56 13.87A5.86 5.86 0 016.25 12c0-.65.11-1.28.31-1.87V7.61H3.29A9.75 9.75 0 002.25 12c0 1.57.38 3.06 1.04 4.39l3.27-2.52z" />
      <path fill="#EA4335" d="M12 6.12c1.44 0 2.73.49 3.75 1.46l2.81-2.81A9.34 9.34 0 0012 2.28a9.75 9.75 0 00-8.71 5.33l3.27 2.52C7.33 7.83 9.47 6.12 12 6.12z" />
    </svg>
  )
}

