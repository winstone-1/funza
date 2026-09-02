import { ArrowRight, FileCheck2, GraduationCap, Leaf } from "lucide-react";
import { useMemo, useState } from "react";
import {
  defaultGradeId,
  defaultSubjectId,
  findGrade,
  findStrand,
  findSubject,
} from "@/data/preparation";
import { defaultStrandId } from "@/data/strands";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RippleEffect } from "./ripple-effect";

type SetupPanelProps = {
  onStart: (gradeId: string, subjectId: string, strandId: string) => void;
};

const triggerClass =
  "grid h-auto min-h-16 w-full grid-cols-[36px_minmax(0,1fr)_16px] items-center gap-3 rounded-lg border-stone-200/50 bg-white/50 px-3 text-left hover:bg-stone-100/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white";

// Only Grade 10 is prepared, so the grade is fixed context rather than a picker.
const gradeId = defaultGradeId;
const grade = findGrade(gradeId);
const subjects = grade?.subjects ?? [];
const subjectItems = subjects.map(({ id, title }) => ({
  label: title,
  value: id,
}));

export function SetupPanel({ onStart }: SetupPanelProps) {
  const { t } = useI18n();
  const [subjectId, setSubjectId] = useState<string | null>(defaultSubjectId);
  const [strandId, setStrandId] = useState<string | null>(defaultStrandId);

  const subject = subjectId ? findSubject(gradeId, subjectId) : undefined;
  const strands = subject?.strands ?? [];
  const strand =
    subjectId && strandId
      ? findStrand(gradeId, subjectId, strandId)
      : undefined;

  // Base UI drops the selected value when the `items` array identity changes,
  // so this has to stay stable between renders.
  const strandItems = useMemo(
    () =>
      (subjectId ? (findSubject(gradeId, subjectId)?.strands ?? []) : []).map(
        ({ id, title }) => ({ label: title, value: id }),
      ),
    [subjectId],
  );

  const canStart = Boolean(subjectId && strandId && strand);

  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/50 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] backdrop-blur-sm dark:bg-white/5 dark:border-white/10 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-stone-950 dark:text-white">
            {t("setup.greeting")}
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {t("setup.prompt")}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50/50 px-3 py-1.5 text-xs font-bold text-emerald-900 backdrop-blur-sm dark:bg-emerald-900/30 dark:text-emerald-300">
          <GraduationCap size={14} />
          {grade?.title ?? "Grade 10"}
        </span>
      </div>

      <div className="my-6 grid gap-3">
        <Select
          items={subjectItems}
          value={subjectId}
          onValueChange={(nextSubjectId: string | null) => {
            if (!nextSubjectId) {
              return;
            }

            setSubjectId(nextSubjectId);
            // Strands belong to a subject, so the old pick is never valid here.
            setStrandId(null);
          }}
        >
          <SelectTrigger className={triggerClass} aria-label={t("setup.subject")}>
            <span className="grid size-9 place-items-center rounded-md bg-emerald-50/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {subject ? <subject.icon size={18} /> : <Leaf size={18} />}
            </span>
            <span className="grid min-w-0 gap-0.5">
              <small className="text-xs font-medium text-stone-500 dark:text-stone-400">
                {t("setup.subject")}
              </small>
              <SelectValue
                className="truncate text-[0.95rem] font-bold text-stone-950 data-placeholder:font-medium data-placeholder:text-stone-400 dark:text-white"
                placeholder={t("setup.subjectPlaceholder")}
              />
            </span>
          </SelectTrigger>
          <SelectContent
            align="start"
            sideOffset={6}
            alignItemWithTrigger={false}
            className="p-1"
          >
            {subjects.map(({ icon: Icon, id, title }) => (
              <SelectItem key={id} value={id} className="py-2">
                <Icon className="text-emerald-700 dark:text-emerald-400" />
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={strandItems}
          value={strandId}
          disabled={!subjectId}
          onValueChange={(nextStrandId: string | null) => {
            if (nextStrandId) {
              setStrandId(nextStrandId);
            }
          }}
        >
          <SelectTrigger className={triggerClass} aria-label={t("setup.strand")}>
            <span className="grid size-9 place-items-center rounded-md bg-emerald-50/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Leaf size={18} />
            </span>
            <span className="grid min-w-0 gap-0.5">
              <small className="text-xs font-medium text-stone-500 dark:text-stone-400">
                {t("setup.strand")}
              </small>
              <SelectValue
                className="truncate text-[0.95rem] font-bold text-stone-950 data-placeholder:font-medium data-placeholder:text-stone-400 dark:text-white"
                placeholder={
                  subjectId
                    ? t("setup.strandPlaceholder")
                    : t("setup.strandPlaceholderLocked")
                }
              />
            </span>
          </SelectTrigger>
          <SelectContent
            align="start"
            sideOffset={6}
            alignItemWithTrigger={false}
            className="p-1"
          >
            {strands.map(({ id, title }) => (
              <SelectItem key={id} value={id} className="py-2">
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <RippleEffect className="w-full rounded-lg">
        <Button
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 font-extrabold text-white shadow-inner hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          type="button"
          disabled={!canStart}
          onClick={() => {
            if (subjectId && strandId && canStart) {
              onStart(gradeId, subjectId, strandId);
            }
          }}
        >
          {t("setup.start")}
          <ArrowRight size={18} />
        </Button>
      </RippleEffect>

      <div className="mt-5 grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 rounded-lg bg-emerald-50/50 p-4 text-sm text-emerald-900 backdrop-blur-sm dark:bg-emerald-900/20 dark:text-emerald-100/80">
        <FileCheck2 size={18} />
        <span>
          {grade && subject
            ? t("setup.preparedFrom", {
                grade: grade.title,
                subject: subject.title,
              })
            : t("setup.subjectPlaceholder")}
        </span>
        <small className="col-start-2 text-xs text-stone-800 dark:text-stone-400">
          {strand
            ? t("setup.strandSuffix", { strand: strand.title })
            : t("setup.noStrand")}
        </small>
      </div>
    </article>
  );
}
