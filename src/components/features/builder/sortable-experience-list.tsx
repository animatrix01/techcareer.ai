"use client";

import { useState } from "react";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, Loader2Icon, Trash2Icon, WandSparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/useBuilderStore";

const MOCK_BULLETS = [
  "Led cross-functional delivery of a core feature that improved activation and reduced onboarding friction.",
  "Optimized performance bottlenecks and cut critical user-facing latency with measurable reliability gains.",
  "Partnered with product and design to ship iterative improvements backed by clear impact metrics.",
];

function appendBullets(existingText: string) {
  const existing = existingText.trim();
  const generated = MOCK_BULLETS.map((line) => `- ${line}`).join("\n");
  return existing ? `${existing}\n${generated}` : generated;
}

function SortableExperienceCard({ id }: { id: string }) {
  const exp = useBuilderStore((s) =>
    s.resume.experience.find((e) => e.id === id),
  );
  const updateExperience = useBuilderStore((s) => s.updateExperience);
  const removeExperience = useBuilderStore((s) => s.removeExperience);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!exp) return null;

  function handleSuggestBullets() {
    if (isSuggesting) return;
    const current = exp;
    if (!current) return;
    setIsSuggesting(true);
    const prior = current.description;
    setTimeout(() => {
      updateExperience(id, { description: appendBullets(prior) });
      setIsSuggesting(false);
    }, 2000);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-xl border border-white/10 bg-zinc-900/60 p-3 shadow-sm ring-1 ring-white/5",
        isDragging && "z-10 opacity-90 ring-2 ring-emerald-500/40",
      )}
    >
      <div className="mb-2 flex items-start gap-2">
        <button
          type="button"
          className="mt-1.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-zinc-950/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          aria-label="Drag to reorder role"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="size-4" />
        </button>
        <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor={`role-${id}`}>Title</Label>
            <Input
              id={`role-${id}`}
              value={exp.role}
              onChange={(e) =>
                updateExperience(id, { role: e.target.value })
              }
              placeholder="Software Engineer"
              className="bg-zinc-950/80"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`company-${id}`}>Company</Label>
            <Input
              id={`company-${id}`}
              value={exp.company}
              onChange={(e) =>
                updateExperience(id, { company: e.target.value })
              }
              placeholder="Acme Inc."
              className="bg-zinc-950/80"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`start-${id}`}>Start</Label>
            <Input
              id={`start-${id}`}
              value={exp.startDate}
              onChange={(e) =>
                updateExperience(id, { startDate: e.target.value })
              }
              placeholder="Jan 2024"
              className="bg-zinc-950/80"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`end-${id}`}>End</Label>
            <Input
              id={`end-${id}`}
              value={exp.endDate}
              onChange={(e) =>
                updateExperience(id, { endDate: e.target.value })
              }
              placeholder="Present"
              className="bg-zinc-950/80"
            />
          </div>
        </div>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="shrink-0 text-zinc-500 hover:text-rose-400"
          onClick={() => removeExperience(id)}
          aria-label="Remove role"
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>
      <div className="space-y-1 pl-10">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={`desc-${id}`}>Impact (one bullet per line)</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleSuggestBullets}
            disabled={isSuggesting}
            className="h-8 gap-1.5 border-emerald-400/30 bg-emerald-500/10 px-2.5 text-[11px] text-emerald-200 hover:bg-emerald-500/20"
          >
            {isSuggesting ? (
              <>
                <Loader2Icon className="size-3.5 animate-spin" />
                Suggesting...
              </>
            ) : (
              <>
                <WandSparklesIcon className="size-3.5" />
                ✨ Suggest Bullets
              </>
            )}
          </Button>
        </div>
        <Textarea
          id={`desc-${id}`}
          value={exp.description}
          onChange={(e) =>
            updateExperience(id, { description: e.target.value })
          }
          placeholder="Shipped X to Y users…"
          rows={4}
          className="resize-y bg-zinc-950/80"
        />
      </div>
    </div>
  );
}

export function SortableExperienceList() {
  const experience = useBuilderStore((s) => s.resume.experience);
  const reorderExperience = useBuilderStore((s) => s.reorderExperience);
  const addExperience = useBuilderStore((s) => s.addExperience);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = experience.map((e) => e.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    if (oldIndex !== newIndex) {
      reorderExperience(oldIndex, newIndex);
    }
  }

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {experience.map((e) => (
              <SortableExperienceCard key={e.id} id={e.id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed border-white/15 bg-zinc-950/40 text-zinc-200 hover:bg-zinc-900/80"
        onClick={() => addExperience()}
      >
        Add role
      </Button>
    </div>
  );
}
