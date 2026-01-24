"use client";

import { FilterProdutoPayload, filterProdutoSchema, useProdutos } from "@/hooks/use-produtos";
import { useCategories } from "@/hooks/use-categorias";
import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";

export function FilterProductModal({
    isOpen,
    onClose,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterProdutoPayload) => void;
}) {
    const { data: categories } = useCategories();
    const { data: products } = useProdutos();

    const categoryOptions =
        categories?.map((cat) => ({
            label: cat.nome,
            value: cat.nome,
        })) || [];
    const brandsOptions = products
        ? [...new Set(products.map(p => p.marca).filter((m): m is string => !!m))]
            .map(marca => ({
                label: marca,
                value: marca,
            }))
        : [];

    const formFields = [
        {
            name: "categoria" as const,
            label: "Categoria",
            placeholder: "Selecione uma categoria",
            component: "select" as const,
            options: categoryOptions,
        },
        {
            name: "marca" as const,
            label: "Marca",
            placeholder: "Selecione uma marca",
            component: "select" as const,
            options: brandsOptions,
        },
        {
            label: "Data de criação",
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

    const handleApply = (data: FilterProdutoPayload) => {
        console.log(data)
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
                schema={filterProdutoSchema}
                onSubmit={handleApply}
                fields={formFields}
                submitButtonText="Filtrar"
            />
        </BaseModal>
    );
}