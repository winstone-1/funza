import { InfoPanel } from '@/components/InfoPanel'
import { useI18n } from '@/lib/i18n'

export function AboutPage() {
  const { t } = useI18n()

  return <InfoPanel title={t('about.title')} body={t('about.body')} actionLabel={t('about.back')} />
}

export function StrandMissingPage() {
  const { t } = useI18n()

  return <InfoPanel title={t('notFound.title')} body={t('notFound.body')} actionLabel={t('about.back')} />
}
