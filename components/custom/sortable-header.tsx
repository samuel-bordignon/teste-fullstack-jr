"use client"
import { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";

type SortableHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export function SortableHeader<TData, TValue>({
  column,
  title,
}: SortableHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="flex items-center gap-1 hover:text-primary"
    >
      <p className="hover:opacity-80 cursor-pointer transition-opacity duration-200">
        {title}
      </p>
      {sorted === "asc" && <ArrowUp className="h-4 w-4" />}
      {sorted === "desc" && <ArrowDown className="h-4 w-4" />}
    </button>
  );
}
