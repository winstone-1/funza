import { useNavigate } from 'react-router-dom'
import { strandPath } from '@/data/preparation'
import { useStrandPack } from '@/hooks/use-strand-pack'
import { GuidePanel } from '@/components/GuidePanel'
import { HeroPanel } from '@/components/HeroPanel'
import { StrandMissingPage } from '@/pages/AboutPage'

export function StrandOverviewPage() {
  const navigate = useNavigate()
  const pack = useStrandPack()

  if (!pack) {
    return <StrandMissingPage />
  }

  return (
    <>
      <HeroPanel pack={pack} />
      <GuidePanel onSelect={(step) => navigate(strandPath(pack.id, step))} />
    </>
  )
}
