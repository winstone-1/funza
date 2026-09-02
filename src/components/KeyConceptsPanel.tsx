import { ArrowRight, Brain, CheckCircle2 } from 'lucide-react'
import { stepIndex } from '@/data/preparation'
import type { StrandPack } from '@/data/strands'
import { useI18n } from '@/lib/i18n'
import { PanelHeader } from '@/components/PanelHeader'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

type KeyConceptsPanelProps = {
  pack: StrandPack
  onBack: () => void
  onNext: () => void
}

export function KeyConceptsPanel({ pack, onBack, onNext }: KeyConceptsPanelProps) {
  const { t } = useI18n()

  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <PanelHeader title={t('concepts.title')} step={stepIndex('concepts')} onBack={onBack} />

      <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">
        {t('concepts.eyebrow')}
      </p>
      <h2 className="text-2xl font-black text-stone-950 dark:text-white">{t('concepts.heading')}</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {pack.concepts.map(({ term, meaning }, index) => (
          <motion.div
            key={term}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="rounded-lg border border-stone-200 bg-stone-50/50 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/8"
          >
            <div className="flex items-center gap-2">
              <Brain className="shrink-0 text-amber-600 dark:text-amber-400" size={18} />
              <strong className="dark:text-white">{term}</strong>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{meaning}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 backdrop-blur-sm dark:border-emerald-900/40 dark:bg-emerald-900/20">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-300">
          <CheckCircle2 size={18} />
          {t('concepts.safeguard')}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{t('concepts.safeguardBody')}</p>
      </div>

      <Button
        className="mt-5 min-h-12 w-full rounded-lg bg-emerald-700 px-5 font-extrabold text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 sm:w-auto"
        type="button"
        onClick={onNext}
      >
        {t('guide.lesson')}
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
