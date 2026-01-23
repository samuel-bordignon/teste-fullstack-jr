"use client";

import { DataTable } from "@/components/custom/data-table";
import { useEstoque } from "@/hooks/use-estoque";
import { estoqueColumns } from "../estoque/estoque-columns";
import { EstoqueSearch } from "../estoque/estoque-search";
import { useState } from "react";
import { normalizeString } from "@/lib/string-utils";

export function EstoqueView() {
  const { data: stock, isLoading, isError, error } = useEstoque();
  const [search, setSearch] = useState("");
  const filteredstock = stock?.filter((s) => normalizeString(s.produtos.nome).includes(normalizeString(search)));

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
        data={filteredstock || []}
        isLoading={isLoading}
        searchComponent={
          <EstoqueSearch value={search} onChange={setSearch} />
        }
      />
    </>
  );
}
