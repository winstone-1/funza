import { useNavigate } from 'react-router-dom'
import { SetupPanel } from '@/components/SetupPanel'

export function PrepareHomePage() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto grid w-full max-w-2xl gap-5">
      <SetupPanel onStart={() => navigate('/strands/cell-biology')} />
    </section>
  )
}
