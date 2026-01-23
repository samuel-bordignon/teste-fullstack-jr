"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Categoria } from "@/hooks/use-categorias";
import { SortableHeader } from "../custom/sortable-header";
import { normalizeString } from "@/lib/string-utils";

export const categoriaColumns: ColumnDef<Categoria>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <SortableHeader column={column} title="Nome" />
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const a = normalizeString(rowA.getValue<string>(columnId))
      const b = normalizeString(rowB.getValue<string>(columnId))
      return a.localeCompare(b, "pt-BR");
    },
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "criado_em",
    header: ({ column }) => (
      <SortableHeader column={column} title="Criado Em" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("criado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];
