"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/use-categorias";
import { DataTable } from "@/components/custom/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddMovimentModal } from "../movimentacoes/movimentacoes-add-modal";
import { movimentacoesColumns } from "../movimentacoes/movimentacoes-columns";
import { useMovimentacoes } from "@/hooks/use-movimentacoes";
import { MovimentacoesSearch } from "../movimentacoes/movimentacoes-search";
import { normalizeString } from "@/lib/string-utils";

export function MovimentacoesView() {
    const { data: moviments, isLoading, isError, error } = useMovimentacoes();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
                    <MovimentacoesSearch value={search} onChange={setSearch} />
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
        </>
    );
}
