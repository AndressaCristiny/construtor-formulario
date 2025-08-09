"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import type * as React from "react";

type SortableQuestionProps = {
  id: string;
  className?: string;
  children: (args: {
    attributes: Record<string, undefined>;
    listeners: Record<string, unknown>;
    setActivatorNodeRef: (node: HTMLElement | null) => void;
    isDragging: boolean;
  }) => React.ReactNode;
};

export default function SortableQuestion({
  id,
  className,
  children,
}: SortableQuestionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "will-change-transform",
        isDragging ? "ring-2 ring-indigo-300 rounded-xl bg-white" : "",
        className
      )}
    >
      {children({
        attributes: attributes as unknown as Record<string, undefined>,
        listeners: listeners ?? {},
        setActivatorNodeRef,
        isDragging,
      })}
    </div>
  );
}
