import { BookOpen, WifiOff } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useOnlineStatus } from '@/hooks/use-online-status'
import { useI18n } from '@/lib/i18n'

export function AppTopbar() {
  const isOnline = useOnlineStatus()
  const { t } = useI18n()

  return (
    // Desktop only needs this bar when there is an offline warning to show.
    <header className={`flex min-h-11 items-center justify-between gap-3 ${isOnline ? 'md:hidden' : ''}`}>
      <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-300 md:hidden">
        <BookOpen size={21} />
        <strong className="text-lg">{t('app.name')}</strong>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {!isOnline && (
          <span
            className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 dark:border-amber-700/50 dark:bg-amber-900/30 dark:text-amber-300"
            title={t('common.offlineNote')}
          >
            <WifiOff size={13} />
            {t('common.offline')}
          </span>
        )}

        <SidebarTrigger className="size-9 rounded-full bg-transparent text-stone-950 hover:bg-emerald-50 dark:text-white dark:hover:bg-white/10 md:hidden" />
      </div>
    </header>
  )
}
