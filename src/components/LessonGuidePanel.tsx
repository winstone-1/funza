import { ArrowRight, Clock3 } from 'lucide-react'
import { useState } from 'react'
import { stepIndex } from '@/data/preparation'
import { stepPhases, type StrandPack } from '@/data/strands'
import { useI18n } from '@/lib/i18n'
import { PanelHeader } from '@/components/PanelHeader'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

type LessonGuidePanelProps = {
  pack: StrandPack
  onBack: () => void
  onNext: () => void
}

export function LessonGuidePanel({ pack, onBack, onNext }: LessonGuidePanelProps) {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)

  const lesson = pack.lessons[activeIndex]

  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <PanelHeader title={t('lesson.title')} step={stepIndex('lesson')} onBack={onBack} />

      <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <strong className="mb-2 block text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {t('lesson.lessons')}
          </strong>
          {/* Scrolls sideways on narrow screens, stacks once there is room for a column. */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 xl:mx-0 xl:grid xl:px-0 xl:pb-0">
            {pack.lessons.map(({ id, title }, index) => {
              const isActive = index === activeIndex

              return (
                <Button
                  variant="outline"
                  className={`h-auto min-w-52 shrink-0 flex-col items-start justify-start gap-1 whitespace-normal rounded-lg border-emerald-950/10 p-3 text-left text-sm leading-snug text-stone-950 hover:bg-stone-50 dark:border-white/10 dark:text-white dark:hover:bg-white/10 xl:w-full xl:min-w-0 ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-50 hover:bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/30'
                      : 'bg-white dark:bg-white/5'
                  }`}
                  type="button"
                  aria-current={isActive ? 'step' : undefined}
                  onClick={() => setActiveIndex(index)}
                  key={id}
                >
                  <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400">
                    {t('lesson.number', { n: index + 1 })}
                  </span>
                  <span className="font-semibold">{title}</span>
                </Button>
              )
            })}
          </div>
        </aside>

        <div className="min-w-0">
          <h2 className="text-xl font-black text-stone-950 dark:text-white sm:text-2xl">
            {t('lesson.heading', { n: activeIndex + 1, title: lesson.title })}
          </h2>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <Clock3 size={14} />
            {lesson.minutes}
          </p>

          {/* Keyed on the lesson so the steps re-animate when a different lesson is picked. */}
          <ol className="mt-5 grid gap-3" key={lesson.id}>
            {lesson.steps.map((step, index) => {
              const phase = stepPhases[index] ?? stepPhases[stepPhases.length - 1]
              const Icon = phase.icon

              return (
                <motion.li
                  key={phase.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="grid grid-cols-[36px_minmax(0,1fr)] items-start gap-3 rounded-lg border border-stone-200/50 bg-stone-50/50 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:grid-cols-[36px_minmax(0,1fr)_24px] sm:gap-4 sm:p-4"
                >
                  <span className={`grid size-9 place-items-center rounded-full text-xs font-black text-white ${phase.color}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <strong className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
                      {phase.label}
                    </strong>
                    <p className="mt-1 text-sm leading-relaxed text-stone-950 dark:text-stone-300">{step.title}</p>
                    <small className="mt-1 block text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                      {step.note}
                    </small>
                  </div>
                  <Icon className="mt-0.5 hidden text-emerald-700 dark:text-emerald-400 sm:block" size={20} />
                </motion.li>
              )
            })}
          </ol>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="grid content-start gap-2 rounded-lg border border-amber-200/50 bg-amber-50/50 p-4 backdrop-blur-sm dark:border-amber-900/40 dark:bg-amber-900/20">
              <strong className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-400">
                {t('lesson.misconception')}
              </strong>
              <span className="text-sm leading-relaxed dark:text-amber-100/80">{lesson.misconception}</span>
            </div>
            <div className="grid content-start gap-2 rounded-lg border border-emerald-100/50 bg-emerald-50/50 p-4 backdrop-blur-sm dark:border-emerald-900/40 dark:bg-emerald-900/20">
              <strong className="text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
                {t('lesson.tip')}
              </strong>
              <span className="text-sm leading-relaxed dark:text-emerald-100/80">{lesson.tip}</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="mt-6 min-h-12 w-full rounded-lg bg-emerald-700 px-5 font-extrabold text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 sm:w-auto"
        type="button"
        onClick={onNext}
      >
        {t('guide.checks')}
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
