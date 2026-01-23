"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Estoque } from "@/hooks/use-estoque";

export const estoqueColumns: ColumnDef<Estoque>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "produto_id",
    header: "Produto ID",
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "atualizado_em",
    header: "Atualizado Em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("atualizado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];