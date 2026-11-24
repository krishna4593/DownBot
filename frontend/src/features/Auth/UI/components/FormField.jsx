export default function FormField({ label, hint, error, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-800">{label}</span>
      <input
        {...inputProps}
        className="h-12 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50"
      />
      {(hint || error) && (
        <span className={`mt-2 block text-xs ${error ? 'text-red-600' : 'text-slate-500'}`}>
          {error || hint}
        </span>
      )}
    </label>
  )
}
