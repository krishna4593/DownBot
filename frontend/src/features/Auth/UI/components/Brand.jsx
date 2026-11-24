export default function Brand({ light = false }) {
  return (
    <div className={`flex items-center gap-2.5 text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2563eb] text-sm text-white shadow-[0_8px_24px_rgba(37,99,235,0.24)]">d</span>
      downbot<span className="text-[#2563eb]">.</span>
    </div>
  )
}
