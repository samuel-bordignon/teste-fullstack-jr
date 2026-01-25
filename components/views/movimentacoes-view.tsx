"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/use-categorias";
import { DataTable } from "@/components/custom/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddMovimentModal } from "../movimentacoes/movimentacoes-add-modal";
import { movimentacoesColumns } from "../movimentacoes/movimentacoes-columns";
import { useMovimentacoes, FilterMovimentacoesPayload } from "@/hooks/use-movimentacoes";
import { normalizeString } from "@/lib/string-utils";
import FilterTrigger from "../custom/filter-trigger";
import { FilterMovimentsModal } from "../movimentacoes/movimentacoes-filter-modal";

export function MovimentacoesView() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filters, setFilters] = useState<FilterMovimentacoesPayload>();
    const { data: moviments, isLoading, isError, error } = useMovimentacoes(filters);
    const [search, setSearch] = useState("");
    const filteredMoviments = moviments?.filter((m) => normalizeString(m.produtos.nome).includes(normalizeString(search)));

    if (isError) {
        return (
            <div className="text-red-500">
                Error: {error?.message || "Failed to load moviments."}
            </div>
        );
    }

    return (
        <>
            <DataTable
                columns={movimentacoesColumns}
                data={filteredMoviments || []}
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
                actionButtons={[
                    <Button key="new-category" onClick={() => setIsAddModalOpen(true)}>
                        Nova Movimentação
                    </Button>,
                ]}
            />

            <AddMovimentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            <FilterMovimentsModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={setFilters}
            />
        </>
    );
}
