export default function AuthField({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={props.name} className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</label>
      <input id={props.name} {...props} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-blue-950" />
      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
