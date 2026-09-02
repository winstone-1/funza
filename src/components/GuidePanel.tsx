import { ArrowRight } from 'lucide-react'
import { prepCards, type PrepStep } from '@/data/preparation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

type GuidePanelProps = {
  onSelect: (step: PrepStep) => void
}

export function GuidePanel({ onSelect }: GuidePanelProps) {
  const { t } = useI18n()

  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">
            {t('guide.eyebrow')}
          </p>
          <h2 className="text-2xl font-black text-stone-950 dark:text-white">{t('guide.title')}</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {prepCards.map(({ icon: Icon, step, subtitleKey, titleKey }, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Button
              variant="outline"
              className="grid min-h-24 w-full grid-cols-[34px_1fr_18px] items-center justify-normal gap-3 rounded-lg border-emerald-950/10 bg-white/50 p-4 text-left text-stone-950 transition-all hover:border-emerald-950/20 hover:bg-emerald-50/80 dark:bg-white/8 dark:border-white/15 dark:text-white dark:hover:bg-white/12"
              type="button"
              onClick={() => onSelect(step)}
            >
              <Icon
                className={index === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}
                size={25}
              />
              <span>
                <strong className="block">{t(titleKey)}</strong>
                <small className="mt-1 block text-xs text-stone-500 dark:text-stone-400">{t(subtitleKey)}</small>
              </span>
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        ))}
      </div>
    </article>
  )
}
