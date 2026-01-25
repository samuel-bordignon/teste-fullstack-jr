"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Produto } from "@/hooks/use-produtos";
import { SortableHeader } from "../custom/sortable-header";
import { normalizeString } from "@/lib/string-utils";

export const produtoColumns: ColumnDef<Produto>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <SortableHeader column={column} title="SKU" />
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
    accessorKey: "categorias.nome",
    header: ({ column }) => (
      <SortableHeader column={column} title="Categoria" />
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const a = normalizeString(rowA.getValue<string>(columnId))
      const b = normalizeString(rowB.getValue<string>(columnId))
      return a.localeCompare(b, "pt-BR");
    },
    cell: ({ row }) => {
      const category = row.original.categorias;
      return category ? category.nome : "N/A";
    },
  },
  {
    accessorKey: "estoque_minimo",
    header: ({ column }) => (
      <SortableHeader column={column} title="Estoque Mínimo" />
    ),
  },
  {
    accessorKey: "marca",
    header: ({ column }) => (
      <SortableHeader column={column} title="Marca" />
    ),
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
