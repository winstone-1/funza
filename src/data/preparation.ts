import type { LucideIcon } from "lucide-react";
import {
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

export const setupFields: IconItem[] = [
  // { title: 'Grade 10', subtitle: 'Grade', icon: GraduationCap },
  { title: "Biology", subtitle: "Subject", icon: FlaskConical },
  { title: "Cell Biology", subtitle: "Strand", icon: Leaf },
];

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