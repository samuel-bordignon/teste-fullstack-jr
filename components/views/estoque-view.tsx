"use client";

import { DataTable } from "@/components/custom/data-table";
import { FilterEstoquePayload, filterEstoqueSchema, useEstoque } from "@/hooks/use-estoque";
import { estoqueColumns } from "../estoque/estoque-columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { normalizeString } from "@/lib/string-utils";
import FilterTrigger from "../custom/filter-trigger";
import { FilterStockModal } from "../estoque/estoque-filter-modal";

export function EstoqueView() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterEstoquePayload>();
  const { data: stock, isLoading, isError, error } = useEstoque(filters);

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
          <Input
            placeholder="Buscar por nome ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        }
        filterComponent={
          <FilterTrigger
            filters={filters}
            onClear={() => setFilters(undefined)}
            onOpen={() => setIsFilterModalOpen(true)}
          />
        }
      />
      <FilterStockModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(filters) => {
          setFilters(filters)
        }}
      />
    </>
  );
}
