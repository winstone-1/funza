import { ArrowLeft, ArrowRight, Check, Sparkles, WifiOff } from 'lucide-react'
import { strandPack, subStrandOutcomes } from '@/data/preparation'
import { AiResponse } from '@/components/AiResponse'
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
    <article className="flex flex-col rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button className="grid size-8 place-items-center rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20" type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <strong className="dark:text-white">Understand the strand</strong>
        <span className="text-sm font-extrabold dark:text-stone-400">01 / 04</span>
      </div>

      <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">In simple terms</p>
      <h2 className="mb-4 text-2xl font-black text-stone-950 dark:text-white">
        {strandPack.title}, explained for your class
      </h2>

      <section className="overflow-hidden rounded-xl border border-emerald-950/10 bg-white/70 dark:border-white/10 dark:bg-white/5">
        <header className="flex items-center gap-3 border-b border-stone-200/80 bg-gradient-to-r from-emerald-50/80 to-transparent px-4 py-3 dark:border-white/10 dark:from-emerald-900/25">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 text-white shadow-[0_6px_16px_rgba(6,78,59,0.35)]">
            <Sparkles size={16} />
          </span>

          <div className="min-w-0">
            <strong className="block text-sm leading-tight text-stone-950 dark:text-white">Funza AI</strong>
            <span className="mt-0.5 block truncate text-xs text-stone-500 dark:text-stone-400">
              Sub-strand {strandPack.subStrand}
            </span>
          </div>

          <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300 sm:flex">
            <WifiOff size={12} />
            Saved offline
          </span>
        </header>

        <div className="px-4 py-5 sm:px-5">
          <AiResponse text={understandText} />
        </div>

        <footer className="border-t border-stone-200/80 px-4 py-2.5 text-xs leading-relaxed text-stone-500 dark:border-white/10 dark:text-stone-400">
          AI-generated from {strandPack.source} only. Anything it marks as unclear is not covered by your source.
        </footer>
      </section>

      <h3 className="mt-7 border-t border-stone-200 pt-4 text-sm font-extrabold uppercase dark:border-white/15 dark:text-white">What you should be ready to explain</h3>
      <ul className="mt-3 grid gap-2">
        {subStrandOutcomes.map((item, index) => (
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
        <Sparkles className="shrink-0 text-amber-600 dark:text-amber-400" size={24} />
        <div>
          <strong className="text-amber-700 dark:text-amber-300">Teacher note</strong>
          <span className="mt-1 block text-sm leading-relaxed dark:text-amber-100/80">
            Focus first on helping learners connect new ideas to things they can see or experience in real life.
          </span>
        </div>
      </div>

      <Button
        className="mt-5 min-h-12 w-full rounded-lg bg-emerald-700 px-5 font-extrabold text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 sm:w-auto sm:self-end"
        type="button"
        onClick={onNext}
      >
        Next
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
