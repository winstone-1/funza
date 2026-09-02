import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react'
import { quickChecks } from '@/data/preparation'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

type QuickChecksPanelProps = {
  onBack: () => void
  onDone: () => void
}

export function QuickChecksPanel({ onBack, onDone }: QuickChecksPanelProps) {
  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] dark:bg-white/5 dark:border-white/10 sm:p-6 lg:col-span-2 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button className="size-8 rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20" type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <strong className="dark:text-white">Quick checks</strong>
        <span className="text-sm font-extrabold dark:text-stone-400">04 / 04</span>
      </div>

      <p className="text-sm text-stone-500 dark:text-stone-400">Use these questions to check understanding in class.</p>

      <div className="my-5 grid gap-2 sm:grid-cols-4" aria-label="Question type">
        {['All (6)', 'Recall (2)', 'Understand (2)', 'Apply (2)'].map((tab, index) => (
          <Button
            className={`min-h-9 rounded-lg border text-xs font-bold transition-colors ${
              index === 0
                ? 'border-emerald-800 bg-emerald-800 text-white hover:bg-emerald-900 dark:border-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-800'
                : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
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
          <motion.div
            key={question}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Button
              className="grid min-h-11 w-full grid-cols-[28px_minmax(0,1fr)_18px] justify-normal gap-2 rounded-lg border border-stone-200/50 bg-stone-50/50 px-3 text-left text-stone-950 hover:bg-stone-100/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:grid-cols-[28px_minmax(0,1fr)_92px_18px] backdrop-blur-sm"
              type="button"
            >
              <span className="font-extrabold text-amber-600 dark:text-amber-400">{index + 1}</span>
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">{question}</strong>
              <em className="hidden justify-self-end rounded-full bg-emerald-50/50 px-2 py-1 text-xs font-extrabold not-italic text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 sm:block backdrop-blur-sm">
                {type}
              </em>
              <ArrowRight size={15} />
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:flex sm:items-center sm:justify-between">
        <span className="flex-1 rounded-lg bg-emerald-50/50 p-4 text-sm text-stone-700 dark:bg-emerald-900/20 dark:text-emerald-100/80 backdrop-blur-sm">
          Use these in class discussions, pair work, or exit tickets.
        </span>
        <Button className="min-h-12 rounded-lg bg-emerald-700 px-5 font-extrabold text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700" type="button">
          <RotateCw size={17} />
          Shuffle questions
        </Button>
      </div>

      <Button className="mt-4 min-h-12 w-full rounded-lg border border-emerald-800 bg-white font-extrabold text-emerald-900 hover:bg-emerald-50 dark:border-emerald-600 dark:bg-transparent dark:text-emerald-400 dark:hover:bg-emerald-900/30 sm:w-auto" type="button" onClick={onDone}>
        Back to overview
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
