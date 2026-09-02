import { ArrowRight, FileCheck2 } from 'lucide-react'
import { setupFields } from '@/data/preparation'
import { Button } from '@/components/ui/button'

type SetupPanelProps = {
  onStart: () => void
}

export function SetupPanel({ onStart }: SetupPanelProps) {
  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-6">
      <div>
        <h2 className="text-2xl font-black text-stone-950">Good morning, Mwalimu</h2>
        <p className="mt-2 text-sm text-stone-500">What are you preparing to teach today?</p>
      </div>

      <div className="my-6 grid gap-3">
        {setupFields.map(({ icon: Icon, subtitle, title }) => (
          <Button
            variant="outline"
            className="grid min-h-16 grid-cols-[34px_1fr_18px] items-center justify-normal gap-3 rounded-lg border-stone-200 bg-white px-4 text-left text-stone-950 hover:bg-stone-50"
            type="button"
            key={subtitle}
          >
            <Icon className="text-emerald-700" size={25} />
            <span>
              <small className="block text-xs text-stone-500">{subtitle}</small>
              <strong className="mt-1 block">{title}</strong>
            </span>
            <ArrowRight className="rotate-90" size={17} />
          </Button>
        ))}
      </div>

      <Button
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(180deg,#05865d,#006140)] font-extrabold text-white shadow-inner hover:bg-emerald-800"
        type="button"
        onClick={onStart}
      >
        Start preparing
        <ArrowRight size={18} />
      </Button>

      <div className="mt-5 grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
        <FileCheck2 size={18} />
        <span>Prepared from the Grade 10 Biology curriculum</span>
        <small className="col-start-2 text-xs text-stone-800">Cell Biology strand</small>
      </div>
    </article>
  )
}
