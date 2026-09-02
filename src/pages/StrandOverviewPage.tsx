import { useNavigate } from 'react-router-dom'
import { GuidePanel, type PrepStep } from '@/components/GuidePanel'
import { HeroPanel } from '@/components/HeroPanel'

const routeByStep: Record<PrepStep, string> = {
  understand: '/strands/cell-biology/understand',
  concepts: '/strands/cell-biology/key-concepts',
  lesson: '/strands/cell-biology/lesson-guide',
  checks: '/strands/cell-biology/quick-checks',
}

export function StrandOverviewPage() {
  const navigate = useNavigate()

  return (
    <>
      <HeroPanel />
      <GuidePanel onSelect={(step) => navigate(routeByStep[step])} />
    </>
  )
}
