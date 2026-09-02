import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { strandGoals } from '@/data/preparation'
import { Button } from '@/components/ui/button'
import { useUnderstandContent } from '@/hooks/use-understand-content'
import { motion } from 'motion/react'

type UnderstandPanelProps = {
  onBack: () => void
  onNext: () => void
}

export function UnderstandPanel({ onBack, onNext }: UnderstandPanelProps) {
  const understandText = useUnderstandContent()

  return (
    <article className="flex flex-col rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] dark:bg-white/5 dark:border-white/10 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button className="grid size-8 place-items-center rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20" type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <strong className="dark:text-white">Understand the strand</strong>
        <span className="text-sm font-extrabold dark:text-stone-400">01 / 04</span>
      </div>

      <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">In simple terms</p>
      <p className="max-w-prose rounded-lg border border-stone-200 p-4 text-sm leading-relaxed dark:border-white/15 dark:bg-white/5 dark:text-stone-300">
        {understandText}
      </p>

      <h3 className="mt-7 border-t border-stone-200 pt-4 text-sm font-extrabold uppercase dark:border-white/15 dark:text-white">What you should be ready to explain</h3>
      <ul className="mt-3 grid gap-2">
        {strandGoals.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex items-center gap-2 text-sm dark:text-stone-300"
          >
            <Check className="rounded-full bg-emerald-700 p-0.5 text-white dark:bg-emerald-600" size={16} />
            {item}
          </motion.li>
        ))}
      </ul>

      <div className="mt-7 flex gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-900/20 sm:mt-auto backdrop-blur-sm">
        <Sparkles className="text-amber-600 dark:text-amber-400" size={24} />
        <div>
          <strong className="text-amber-700 dark:text-amber-300">Teacher note</strong>
          <span className="mt-1 block text-sm leading-relaxed dark:text-amber-100/80">
            Focus first on helping learners connect new ideas to things they can see or experience in real life.
          </span>
        </div>
      </div>

      <Button
        className="mt-5 min-h-12 self-end rounded-lg bg-emerald-700 px-5 font-extrabold text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
        type="button"
        onClick={onNext}
      >
        Next
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}