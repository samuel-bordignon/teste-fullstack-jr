"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Movimentacoes } from "@/hooks/use-movimentacoes";

export const movimentacoesColumns: ColumnDef<Movimentacoes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "produto_id",
    header: "Produto ID",
  },
  {
    accessorKey: "produtos.nome",
    header: "Nome do Produto",
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "criado_em",
    header: "Atualizado Em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("criado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];