import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { AppTopbar } from '@/components/AppTopbar'
import { PageTransition } from '@/components/PageTransition'
import { AppSidebar } from '@/components/Sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { seedOfflineContent } from '@/lib/contentStore'
import { AboutPage } from '@/pages/AboutPage'
import { PrepareHomePage } from '@/pages/PrepareHomePage'
import {
  KeyConceptsPage,
  LessonGuidePage,
  QuickChecksPage,
  UnderstandPage,
} from '@/pages/PrepStepPages'
import { StrandOverviewPage } from '@/pages/StrandOverviewPage'

function App() {
  const location = useLocation()

  useEffect(() => {
    seedOfflineContent().catch((error: unknown) => {
      console.error('Local content setup failed', error)
    })
  }, [])

  return (
    <SidebarProvider className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(235,247,232,0.9),transparent_32rem),linear-gradient(135deg,#f8faf7_0%,#f7f7f4_48%,#eef5ed_100%)] p-0 text-stone-950 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white sm:p-4 lg:p-7">
      <AppSidebar />

      <SidebarInset className="min-w-0 bg-transparent md:rounded-lg md:border md:border-emerald-950/10 dark:md:border-white/10 md:bg-white/50 dark:md:bg-white/5 md:shadow-[0_24px_60px_rgba(14,31,22,0.12)] dark:md:shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
        <div className="grid w-full max-w-[1500px] gap-3 p-3 sm:gap-5 sm:p-5 lg:p-7">
          <AppTopbar />

          <AnimatePresence mode="wait">
            <PageTransition className="grid gap-3 sm:gap-5" key={location.pathname}>
              <Routes location={location}>
                <Route index element={<PrepareHomePage />} />
                <Route path="strands/:strandId" element={<StrandOverviewPage />} />
                <Route path="strands/:strandId/understand" element={<UnderstandPage />} />
                <Route path="strands/:strandId/key-concepts" element={<KeyConceptsPage />} />
                <Route path="strands/:strandId/lesson-guide" element={<LessonGuidePage />} />
                <Route path="strands/:strandId/quick-checks" element={<QuickChecksPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
