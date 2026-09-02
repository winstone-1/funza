import { ArrowRight, ChevronDown, RotateCw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { stepIndex } from '@/data/preparation'
import type { CheckType, StrandPack } from '@/data/strands'
import { useI18n, type TranslationKey } from '@/lib/i18n'
import { PanelHeader } from '@/components/PanelHeader'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'motion/react'

type QuickChecksPanelProps = {
  pack: StrandPack
  onBack: () => void
  onDone: () => void
}

type Filter = 'all' | CheckType

const filters: { key: Filter; labelKey: TranslationKey }[] = [
  { key: 'all', labelKey: 'checks.all' },
  { key: 'recall', labelKey: 'checks.recall' },
  { key: 'understand', labelKey: 'checks.understand' },
  { key: 'apply', labelKey: 'checks.apply' },
]

const typeLabelKey: Record<CheckType, TranslationKey> = {
  recall: 'checks.recall',
  understand: 'checks.understand',
  apply: 'checks.apply',
}

function shuffled<T>(items: T[]) {
  const next = [...items]

  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }

  return next
}

export function QuickChecksPanel({ pack, onBack, onDone }: QuickChecksPanelProps) {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [order, setOrder] = useState(() => pack.quickChecks.map((_, index) => index))
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const counts = useMemo(() => {
    const tally: Record<Filter, number> = { all: pack.quickChecks.length, recall: 0, understand: 0, apply: 0 }

    for (const check of pack.quickChecks) {
      tally[check.type] += 1
    }

    return tally
  }, [pack.quickChecks])

  const visible = order
    .map((index) => ({ ...pack.quickChecks[index], index }))
    .filter((check) => filter === 'all' || check.type === filter)

  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <PanelHeader title={t('checks.title')} step={stepIndex('checks')} onBack={onBack} />

      <p className="text-sm text-stone-500 dark:text-stone-400">{t('checks.intro')}</p>

      <div className="my-5 grid gap-2 sm:grid-cols-4" role="group" aria-label={t('checks.title')}>
        {filters.map(({ key, labelKey }) => {
          const isActive = filter === key

          return (
            <Button
              className={`min-h-9 rounded-lg border text-xs font-bold transition-colors ${
                isActive
                  ? 'border-emerald-800 bg-emerald-800 text-white hover:bg-emerald-900 dark:border-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-800'
                  : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
              }`}
              type="button"
              aria-pressed={isActive}
              key={key}
              onClick={() => {
                setFilter(key)
                setOpenIndex(null)
              }}
            >
              {t(labelKey)} ({counts[key]})
            </Button>
          )
        })}
      </div>

      <div className="grid gap-2">
        {visible.map((check, position) => {
          const isOpen = openIndex === check.index

          return (
            <motion.div
              key={check.question}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(position, 8) * 0.04, duration: 0.3 }}
              className="overflow-hidden rounded-lg border border-stone-200/50 bg-stone-50/50 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            >
              <Button
                className="grid min-h-11 w-full grid-cols-[28px_minmax(0,1fr)_18px] items-center justify-normal gap-2 rounded-none border-0 bg-transparent px-3 py-2.5 text-left text-stone-950 hover:bg-stone-100/70 dark:text-white dark:hover:bg-white/10 sm:grid-cols-[28px_minmax(0,1fr)_92px_18px]"
                type="button"
                aria-expanded={isOpen}
                title={isOpen ? t('checks.hideAnswer') : t('checks.showAnswer')}
                onClick={() => setOpenIndex(isOpen ? null : check.index)}
              >
                <span className="self-start pt-0.5 font-extrabold text-amber-600 dark:text-amber-400">
                  {position + 1}
                </span>
                <strong className="whitespace-normal text-xs leading-relaxed">{check.question}</strong>
                <em className="hidden justify-self-end rounded-full bg-emerald-50/50 px-2 py-1 text-xs font-extrabold not-italic text-emerald-800 backdrop-blur-sm dark:bg-emerald-900/40 dark:text-emerald-400 sm:block">
                  {t(typeLabelKey[check.type])}
                </em>
                <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={15} />
              </Button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <div className="border-t border-stone-200/70 px-3 py-3 pl-[2.6rem] dark:border-white/10">
                      <strong className="text-xs font-extrabold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                        {t('checks.answer')}
                      </strong>
                      <p className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{check.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {visible.length === 0 && (
          <p className="rounded-lg border border-dashed border-stone-300 p-4 text-center text-sm text-stone-500 dark:border-white/15 dark:text-stone-400">
            {t('checks.empty')}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:flex sm:items-center sm:justify-between">
        <span className="flex-1 rounded-lg bg-emerald-50/50 p-4 text-sm text-stone-700 backdrop-blur-sm dark:bg-emerald-900/20 dark:text-emerald-100/80">
          {t('checks.useInClass')}
        </span>
        <Button
          className="min-h-12 rounded-lg bg-emerald-700 px-5 font-extrabold text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          type="button"
          disabled={pack.quickChecks.length < 2}
          onClick={() => {
            setOrder((current) => shuffled(current))
            setOpenIndex(null)
          }}
        >
          <RotateCw size={17} />
          {t('checks.shuffle')}
        </Button>
      </div>

      <Button
        className="mt-4 min-h-12 w-full rounded-lg border border-emerald-800 bg-white font-extrabold text-emerald-900 hover:bg-emerald-50 dark:border-emerald-600 dark:bg-transparent dark:text-emerald-400 dark:hover:bg-emerald-900/30 sm:w-auto"
        type="button"
        onClick={onDone}
      >
        {t('checks.backToOverview')}
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
