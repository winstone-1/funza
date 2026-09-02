import { useParams } from 'react-router-dom'
import { findStrandPack } from '@/data/strands'

/** Resolves the :strandId route param to its content pack, or undefined if unknown. */
export function useStrandPack() {
  const { strandId } = useParams<{ strandId: string }>()

  return findStrandPack(strandId)
}
