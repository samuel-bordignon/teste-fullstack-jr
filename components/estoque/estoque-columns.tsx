"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Estoque } from "@/hooks/use-estoque";
import { SortableHeader } from "../custom/sortable-header";
import { normalizeString } from "@/lib/string-utils";


export const estoqueColumns: ColumnDef<Estoque>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "produto_id",
    header: ({ column }) => (
      <SortableHeader column={column} title="Produto ID" />
    ),
  },
  {
    accessorKey: "produtos.nome",
    header: ({ column }) => (
      <SortableHeader column={column} title="Nome do Produto" />
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const a = normalizeString(rowA.getValue<string>(columnId))
      const b = normalizeString(rowB.getValue<string>(columnId))
      return a.localeCompare(b, "pt-BR");
    },
  },
  {
    accessorKey: "produtos.estoque_minimo",
    header: ({ column }) => (
      <SortableHeader column={column} title="Estoque Mínino do Produto" />
    ),
  },
  {
    accessorKey: "quantidade",
    header: ({ column }) => (
      <SortableHeader column={column} title="Quantidade" />
    ),
  },
  {
    accessorKey: "atualizado_em",
    header: ({ column }) => (
      <SortableHeader column={column} title="Atualizado Em" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("atualizado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];