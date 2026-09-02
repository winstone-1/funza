import { ArrowLeft } from 'lucide-react'
import { totalPrepSteps } from '@/data/preparation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

type PanelHeaderProps = {
  title: string
  step: number
  onBack: () => void
}

/** Back control, panel title and step counter, shared by the four preparation panels. */
export function PanelHeader({ title, step, onBack }: PanelHeaderProps) {
  const { t } = useI18n()

  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <Button
        className="grid size-8 place-items-center rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        type="button"
        aria-label={t('common.back')}
        title={t('common.back')}
        onClick={onBack}
      >
        <ArrowLeft size={18} />
      </Button>

      <strong className="dark:text-white">{title}</strong>

      <span className="text-sm font-extrabold text-stone-500 dark:text-stone-400">
        {t('common.step', { n: String(step).padStart(2, '0'), total: String(totalPrepSteps).padStart(2, '0') })}
      </span>
    </div>
  )
}
