import { ArrowLeft, ArrowRight, Brain, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

type KeyConceptsPanelProps = {
  onBack: () => void
  onNext: () => void
}

const concepts = [
  ['Cell', 'The basic unit of life in living organisms.'],
  ['Cell membrane', 'Controls what enters and leaves the cell.'],
  ['Nucleus', 'Controls cell activities and carries genetic information.'],
  ['Cytoplasm', 'Jelly-like material where many cell activities happen.'],
  ['Mitochondria', 'Releases energy for the cell.'],
  ['Chloroplast', 'Contains chlorophyll for photosynthesis in plant cells.'],
]

export function KeyConceptsPanel({ onBack, onNext }: KeyConceptsPanelProps) {
  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button className="grid size-8 place-items-center rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20" type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <strong className="dark:text-white">Key concepts</strong>
        <span className="text-sm font-extrabold dark:text-stone-400">02 / 04</span>
      </div>

      <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">What you need to know</p>
      <h2 className="text-2xl font-black text-stone-950 dark:text-white">Vocabulary to explain clearly</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {concepts.map(([term, meaning], index) => (
          <motion.div
            key={term}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="rounded-lg border border-stone-200 bg-stone-50/50 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/8"
          >
            <div className="flex items-center gap-2">
              <Brain className="text-amber-600 dark:text-amber-400" size={18} />
              <strong className="dark:text-white">{term}</strong>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{meaning}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 backdrop-blur-sm dark:border-emerald-900/40 dark:bg-emerald-900/20">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-300">
          <CheckCircle2 size={18} />
          Teaching safeguard
        </div>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Keep explanations close to these key ideas. If a question goes beyond the lesson, mark it for follow-up instead of guessing.
        </p>
      </div>

      <Button
        className="mt-5 min-h-12 w-full rounded-lg bg-emerald-700 px-5 font-extrabold text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 sm:w-auto"
        type="button"
        onClick={onNext}
      >
        Lesson guide
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
