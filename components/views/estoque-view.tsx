"use client";

import { DataTable } from "@/components/custom/data-table";
import { useEstoque } from "@/hooks/use-estoque";
import { estoqueColumns } from "../estoque/estoque-columns";

export function EstoqueView() {
  const { data: stock, isLoading, isError, error } = useEstoque();
  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load stock."}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={estoqueColumns}
        data={stock || []}
        isLoading={isLoading}
      />
    </>
  );
}
