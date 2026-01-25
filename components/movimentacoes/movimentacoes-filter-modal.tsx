"use client";

import { FilterMovimentacoesPayload, filterMovimentacoesSchema } from "@/hooks/use-movimentacoes";
import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";
import { useProdutos } from "@/hooks/use-produtos";
import { useMemo } from "react";

export function FilterMovimentsModal({
    isOpen,
    onClose,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterMovimentacoesPayload) => void;
}) {
    const { data: products } = useProdutos();

    const formFields = useMemo(() => {
        const productOptions = products
            ? [...new Set(products.map(p => p.nome).filter((m): m is string => !!m))]
                .map(nome => ({ label: nome, value: nome }))
            : [];

        return [
            {
                name: "tipo" as const,
                label: "Tipo de movimentação",
                placeholder: "Selecione um tipo",
                component: "select" as const,
                options: [
                    { label: "Entrada", value: "entrada" },
                    { label: "Saída", value: "saida" }
                ],
            },
            {
                name: "produto" as const,
                label: "Nome de produto",
                placeholder: "Selecione um produto",
                component: "select" as const,
                options: productOptions,
            },
            {
                label: "Data de criação",
                component: "inputRanger" as const,
                from: "periodo.inicio" as const,
                to: "periodo.fim" as const,
                type: "date" as const,
            },
            {
                label: "Quantidade movimentada",
                component: "inputRanger" as const,
                from: "quantidade.min" as const,
                to: "quantidade.max" as const,
                type: "number" as const,
            }
        ];
    }, [products]);


    const handleApply = (data: FilterMovimentacoesPayload) => {
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
                schema={filterMovimentacoesSchema}
                onSubmit={handleApply}
                fields={formFields}
                submitButtonText="Filtrar"
            />
        </BaseModal>
    );
}