import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { useState } from 'react'
import { lessonSteps, lessons } from '@/data/preparation'
import { Button } from '@/components/ui/button'

type LessonGuidePanelProps = {
  onBack: () => void
  onNext: () => void
}

export function LessonGuidePanel({ onBack, onNext }: LessonGuidePanelProps) {
  const [activeLesson, setActiveLesson] = useState(0)

  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-6 lg:col-span-2">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          className="grid size-8 place-items-center rounded-full bg-stone-100 p-0 text-stone-950 hover:bg-stone-200"
          type="button"
          aria-label="Back"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
        </Button>
        <strong>Lesson guide</strong>
        <span className="text-sm font-extrabold">03 / 04</span>
      </div>

      <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <strong className="mb-2 block text-xs uppercase tracking-wide text-stone-500">
            Lessons
          </strong>
          {/* Scrolls sideways on narrow screens, stacks once there is room for a column. */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 xl:mx-0 xl:grid xl:px-0 xl:pb-0">
            {lessons.map((lesson, index) => {
              const isActive = index === activeLesson

              return (
                <Button
                  variant="outline"
                  className={`h-auto min-w-52 shrink-0 flex-col items-start justify-start gap-1 whitespace-normal rounded-lg border-stone-200 p-3 text-left text-sm leading-snug text-stone-950 hover:bg-stone-50 xl:w-full xl:min-w-0 ${
                    isActive ? 'border-emerald-600 bg-emerald-50 hover:bg-emerald-50' : 'bg-white'
                  }`}
                  type="button"
                  aria-current={isActive ? 'step' : undefined}
                  onClick={() => setActiveLesson(index)}
                  key={lesson}
                >
                  <span className="text-xs font-extrabold text-emerald-800">
                    Lesson {index + 1}
                  </span>
                  <span className="font-semibold">{lesson}</span>
                </Button>
              )
            })}
          </div>
        </aside>

        <div className="min-w-0">
          <h2 className="text-xl font-black text-stone-950 sm:text-2xl">
            Lesson {activeLesson + 1}: {lessons[activeLesson]}
          </h2>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-stone-500">
            <Clock3 size={14} />
            40-50 minutes
          </p>

          <ol className="mt-5 grid gap-3">
            {lessonSteps.map(({ label, title, note, icon: Icon, color }, index) => (
              <li
                className="grid grid-cols-[36px_minmax(0,1fr)] items-start gap-3 rounded-lg border border-stone-200 p-3 sm:grid-cols-[36px_minmax(0,1fr)_24px] sm:gap-4 sm:p-4"
                key={label}
              >
                <span
                  className={`grid size-9 place-items-center rounded-full text-xs font-black text-white ${color}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <strong className="text-xs uppercase tracking-wide text-emerald-800">
                    {label}
                  </strong>
                  <p className="mt-1 text-sm leading-relaxed text-stone-950">{title}</p>
                  <small className="mt-1 block text-xs leading-relaxed text-stone-500">
                    {note}
                  </small>
                </div>
                <Icon className="mt-0.5 hidden text-emerald-700 sm:block" size={20} />
              </li>
            ))}
          </ol>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="grid content-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <strong className="text-xs uppercase tracking-wide text-amber-700">
                Common misconception
              </strong>
              <span className="text-sm leading-relaxed">
                Learners often think plant cells and animal cells are completely different. Help
                them see both similarities and differences.
              </span>
            </div>
            <div className="grid content-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
              <strong className="text-xs uppercase tracking-wide text-emerald-800">
                Teacher tip
              </strong>
              <span className="text-sm leading-relaxed">
                Use everyday examples like onion skin, cheek cell, or a leaf to make it real.
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="mt-6 min-h-12 w-full rounded-lg bg-[linear-gradient(180deg,#05865d,#006140)] px-5 font-extrabold text-white hover:bg-emerald-800 sm:w-auto"
        type="button"
        onClick={onNext}
      >
        Quick checks
        <ArrowRight size={17} />
      </Button>
    </article>
  )
}
