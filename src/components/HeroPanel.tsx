import { Sparkles } from 'lucide-react'
import cellImage from '@/assets/cell-biology.png'
import type { StrandPack } from '@/data/strands'
import { useI18n } from '@/lib/i18n'

type HeroPanelProps = {
  pack: StrandPack
}

export function HeroPanel({ pack }: HeroPanelProps) {
  const { t } = useI18n()
  const Icon = pack.icon

  return (
    <section className="relative min-h-64 overflow-hidden rounded-lg border border-emerald-950/10 bg-white/50 p-6 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-gradient-to-br dark:from-emerald-950/30 dark:to-emerald-900/20 dark:border-white/15 sm:p-8">
      <div className="relative z-10 max-w-3xl">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">
          {pack.subject}
        </p>
        <h1 className="max-w-[70%] text-3xl font-black leading-none text-stone-950 dark:text-white sm:max-w-xl sm:text-5xl">
          {pack.title}
        </h1>
        <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 sm:text-xl">
          {t('hero.gradeStrand', { grade: pack.grade })}
        </p>

        <div className="mt-6 flex max-w-lg items-start gap-3 rounded-lg border border-emerald-200/50 bg-emerald-100/50 p-4 backdrop-blur-sm dark:border-emerald-700/40 dark:bg-emerald-900/30">
          <Sparkles className="shrink-0 text-emerald-700 dark:text-emerald-400" size={23} />
          <div>
            <strong className="block text-xs uppercase text-emerald-800 dark:text-emerald-300">
              {t('hero.newStrand')}
            </strong>
            <span className="mt-1 block max-w-[42ch] text-sm leading-relaxed text-stone-950 dark:text-stone-300">
              {pack.heroNote}
            </span>
          </div>
        </div>
      </div>

      {/* Only cell biology has an illustration; the rest use their strand icon. */}
      {pack.id === 'cell-biology' ? (
        <img
          className="absolute bottom-16 right-2 w-[min(162px,40vw)] drop-shadow-[0_22px_25px_rgba(19,66,32,0.22)] sm:-bottom-11 sm:right-3 sm:w-[min(355px,42vw)]"
          src={cellImage}
          alt="3D plant cell model"
        />
      ) : (
        <Icon
          className="pointer-events-none absolute -bottom-6 right-2 text-emerald-800/10 dark:text-emerald-300/10 sm:right-8"
          size={220}
          aria-hidden="true"
        />
      )}
    </section>
  )
}
