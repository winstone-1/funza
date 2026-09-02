import { trustItems } from '@/data/preparation'

export function TrustBand() {
  return (
    <section
      className="mt-5 grid gap-5 rounded-lg bg-emerald-950 bg-[linear-gradient(125deg,rgba(20,112,79,0.42),transparent_35%)] p-6 text-white sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Product principles"
    >
      {trustItems.map(({ icon: Icon, title, subtitle }) => (
        <div className="flex items-center gap-3" key={title}>
          <Icon className="shrink-0" size={31} />
          <span>
            <strong className="mb-1 block">{title}</strong>
            <small className="block text-xs leading-relaxed text-white/75">{subtitle}</small>
          </span>
        </div>
      ))}
    </section>
  )
}
