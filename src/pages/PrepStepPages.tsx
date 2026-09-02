import { useNavigate } from 'react-router-dom'
import { strandPath } from '@/data/preparation'
import { useStrandPack } from '@/hooks/use-strand-pack'
import { KeyConceptsPanel } from '@/components/KeyConceptsPanel'
import { LessonGuidePanel } from '@/components/LessonGuidePanel'
import { QuickChecksPanel } from '@/components/QuickChecksPanel'
import { UnderstandPanel } from '@/components/UnderstandPanel'
import { StrandMissingPage } from '@/pages/AboutPage'

export function UnderstandPage() {
  const navigate = useNavigate()
  const pack = useStrandPack()

  if (!pack) {
    return <StrandMissingPage />
  }

  return (
    <UnderstandPanel
      pack={pack}
      onBack={() => navigate(strandPath(pack.id))}
      onNext={() => navigate(strandPath(pack.id, 'concepts'))}
    />
  )
}

export function KeyConceptsPage() {
  const navigate = useNavigate()
  const pack = useStrandPack()

  if (!pack) {
    return <StrandMissingPage />
  }

  return (
    <KeyConceptsPanel
      pack={pack}
      onBack={() => navigate(strandPath(pack.id))}
      onNext={() => navigate(strandPath(pack.id, 'lesson'))}
    />
  )
}

export function LessonGuidePage() {
  const navigate = useNavigate()
  const pack = useStrandPack()

  if (!pack) {
    return <StrandMissingPage />
  }

  return (
    <LessonGuidePanel
      pack={pack}
      onBack={() => navigate(strandPath(pack.id))}
      onNext={() => navigate(strandPath(pack.id, 'checks'))}
    />
  )
}

export function QuickChecksPage() {
  const navigate = useNavigate()
  const pack = useStrandPack()

  if (!pack) {
    return <StrandMissingPage />
  }

  return <QuickChecksPanel pack={pack} onBack={() => navigate(strandPath(pack.id))} onDone={() => navigate(strandPath(pack.id))} />
}
