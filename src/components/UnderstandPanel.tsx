import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import { strandGoals } from '@/data/preparation'
import { Button } from '@/components/ui/button'
import { useUnderstandContent } from '@/hooks/use-understand-content'

type UnderstandPanelProps = {
  onBack: () => void
  onNext: () => void
}

export function UnderstandPanel({ onBack, onNext }: UnderstandPanelProps) {
  const understandText = useUnderstandContent()

  return (
    <article className="flex flex-col rounded-lg border border-emerald-950/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button className="grid size-8 place-items-center rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200" type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <strong>Understand the strand</strong>
        <span className="text-sm font-extrabold">01 / 04</span>
      </div>

      <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800">In simple terms</p>
      <p className="max-w-prose rounded-lg border border-stone-200 p-4 text-sm leading-relaxed">
        {understandText}
      </p>

      <h3 className="mt-7 border-t border-stone-200 pt-4 text-sm font-extrabold uppercase">What you should be ready to explain</h3>
      <ul className="mt-3 grid gap-2">
        {strandGoals.map((item) => (
          <li className="flex items-center gap-2 text-sm" key={item}>
            <Check className="rounded-full bg-emerald-700 p-0.5 text-white" size={16} />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 sm:mt-auto">
        <Sparkles className="text-amber-600" size={24} />
        <div>
          <strong className="text-amber-700">Teacher note</strong>
          <span className="mt-1 block text-sm leading-relaxed">
            Focus first on helping learners connect new ideas to things they can see or experience in real life.
          </span>
        </div>
      </div>

      <Button
        className="mt-5 min-h-12 self-end rounded-lg bg-[linear-gradient(180deg,#05865d,#006140)] px-5 font-extrabold text-white hover:bg-emerald-800"
        type="button"
        onClick={onNext}
      >
        Next
      </Button>
    </article>
  )
}