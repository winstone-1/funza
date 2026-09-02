import { ArrowRight, FileCheck2, GraduationCap, Leaf } from "lucide-react";
import { useMemo, useState } from "react";
import {
  defaultGradeId,
  defaultStrandId,
  defaultSubjectId,
  findGrade,
  findStrand,
  findSubject,
} from "@/data/preparation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SetupPanelProps = {
  onStart: (gradeId: string, subjectId: string, strandId: string) => void;
};

const triggerClass =
  "grid h-auto min-h-16 w-full grid-cols-[36px_minmax(0,1fr)_16px] items-center gap-3 rounded-lg border-stone-200 bg-white px-3 text-left hover:bg-stone-50";

// Only Grade 10 is prepared, so the grade is fixed context rather than a picker.
const gradeId = defaultGradeId;
const grade = findGrade(gradeId);
const subjects = grade?.subjects ?? [];
const subjectItems = subjects.map(({ id, title }) => ({
  label: title,
  value: id,
}));

export function SetupPanel({ onStart }: SetupPanelProps) {
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

  const canStart = Boolean(subjectId && strandId && strand?.available);

  return (
    <article className="rounded-lg border border-emerald-950/10 bg-white/95 p-5 shadow-[0_14px_36px_rgba(28,40,29,0.08)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-stone-950">
            Good morning, Mwalimu
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            What are you preparing to teach today?
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900">
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
          <SelectTrigger className={triggerClass} aria-label="Subject">
            <span className="grid size-9 place-items-center rounded-md bg-emerald-50 text-emerald-700">
              {subject ? <subject.icon size={18} /> : <Leaf size={18} />}
            </span>
            <span className="grid min-w-0 gap-0.5">
              <small className="text-xs font-medium text-stone-500">
                Subject
              </small>
              <SelectValue
                className="truncate text-[0.95rem] font-bold text-stone-950 data-placeholder:font-medium data-placeholder:text-stone-400"
                placeholder="Choose a subject"
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
                <Icon className="text-emerald-700" />
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
          <SelectTrigger className={triggerClass} aria-label="Strand">
            <span className="grid size-9 place-items-center rounded-md bg-emerald-50 text-emerald-700">
              <Leaf size={18} />
            </span>
            <span className="grid min-w-0 gap-0.5">
              <small className="text-xs font-medium text-stone-500">
                Strand
              </small>
              <SelectValue
                className="truncate text-[0.95rem] font-bold text-stone-950 data-placeholder:font-medium data-placeholder:text-stone-400"
                placeholder={
                  subjectId ? "Choose a strand" : "Choose a subject first"
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
            {strands.map(({ available, id, title }) => (
              <SelectItem
                key={id}
                value={id}
                disabled={!available}
                className="py-2"
              >
                {title}
                {available ? null : (
                  <small className="ml-auto text-xs text-stone-500">
                    Coming soon
                  </small>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(180deg,#05865d,#006140)] font-extrabold text-white shadow-inner hover:bg-emerald-800"
        type="button"
        disabled={!canStart}
        onClick={() => {
          if (subjectId && strandId && canStart) {
            onStart(gradeId, subjectId, strandId);
          }
        }}
      >
        Start preparing
        <ArrowRight size={18} />
      </Button>

      <div className="mt-5 grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
        <FileCheck2 size={18} />
        <span>
          {grade && subject
            ? `Prepared from the ${grade.title} ${subject.title} curriculum`
            : "Pick a subject to see the curriculum source"}
        </span>
        <small className="col-start-2 text-xs text-stone-800">
          {strand ? `${strand.title} strand` : "No strand selected yet"}
        </small>
      </div>
    </article>
  );
}
