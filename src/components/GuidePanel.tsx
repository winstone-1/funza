import { ArrowRight } from 'lucide-react'
import { preparationCards } from '@/data/preparation'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

export type PrepStep = 'understand' | 'concepts' | 'lesson' | 'checks'

const stepIds: PrepStep[] = ['understand', 'concepts', 'lesson', 'checks']

type GuidePanelProps = {
  onSelect: (step: PrepStep) => void
}

export function GuidePanel({ onSelect }: GuidePanelProps) {
  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">Your preparation guide</p>
          <h2 className="text-2xl font-black text-stone-950 dark:text-white">Choose where to begin</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {preparationCards.map(({ title, subtitle, icon: Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Button
              variant="outline"
              className="grid min-h-24 w-full grid-cols-[34px_1fr_18px] items-center justify-normal gap-3 rounded-lg border-emerald-950/10 bg-white/50 p-4 text-left text-stone-950 hover:bg-emerald-50/80 hover:border-emerald-950/20 transition-all dark:bg-white/8 dark:border-white/15 dark:text-white dark:hover:bg-white/12"
              type="button"
              onClick={() => onSelect(stepIds[index])}
            >
              <Icon className={index === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'} size={25} />
              <span>
                <strong className="block">{title}</strong>
                <small className="mt-1 block text-xs text-stone-500 dark:text-stone-400">{subtitle}</small>
              </span>
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        ))}
      </div>
    </article>
  )
}
