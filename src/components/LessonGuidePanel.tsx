import { ArrowLeft, ArrowRight } from 'lucide-react'
import { lessonSteps, lessons } from '@/data/preparation'
import { Button } from '@/components/ui/button'

type LessonGuidePanelProps = {
  onBack: () => void
  onNext: () => void
}

export function LessonGuidePanel({ onBack, onNext }: LessonGuidePanelProps) {
  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-6 lg:col-span-2">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button className="grid size-8 place-items-center rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200" type="button" aria-label="Back" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <strong>Lesson guide</strong>
        <span className="text-sm font-extrabold">03 / 04</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)_210px]">
        <aside className="flex gap-2 overflow-x-auto rounded-lg border border-stone-200 p-2 lg:grid lg:content-start lg:p-4">
          <strong className="mb-2 hidden text-xs uppercase lg:block">Lessons</strong>
          {lessons.map((lesson, index) => (
            <Button
              className={`grid min-w-44 gap-1 rounded-lg p-3 text-left text-sm leading-tight ${
                index === 0 ? 'bg-emerald-50' : ''
              }`}
              type="button"
              key={lesson}
            >
              <span className="text-xs font-extrabold text-emerald-800">Lesson {index + 1}</span>
              {lesson}
            </Button>
          ))}
        </aside>

        <div>
          <h2 className="text-xl font-black text-stone-950 sm:text-2xl">Lesson 1: Introduction to cell structure</h2>
          <p className="mt-2 text-xs text-stone-500">Duration: 40-50 minutes</p>

          <div className="mt-5 grid gap-3">
            {lessonSteps.map(({ label, title, note, icon: Icon, color }, index) => (
              <div
                className="grid min-h-20 grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-stone-200 p-3 sm:grid-cols-[44px_minmax(0,1fr)_32px]"
                key={label}
              >
                <span className={`grid size-9 place-items-center rounded-full text-xs font-black text-white ${color}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <strong className="text-xs uppercase text-emerald-800">{label}</strong>
                  <p className="my-1 text-sm leading-snug">{title}</p>
                  <small className="text-xs text-stone-500">{note}</small>
                </div>
                <Icon className="hidden text-emerald-700 sm:block" size={22} />
              </div>
            ))}
          </div>
        </div>

        <aside className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="grid gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <strong className="text-xs uppercase text-amber-700">Common misconception</strong>
            <span className="text-sm leading-relaxed">
              Learners often think plant cells and animal cells are completely different. Help them see both similarities and differences.
            </span>
          </div>
          <div className="grid gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <strong className="text-xs uppercase text-emerald-800">Teacher tip</strong>
            <span className="text-sm leading-relaxed">
              Use everyday examples like onion skin, cheek cell, or a leaf to make it real.
            </span>
          </div>
        </aside>
      </div>

      <Button
        className="mt-5 min-h-12 w-full rounded-lg bg-[linear-gradient(180deg,#05865d,#006140)] px-5 font-extrabold text-white hover:bg-emerald-800 sm:w-auto"
        type="button"
        onClick={onNext}
      >
        Quick checks
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
