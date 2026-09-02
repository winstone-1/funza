import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="rounded-lg border border-emerald-950/10 bg-white/50 p-6 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">Demo scope</p>
      <h1 className="text-2xl font-black text-stone-950 dark:text-white">{title}</h1>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-600 dark:text-stone-400">{description}</p>

      <Button
        className="mt-5 min-h-11 rounded-lg border border-emerald-800 bg-white px-4 font-extrabold text-emerald-900 hover:bg-emerald-50 dark:border-emerald-400 dark:bg-transparent dark:text-emerald-300 dark:hover:bg-emerald-900/30"
        render={<Link to="/" />}
      >
        <ArrowLeft size={17} />
        Prepare a strand
      </Button>
    </section>
  )
}
