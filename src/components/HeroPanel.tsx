import { BookOpen, Sparkles } from 'lucide-react'
import cellImage from '@/assets/cell-biology.png'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function MobileTopbar() {
  return (
    <header className="flex min-h-11 items-center justify-between md:hidden">
      <div className="flex items-center gap-2 text-emerald-950">
        <BookOpen size={21} />
        <strong className="text-lg">Elimu</strong>
      </div>
      <SidebarTrigger className="size-9 rounded-full bg-transparent text-stone-950 hover:bg-emerald-50" />
    </header>
  )
}

export function HeroPanel() {
  return (
    <section className="relative min-h-64 overflow-hidden rounded-lg border border-emerald-950/10 bg-white bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(240,249,234,0.86))] p-6 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-8">
      <div className="relative z-10 max-w-3xl">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-normal text-emerald-800">Biology</p>
        <h1 className="max-w-[70%] text-3xl font-black leading-none text-stone-950 sm:max-w-xl sm:text-6xl">
          Cell Biology
        </h1>
        <p className="mt-3 text-sm text-stone-500 sm:text-xl">Grade 10 Strand</p>

        <div className="mt-6 flex max-w-lg items-start gap-3 rounded-lg bg-[linear-gradient(90deg,#eaf6e7,rgba(234,246,231,0.35))] p-4">
          <Sparkles className="text-emerald-700" size={23} />
          <div>
            <strong className="block text-xs uppercase text-emerald-800">New strand</strong>
            <span className="mt-1 block max-w-[39ch] text-sm leading-relaxed text-stone-950">
              You have not taught this before. Let us get you ready to walk into the classroom prepared.
            </span>
          </div>
        </div>
      </div>

      <img
        className="absolute bottom-16 right-2 w-[min(162px,40vw)] drop-shadow-[0_22px_25px_rgba(19,66,32,0.22)] sm:-bottom-11 sm:right-3 sm:w-[min(355px,42vw)]"
        src={cellImage}
        alt="3D plant cell model"
      />
    </section>
  )
}
