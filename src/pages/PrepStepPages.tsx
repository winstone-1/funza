import { useNavigate } from 'react-router-dom'
import { KeyConceptsPanel } from '@/components/KeyConceptsPanel'
import { LessonGuidePanel } from '@/components/LessonGuidePanel'
import { QuickChecksPanel } from '@/components/QuickChecksPanel'
import { UnderstandPanel } from '@/components/UnderstandPanel'

const overviewPath = '/strands/cell-biology'

export function UnderstandPage() {
  const navigate = useNavigate()

  return (
    <UnderstandPanel
      onBack={() => navigate(overviewPath)}
      onNext={() => navigate('/strands/cell-biology/key-concepts')}
    />
  )
}

export function KeyConceptsPage() {
  const navigate = useNavigate()

  return (
    <KeyConceptsPanel
      onBack={() => navigate(overviewPath)}
      onNext={() => navigate('/strands/cell-biology/lesson-guide')}
    />
  )
}

export function LessonGuidePage() {
  const navigate = useNavigate()

  return (
    <LessonGuidePanel
      onBack={() => navigate(overviewPath)}
      onNext={() => navigate('/strands/cell-biology/quick-checks')}
    />
  )
}

export function QuickChecksPage() {
  const navigate = useNavigate()

  return <QuickChecksPanel onBack={() => navigate(overviewPath)} onDone={() => navigate(overviewPath)} />
}
