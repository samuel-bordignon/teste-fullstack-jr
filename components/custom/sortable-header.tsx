"use client"
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Dot } from "lucide-react";

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
      className="flex items-center gap-1 hover:text-primary hover:opacity-80 cursor-pointer transition-opacity duration-200"
    >
      <p>
        {title}
      </p>
      {!sorted && <Dot className="h-4 w-4" />}
      {sorted === "asc" && <ArrowUp className="h-4 w-4" />}
      {sorted === "desc" && <ArrowDown className="h-4 w-4" />}
    </button>
  );
}
