"use client";

import { FilterCategoriaPayload, filterCategoriaSchema } from "@/hooks/use-categorias";
import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";

export function FilterCategoryModal({
    isOpen,
    onClose,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterCategoriaPayload) => void;
}) {
    const formFields = [
        {
            label: "Data de criação",
            component: "inputRanger" as const,
            from: "periodo.inicio" as const,
            to: "periodo.fim" as const,
            type: "date" as const,
        },
    ];

    const handleApply = (data: FilterCategoriaPayload) => {
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
                schema={filterCategoriaSchema}
                onSubmit={handleApply}
                fields={formFields}
                submitButtonText="Filtrar"
            />
        </BaseModal>
    );
}
