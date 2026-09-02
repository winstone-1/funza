import type { LucideIcon } from "lucide-react";
import { BookOpen, Brain, ClipboardList, FlaskConical, HelpCircle, Home } from "lucide-react";
import { strandPacks } from "@/data/strands";
import type { TranslationKey } from "@/lib/i18n";

/** App chrome. Curriculum content lives in data/strands.ts. */

export type NavItem = {
  labelKey: TranslationKey;
  to: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { labelKey: "nav.home", to: "/", icon: Home },
  { labelKey: "nav.about", to: "/about", icon: HelpCircle },
];

export type Strand = {
  id: string;
  title: string;
};

export type Subject = {
  id: string;
  title: string;
  icon: LucideIcon;
  strands: Strand[];
};

export type Grade = {
  id: string;
  title: string;
  subjects: Subject[];
};

// Only prepared subjects are listed, so every option in the picker leads to real content.
export const grades: Grade[] = [
  {
    id: "grade-10",
    title: "Grade 10",
    subjects: [
      {
        id: "biology",
        title: "Biology",
        icon: FlaskConical,
        strands: strandPacks.map(({ id, title }) => ({ id, title })),
      },
    ],
  },
];

export const defaultGradeId = "grade-10";
export const defaultSubjectId = "biology";

export function findGrade(gradeId: string) {
  return grades.find((grade) => grade.id === gradeId);
}

export function findSubject(gradeId: string, subjectId: string) {
  return findGrade(gradeId)?.subjects.find((subject) => subject.id === subjectId);
}

export function findStrand(gradeId: string, subjectId: string, strandId: string) {
  return findSubject(gradeId, subjectId)?.strands.find((strand) => strand.id === strandId);
}

export type PrepStep = "understand" | "concepts" | "lesson" | "checks";

export type PrepCard = {
  step: PrepStep;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  icon: LucideIcon;
  /** Path segment under /strands/:strandId. */
  segment: string;
};

export const prepCards: PrepCard[] = [
  {
    step: "understand",
    titleKey: "guide.understand",
    subtitleKey: "guide.understandSub",
    icon: BookOpen,
    segment: "understand",
  },
  {
    step: "concepts",
    titleKey: "guide.concepts",
    subtitleKey: "guide.conceptsSub",
    icon: Brain,
    segment: "key-concepts",
  },
  {
    step: "lesson",
    titleKey: "guide.lesson",
    subtitleKey: "guide.lessonSub",
    icon: ClipboardList,
    segment: "lesson-guide",
  },
  {
    step: "checks",
    titleKey: "guide.checks",
    subtitleKey: "guide.checksSub",
    icon: HelpCircle,
    segment: "quick-checks",
  },
];

export const totalPrepSteps = prepCards.length;

export function stepIndex(step: PrepStep) {
  return prepCards.findIndex((card) => card.step === step) + 1;
}

export function strandPath(strandId: string, step?: PrepStep) {
  const card = step ? prepCards.find((entry) => entry.step === step) : undefined;

  return card ? `/strands/${strandId}/${card.segment}` : `/strands/${strandId}`;
}
