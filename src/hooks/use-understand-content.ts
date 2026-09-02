import { useEffect, useState } from 'react'
import { strandPack } from '@/data/preparation'
import { supabase } from '@/lib/supabase'

const FALLBACK_TEXT =
  'Cell biology introduces learners to the basic unit of life: the cell. It covers the structure of cells, the functions of their parts, and how cells carry out life processes in plants and animals.'

const CACHE_PREFIX = 'understand-content-body'

export function useUnderstandContent(strandName: string = strandPack.curriculumStrand) {
  const cacheKey = `${CACHE_PREFIX}:${strandName}`
  const [text, setText] = useState<string>(() => localStorage.getItem(cacheKey) ?? FALLBACK_TEXT)

  useEffect(() => {
    let active = true

    async function fetchContent() {
      // Scoped to one strand, newest first: each run of scripts/generate-content.js
      // appends an explanation rather than replacing the previous one.
      const { data, error } = await supabase
        .from('content')
        .select('body, strands!inner(name)')
        .eq('content_type', 'explanation')
        .eq('strands.name', strandName)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error(`Explanation fetch failed for "${strandName}"`, error)
        return
      }

      if (!active || !data?.body) {
        return
      }

      setText(data.body)
      localStorage.setItem(cacheKey, data.body)
    }

    fetchContent()

    return () => {
      active = false
    }
  }, [cacheKey, strandName])

  return text
}
