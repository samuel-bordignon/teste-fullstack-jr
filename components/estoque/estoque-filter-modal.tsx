"use client";

import { FilterEstoquePayload, filterEstoqueSchema } from "@/hooks/use-estoque";
import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";
import { useCategories } from "@/hooks/use-categorias";
import { useMemo } from "react";

export function FilterStockModal({
    isOpen,
    onClose,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterEstoquePayload) => void;
}) {
    const { data: categorias } = useCategories();

    const formFields = useMemo(() => {
        const categoryOptions = categorias?.map((c) => ({
            label: c.nome,
            value: c.id,
        })) ?? [];

        return [
            {
                name: "categoria" as const,
                label: "Categoria",
                placeholder: "Selecione uma categoria",
                component: "select" as const,
                options: categoryOptions,
            },
            {
                label: "Data de atualização",
                component: "inputRanger" as const,
                from: "periodo.inicio" as const,
                to: "periodo.fim" as const,
                type: "date" as const,
            },
            {
                label: "Quantidade em estoque",
                component: "inputRanger" as const,
                from: "quantidade.min" as const,
                to: "quantidade.max" as const,
                type: "number" as const,
            }
        ];
    }, [categorias]);

    const handleApply = (data: FilterEstoquePayload) => {
        onApply(data);
        onClose();
    };

    return (
        <BaseModal
            title="Filtrar por"
            description="Selecione os filtros para uma consulta avançada"
            isOpen={isOpen}
            onClose={onClose}
        >
            <DynamicForm
                schema={filterEstoqueSchema}
                onSubmit={handleApply}
                fields={formFields}
                submitButtonText="Filtrar"
            />
        </BaseModal>
    );
}