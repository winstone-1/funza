import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpen,
  Brain,
  ClipboardList,
  Download,
  FlaskConical,
  HelpCircle,
  Home,
  Leaf,
  Settings,
  ShieldCheck,
  Sigma,
  UserRoundCheck,
} from "lucide-react";

export type IconItem = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
};

export const navItems: IconItem[] = [
  { title: "Home", icon: Home },
  { title: "My Preparations", icon: ClipboardList },
  { title: "Saved Lessons", icon: Download },
  { title: "Settings", icon: Settings },
  { title: "About Elimu", icon: HelpCircle },
];

export type Strand = {
  id: string;
  title: string;
  /** Strands without a prepared pack are shown but not selectable. */
  available?: boolean;
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

export const grades: Grade[] = [
  {
    id: "grade-10",
    title: "Grade 10",
    subjects: [
      {
        id: "biology",
        title: "Biology",
        icon: FlaskConical,
        strands: [
          { id: "cell-biology", title: "Cell Biology", available: true },
          { id: "nutrition", title: "Nutrition" },
          { id: "transport", title: "Transport in Plants and Animals" },
          { id: "gaseous-exchange", title: "Gaseous Exchange" },
        ],
      },
      {
        id: "chemistry",
        title: "Chemistry",
        icon: Atom,
        strands: [
          { id: "structure-of-the-atom", title: "Structure of the Atom" },
          { id: "acids-bases-salts", title: "Acids, Bases and Salts" },
          { id: "organic-chemistry", title: "Organic Chemistry" },
        ],
      },
      {
        id: "mathematics",
        title: "Mathematics",
        icon: Sigma,
        strands: [
          { id: "numbers", title: "Numbers" },
          { id: "algebra", title: "Algebra" },
          { id: "geometry", title: "Geometry" },
          { id: "data-handling", title: "Data Handling and Probability" },
        ],
      },
    ],
  },
];

export const defaultGradeId = "grade-10";
export const defaultSubjectId = "biology";
export const defaultStrandId = "cell-biology";

export function findGrade(gradeId: string) {
  return grades.find((grade) => grade.id === gradeId);
}

export function findSubject(gradeId: string, subjectId: string) {
  return findGrade(gradeId)?.subjects.find(
    (subject) => subject.id === subjectId,
  );
}

export function findStrand(
  gradeId: string,
  subjectId: string,
  strandId: string,
) {
  return findSubject(gradeId, subjectId)?.strands.find(
    (strand) => strand.id === strandId,
  );
}

export const preparationCards: IconItem[] = [
  {
    title: "Understand",
    subtitle: "The strand in simple terms",
    icon: BookOpen,
  },
  { title: "Key concepts", subtitle: "What you need to know", icon: Brain },
  {
    title: "Lesson guide",
    subtitle: "Plan what to teach",
    icon: ClipboardList,
  },
  {
    title: "Quick checks",
    subtitle: "Questions to use in class",
    icon: HelpCircle,
  },
];

export const lessons = [
  "Introduction to cell structure",
  "Cell components and functions",
  "Plant vs Animal cells",
  "Cell processes",
];

export const lessonSteps = [
  {
    label: "Start",
    title: 'Ask: "What do you think makes up a living thing?"',
    note: "Allow learners to share ideas.",
    icon: UserRoundCheck,
    color: "bg-emerald-700",
  },
  {
    label: "Explain",
    title: "Introduce the concept of cells as the basic units of life.",
    note: "Use diagrams or simple models.",
    icon: BookOpen,
    color: "bg-amber-500",
  },
  {
    label: "Class Activity",
    title: "Learners observe and draw cells from prepared slides or charts.",
    note: "Pair learners for discussion.",
    icon: Leaf,
    color: "bg-sky-600",
  },
  {
    label: "Check",
    title:
      "Ask learners to label a cell diagram and state the function of one part.",
    note: "Use answers to choose the next recap.",
    icon: ShieldCheck,
    color: "bg-violet-700",
  },
];

export const strandGoals = [
  "Cell structure and the main parts",
  "Functions of cell components",
  "Differences between plant and animal cells",
  "How cells support life in living organisms",
];

export const quickChecks = [
  {
    type: "Recall",
    question: "What is the main function of the cell membrane?",
  },
  {
    type: "Understand",
    question: "Label the parts A, B, and C on the cell diagram.",
  },
  {
    type: "Understand",
    question: "Why are mitochondria called the powerhouse of the cell?",
  },
  {
    type: "Recall",
    question: "Give one similarity between plant and animal cells.",
  },
  {
    type: "Apply",
    question:
      "If a cell does not have a nucleus, what type of cell is it likely to be?",
  },
  {
    type: "Apply",
    question: "Explain how cells support life in living organisms.",
  },
];

export const trustItems: IconItem[] = [
  {
    title: "Ready for Class",
    subtitle: "Lesson materials stay easy to open when teaching.",
    icon: Download,
  },
  {
    title: "Grounded in KICD",
    subtitle: "All content is based on official curriculum documents.",
    icon: ClipboardList,
  },
  {
    title: "Teacher-Focused",
    subtitle: "Designed for teachers. Not for learners.",
    icon: UserRoundCheck,
  },
  {
    title: "Careful Guidance",
    subtitle: "Elimu avoids unsupported answers.",
    icon: ShieldCheck,
  },
];

export const strandPack = {
  id: "grade-10-biology-cell-biology",
  title: "Cell Biology",
  grade: "Grade 10",
  subject: "Biology",
  source: "KICD Grade 10 Biology Curriculum Design",
  generatedAt: "2026-09-02T09:00:00.000Z",
};

export const classroomAssurances = [
  {
    title: "Made for teachers",
    body: "Plan what to teach before class, without learner accounts or learner data.",
  },
  {
    title: "Classroom practical",
    body: "Open the strand, lesson guide, and quick checks with minimal steps.",
  },
  {
    title: "Stays grounded",
    body: "Content is kept close to the curriculum and avoids unsupported guesses.",
  },
];
