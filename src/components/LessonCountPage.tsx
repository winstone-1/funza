import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, CheckCircle2, Download, FileCheck2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { strandPath } from '@/data/preparation'
import { useI18n } from '@/lib/i18n'
import { motion } from 'motion/react'

export function LessonCountPage({ lessonNumber, totalLessons }: { lessonNumber: number; totalLessons: number }) {
  const { t } = useI18n()
  const [lessons, setLessons] = useState<number[]>([])
  const [isSaved, setIsSaved] = useState(false)

  // Initialize with completed lessons from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('funza-completed-lessons')
    if (saved) {
      setLessons(JSON.parse(saved))
    }
  }, [])

  // Save lesson as completed
  const saveLessonCompletion = () => {
    const updated = Array.from(new Set([...lessons, lessonNumber]))
    setLessons(updated)
    localStorage.setItem('funza-completed-lessons', JSON.stringify(updated))
    setIsSaved(true)

    // Reset saved state after 2 seconds
    setTimeout(() => setIsSaved(false), 2000)
  }

  const isCompleted = lessons.includes(lessonNumber)
  const completionPercentage = Math.round((lessons.length / totalLessons) * 100)

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-emerald-950/10 bg-white/50 p-6 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10"
    >
      <div className="mb-6 space-y-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-normal text-emerald-800 dark:text-emerald-300">
            Lesson Progress
          </p>
          <h1 className="mt-2 text-2xl font-black text-stone-950 dark:text-white">
            {t('lesson.number', { n: lessonNumber })}
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            {isCompleted ? 'This lesson is saved and marked as complete.' : 'Complete this lesson and save your progress.'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-stone-700 dark:text-stone-300">Overall Progress</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-300">{completionPercentage}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-stone-200/50 overflow-hidden dark:bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400"
            />
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {lessons.length} of {totalLessons} lessons completed
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="mt-6">
          <p className="mb-3 text-sm font-bold text-stone-700 dark:text-stone-300">Completed Lessons:</p>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: totalLessons }).map((_, i) => {
              const num = i + 1
              const done = lessons.includes(num)
              return (
                <motion.div
                  key={num}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-lg p-2 text-center text-sm font-bold transition-all ${
                    done
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 shadow-[0_4px_12px_rgba(6,78,59,0.2)]'
                      : 'bg-stone-100/50 dark:bg-white/10 text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {done ? <CheckCircle2 size={16} className="mx-auto" /> : num}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={saveLessonCompletion}
          disabled={isCompleted}
          className={`flex-1 min-h-11 rounded-lg font-extrabold transition-all ${
            isSaved || isCompleted
              ? 'border-emerald-700 bg-emerald-100 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'border-emerald-800 bg-emerald-700 text-white hover:bg-emerald-800 dark:border-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700'
          }`}
        >
          {isSaved ? (
            <>
              <Check size={18} />
              Saved!
            </>
          ) : isCompleted ? (
            <>
              <FileCheck2 size={18} />
              Completed
            </>
          ) : (
            <>
              <Download size={18} />
              Save Lesson {lessonNumber}
            </>
          )}
        </Button>

        <Button
          render={<Link to={`${strandPath('cell-biology')}`} />}
          className="flex-1 min-h-11 rounded-lg border border-emerald-800 bg-white px-4 font-extrabold text-emerald-900 hover:bg-emerald-50 dark:border-emerald-400 dark:bg-transparent dark:text-emerald-300 dark:hover:bg-emerald-900/30"
        >
          Back to Overview
        </Button>
      </div>
    </motion.section>
  )
}
