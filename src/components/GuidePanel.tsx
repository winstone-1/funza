import { ArrowRight } from 'lucide-react'
import { preparationCards } from '@/data/preparation'
import { Button } from '@/components/ui/button'

export type PrepStep = 'understand' | 'concepts' | 'lesson' | 'checks'

const stepIds: PrepStep[] = ['understand', 'concepts', 'lesson', 'checks']

type GuidePanelProps = {
  onSelect: (step: PrepStep) => void
}

export function GuidePanel({ onSelect }: GuidePanelProps) {
  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800">Your preparation guide</p>
          <h2 className="text-2xl font-black text-stone-950">Choose where to begin</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {preparationCards.map(({ title, subtitle, icon: Icon }, index) => (
          <Button
            variant="outline"
            className="grid min-h-24 grid-cols-[34px_1fr_18px] items-center justify-normal gap-3 rounded-lg border-stone-200 bg-white p-4 text-left text-stone-950 hover:bg-stone-50"
            type="button"
            key={title}
            onClick={() => onSelect(stepIds[index])}
          >
            <Icon className={index === 1 ? 'text-amber-600' : 'text-emerald-700'} size={25} />
            <span>
              <strong className="block">{title}</strong>
              <small className="mt-1 block text-xs text-stone-500">{subtitle}</small>
            </span>
            <ArrowRight size={16} />
          </Button>
        ))}
      </div>
    </article>
  )
}
