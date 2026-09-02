import { useParams } from 'react-router-dom'
import { LessonCountPage } from '@/components/LessonCountPage'
import { StrandMissingPage } from '@/pages/AboutPage'
import { useStrandPack } from '@/hooks/use-strand-pack'

export function LessonCompletionPage() {
  const pack = useStrandPack()
  const { lesson } = useParams<{ lesson: string }>()
  const lessonNumber = lesson ? parseInt(lesson, 10) : 1

  if (!pack || isNaN(lessonNumber) || lessonNumber < 1) {
    return <StrandMissingPage />
  }

  // Count total lessons from the pack (assuming lessons array exists)
  const totalLessons = pack.lessons?.length || 12

  return <LessonCountPage lessonNumber={lessonNumber} totalLessons={totalLessons} />
}
