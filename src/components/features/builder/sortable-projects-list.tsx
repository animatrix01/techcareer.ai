"use client";

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
import { GripVerticalIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/useBuilderStore";

function SortableProjectCard({ id }: { id: string }) {
  const project = useBuilderStore((s) =>
    s.resume.projects.find((p) => p.id === id),
  );
  const updateProject = useBuilderStore((s) => s.updateProject);
  const removeProject = useBuilderStore((s) => s.removeProject);

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

  if (!project) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-xl border border-white/10 bg-zinc-900/60 p-3 shadow-sm ring-1 ring-white/5",
        isDragging && "z-10 opacity-90 ring-2 ring-violet-500/40",
      )}
    >
      <div className="mb-2 flex items-start gap-2">
        <button
          type="button"
          className="mt-1.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-zinc-950/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          aria-label="Drag to reorder project"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="size-4" />
        </button>
        <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor={`pname-${id}`}>Name</Label>
            <Input
              id={`pname-${id}`}
              value={project.name}
              onChange={(e) =>
                updateProject(id, { name: e.target.value })
              }
              placeholder="Realtime collab whiteboard"
              className="bg-zinc-950/80"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor={`purl-${id}`}>Link</Label>
            <Input
              id={`purl-${id}`}
              value={project.url}
              onChange={(e) =>
                updateProject(id, { url: e.target.value })
              }
              placeholder="https://github.com/you/project"
              className="bg-zinc-950/80"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor={`pstack-${id}`}>Stack (comma-separated)</Label>
            <Input
              id={`pstack-${id}`}
              value={project.stack}
              onChange={(e) =>
                updateProject(id, { stack: e.target.value })
              }
              placeholder="TypeScript, Next.js, PostgreSQL"
              className="bg-zinc-950/80"
            />
          </div>
        </div>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="shrink-0 text-zinc-500 hover:text-rose-400"
          onClick={() => removeProject(id)}
          aria-label="Remove project"
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>
      <div className="space-y-1 pl-10">
        <Label htmlFor={`pdesc-${id}`}>Description</Label>
        <Textarea
          id={`pdesc-${id}`}
          value={project.description}
          onChange={(e) =>
            updateProject(id, { description: e.target.value })
          }
          placeholder="What you built and the outcome."
          rows={3}
          className="resize-y bg-zinc-950/80"
        />
      </div>
    </div>
  );
}

export function SortableProjectsList() {
  const projects = useBuilderStore((s) => s.resume.projects);
  const reorderProjects = useBuilderStore((s) => s.reorderProjects);
  const addProject = useBuilderStore((s) => s.addProject);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = projects.map((p) => p.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    if (oldIndex !== newIndex) {
      reorderProjects(oldIndex, newIndex);
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
            {projects.map((p) => (
              <SortableProjectCard key={p.id} id={p.id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed border-white/15 bg-zinc-950/40 text-zinc-200 hover:bg-zinc-900/80"
        onClick={() => addProject()}
      >
        Add project
      </Button>
    </div>
  );
}
