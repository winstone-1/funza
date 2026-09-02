import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const FALLBACK_TEXT =
  'Cell biology introduces learners to the basic unit of life: the cell. It covers the structure of cells, the functions of their parts, and how cells carry out life processes in plants and animals.'

const CACHE_KEY = 'understand-content-body'

export function useUnderstandContent() {
  const [text, setText] = useState<string>(
    localStorage.getItem(CACHE_KEY) ?? FALLBACK_TEXT
  )

  useEffect(() => {
    async function fetchContent() {
      const { data, error } = await supabase
        .from('content')
        .select('body')
        .eq('content_type', 'explanation')
        .single()

      if (!error && data?.body) {
        setText(data.body)
        localStorage.setItem(CACHE_KEY, data.body)
      }
    }

    fetchContent()
  }, [])

  return text
}