import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react'
import { quickChecks } from '@/data/preparation'
import { Button } from '@/components/ui/button'

type QuickChecksPanelProps = {
  onBack: () => void
  onDone: () => void
}

export function QuickChecksPanel({ onBack, onDone }: QuickChecksPanelProps) {
  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-6 lg:col-span-2">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button className="size-8 rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200" type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <strong>Quick checks</strong>
        <span className="text-sm font-extrabold">04 / 04</span>
      </div>

      <p className="text-sm text-stone-500">Use these questions to check understanding in class.</p>

      <div className="my-5 grid gap-2 sm:grid-cols-4" aria-label="Question type">
        {['All (6)', 'Recall (2)', 'Understand (2)', 'Apply (2)'].map((tab, index) => (
          <Button
            className={`min-h-9 rounded-lg border text-xs font-bold ${
              index === 0
                ? 'border-emerald-800 bg-emerald-800 text-white hover:bg-emerald-900'
                : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-50'
            }`}
            type="button"
            key={tab}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid gap-2">
        {quickChecks.map(({ type, question }, index) => (
          <Button
            className="grid min-h-11 grid-cols-[28px_minmax(0,1fr)_18px] justify-normal gap-2 rounded-lg border border-stone-200 bg-white px-3 text-left text-stone-950 hover:bg-stone-50 sm:grid-cols-[28px_minmax(0,1fr)_92px_18px]"
            type="button"
            key={question}
          >
            <span className="font-extrabold text-amber-600">{index + 1}</span>
            <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">{question}</strong>
            <em className="hidden justify-self-end rounded-full bg-emerald-50 px-2 py-1 text-xs font-extrabold not-italic text-emerald-800 sm:block">
              {type}
            </em>
            <ArrowRight size={15} />
          </Button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:flex sm:items-center sm:justify-between">
        <span className="flex-1 rounded-lg bg-emerald-50 p-4 text-sm text-stone-700">
          Use these in class discussions, pair work, or exit tickets.
        </span>
        <Button className="min-h-12 rounded-lg bg-[linear-gradient(180deg,#05865d,#006140)] px-5 font-extrabold text-white hover:bg-emerald-800" type="button">
          <RotateCw size={17} />
          Shuffle questions
        </Button>
      </div>

      <Button className="mt-4 min-h-12 w-full rounded-lg border border-emerald-800 bg-white font-extrabold text-emerald-900 hover:bg-emerald-50 sm:w-auto" type="button" onClick={onDone}>
        Back to overview
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
