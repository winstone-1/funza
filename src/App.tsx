import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MobileTopbar } from '@/components/HeroPanel'
import { AppSidebar } from '@/components/Sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { seedOfflineContent } from '@/lib/contentStore'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { PrepareHomePage } from '@/pages/PrepareHomePage'
import {
  KeyConceptsPage,
  LessonGuidePage,
  QuickChecksPage,
  UnderstandPage,
} from '@/pages/PrepStepPages'
import { StrandOverviewPage } from '@/pages/StrandOverviewPage'

function App() {
  useEffect(() => {
    seedOfflineContent().catch((error: unknown) => {
      console.error('Local content setup failed', error)
    })
  }, [])

  return (
    <SidebarProvider className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(235,247,232,0.9),transparent_32rem),linear-gradient(135deg,#f8faf7_0%,#f7f7f4_48%,#eef5ed_100%)] p-0 text-stone-950 sm:p-4 lg:p-7">
      <AppSidebar />

      <SidebarInset className="min-w-0 bg-transparent md:rounded-lg md:border md:border-emerald-950/10 md:bg-white/80 md:shadow-[0_24px_60px_rgba(14,31,22,0.12)]">
        <div className="grid w-full max-w-[1500px] gap-3 p-3 sm:gap-5 sm:p-5 lg:p-7">
          <MobileTopbar />

          <Routes>
            <Route index element={<PrepareHomePage />} />
            <Route path="strands/cell-biology" element={<StrandOverviewPage />} />
            <Route path="strands/cell-biology/understand" element={<UnderstandPage />} />
            <Route path="strands/cell-biology/key-concepts" element={<KeyConceptsPage />} />
            <Route path="strands/cell-biology/lesson-guide" element={<LessonGuidePage />} />
            <Route path="strands/cell-biology/quick-checks" element={<QuickChecksPage />} />
            <Route
              path="preparations"
              element={
                <PlaceholderPage
                  title="My Preparations"
                  description="Your saved strand preparations will appear here."
                />
              }
            />
            <Route
              path="downloaded"
              element={
                <PlaceholderPage
                  title="Saved Lessons"
                  description="Lessons you save for later will appear here."
                />
              }
            />
            <Route
              path="settings"
              element={
                <PlaceholderPage
                  title="Settings"
                  description="Manage app preferences and classroom access settings here."
                />
              }
            />
            <Route
              path="about"
              element={
                <PlaceholderPage
                  title="About Elimu"
                  description="Elimu is teacher-only preparation support. It does not collect learner names, learner work, or learner accounts."
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
