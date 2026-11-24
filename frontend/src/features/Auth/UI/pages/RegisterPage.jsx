import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../Hooks/useAuth'
import AuthField from '../components/AuthField'
import Brand from '../components/Brand'
import ThemeToggle from '../components/ThemeToggle'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const { register, status, error, clearError } = useAuth()
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
      await register(form)
      navigate('/profile')
    } catch {}
  }

  const fieldError = (field) => error?.errors?.find((item) => item.field === field)?.message
  const visibleError = error?.errors?.length ? error : null

  return (
    <main className="min-h-screen bg-white text-slate-950 transition-colors dark:bg-[#0b0f17] dark:text-white lg:grid lg:grid-cols-[54%_46%]">
      <section className="relative hidden overflow-hidden border-r border-slate-200/70 bg-[#f7f6f2] p-12 lg:flex lg:flex-col dark:border-white/10 dark:bg-[#0b0f17] xl:p-16">
        <div className="absolute -left-28 bottom-[-220px] h-[420px] w-[420px] rounded-full bg-blue-100/70 dark:bg-blue-950/40" />
        <div className="relative z-10 flex items-center justify-between"><Brand /><span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">AI workspace · v3.4</span></div>
        <div className="relative z-10 my-auto max-w-xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#2563eb]">Your thinking partner</p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 dark:text-white xl:text-6xl">Meet your new<br />thinking partner.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500 dark:text-slate-400">Turn complex ideas into clear plans, useful code, and decisions you can act on.</p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
              <div className="mb-8 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"><span>Deep research</span><span className="h-2 w-2 rounded-full bg-emerald-500" /></div>
              <div className="space-y-2"><div className="h-2 w-full rounded bg-slate-100 dark:bg-white/10" /><div className="h-2 w-4/5 rounded bg-slate-100 dark:bg-white/10" /><div className="h-2 w-2/3 rounded bg-blue-200 dark:bg-blue-400/50" /></div>
            </div>
            <div className="rounded-2xl bg-[#2563eb] p-5 text-white">
              <span className="text-xs text-blue-100">Live synthesis</span>
              <p className="mt-8 text-sm font-semibold leading-6">From scattered context to a focused plan.</p>
              <div className="mt-5 text-xs text-blue-100">24 ms response</div>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-xs text-slate-500">Trusted by 50,000+ builders, engineers, and researchers.</p>
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-5 py-10 dark:bg-[#111722] sm:px-10 lg:px-12">
        <div className="absolute right-5 top-5"><ThemeToggle /></div>
        <div className="w-full max-w-[440px]">
          <div className="mb-8 lg:hidden"><Brand /></div>
          <div className="mb-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2563eb]">Get started</p>
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No credit card required.</p>
          </div>
          <button type="button" className="mb-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"><GoogleIcon /> Continue with Google</button>
          <form onSubmit={submit} className="space-y-4">
            {visibleError && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">{visibleError.message}</p>}
            <AuthField label="Full name" name="name" value={form.name} onChange={update} placeholder="Alex Morgan" autoComplete="name" error={fieldError('name')} />
            <AuthField label="Email address" name="email" type="email" value={form.email} onChange={update} placeholder="alex@example.com" autoComplete="email" error={fieldError('email')} />
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} placeholder="Create a secure password" autoComplete="new-password" className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50 dark:border-white/10 dark:bg-white/5 dark:focus:ring-blue-950" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              <p className={`mt-2 text-xs ${fieldError('password') ? 'text-red-600' : 'text-slate-500 dark:text-slate-400'}`}>{fieldError('password') || 'Use 8+ characters with letters and numbers'}</p>
            </div>
            <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-slate-500 dark:text-slate-400"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#2563eb]" /> I agree to the Terms of Service and Privacy Policy.</label>
            <button type="submit" disabled={status === 'loading' || !accepted} className="h-12 w-full rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50">{status === 'loading' ? 'Creating account...' : 'Create account →'}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">Already have an account? <Link to="/login" className="font-semibold text-[#2563eb]">Sign in</Link></p>
        </div>
      </section>
    </main>
  )
}

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.18c0-.71-.06-1.39-.18-2.05H12v3.88h5.25a4.49 4.49 0 01-1.95 2.94v2.44h3.16c1.85-1.7 2.89-4.21 2.89-7.21z" /><path fill="#34A853" d="M12 21.72c2.64 0 4.85-.88 6.46-2.34l-3.16-2.44c-.88.59-2 .94-3.3.94-2.53 0-4.67-1.71-5.44-4.01H3.29v2.52A9.75 9.75 0 0012 21.72z" /><path fill="#FBBC05" d="M6.56 13.87A5.86 5.86 0 016.25 12c0-.65.11-1.28.31-1.87V7.61H3.29A9.75 9.75 0 002.25 12c0 1.57.38 3.06 1.04 4.39l3.27-2.52z" /><path fill="#EA4335" d="M12 6.12c1.44 0 2.73.49 3.75 1.46l2.81-2.81A9.34 9.34 0 0012 2.28a9.75 9.75 0 00-8.71 5.33l3.27 2.52C7.33 7.83 9.47 6.12 12 6.12z" /></svg>
}
