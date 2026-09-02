import { useEffect, useState } from 'react'
import type { StrandPack } from '@/data/strands'
import { useOnlineStatus } from '@/hooks/use-online-status'
import { supabase } from '@/lib/supabase'

const CACHE_PREFIX = 'understand-content-body'

type UnderstandContent = {
  text: string
  /** True once the curriculum-generated explanation is in hand, cached or fresh. */
  isGenerated: boolean
}

/**
 * Explanation for one strand. The pack's own summary ships with the app so the panel
 * is never empty offline; the generated version replaces it and is cached per strand.
 */
export function useUnderstandContent(pack: StrandPack): UnderstandContent {
  const isOnline = useOnlineStatus()
  const cacheKey = `${CACHE_PREFIX}:${pack.curriculumStrand}`

  const [content, setContent] = useState<UnderstandContent>(() => {
    const cached = localStorage.getItem(cacheKey)

    return cached ? { text: cached, isGenerated: true } : { text: pack.explanation, isGenerated: false }
  })

  useEffect(() => {
    if (!isOnline) {
      return
    }

    let active = true

    async function fetchContent() {
      // Scoped to one strand, newest first: each run of scripts/generate-content.js
      // appends an explanation rather than replacing the previous one.
      const { data, error } = await supabase
        .from('content')
        .select('body, strands!inner(name)')
        .eq('content_type', 'explanation')
        .eq('strands.name', pack.curriculumStrand)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error(`Explanation fetch failed for "${pack.curriculumStrand}"`, error)
        return
      }

      if (!active || !data?.body) {
        return
      }

      setContent({ text: data.body, isGenerated: true })
      localStorage.setItem(cacheKey, data.body)
    }

    fetchContent()

    return () => {
      active = false
    }
  }, [cacheKey, isOnline, pack.curriculumStrand])

  return content
}
