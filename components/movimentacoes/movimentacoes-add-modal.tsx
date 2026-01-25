"use client";

import * as z from "zod";
import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";
import { toast } from "sonner";
import { createMovimentacoesSchema, useCreateMovimentacoes } from "@/hooks/use-movimentacoes";
import { useProdutos } from "@/hooks/use-produtos";

export function AddMovimentModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const createMovimentMutation = useCreateMovimentacoes();
    const { data: produtos } = useProdutos()

    const formFields = [
        {
            name: "quantidade" as const,
            label: "Quantidade",
            placeholder: "Quantidade a ser movimentada",
            component: "input" as const,
            type: 'number'
        },
        {
            name: "tipo" as const,
            label: "Tipo da movimentação",
            component: "select" as const,
            placeholder: "Selecione",
            options: [
                { label: "Entrada", value: "entrada" },
                { label: "Saída", value: "saida" },
            ],
        },
        {
            name: "produto_id" as const,
            label: "Produto",
            component: "select" as const,
            placeholder: "Selecione",
            options: produtos?.map(p => ({
                label: `${p.nome} - Estoque: ${p.estoque?.quantidade} - ID: ${p.id}`,
                value: p.id,
            })) || [],
        }
    ];


    const handleSubmit = (data: z.infer<typeof createMovimentacoesSchema>) => {
        createMovimentMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Movimentação registrada com sucesso!");
                onClose();
            },
            onError: (error) => {
                toast.error(`Erro ao registrar movimentação: ${error.message}`);
            },
        });
    };

    return (
        <BaseModal
            title="Nova Movimentação"
            description="Preencha os detalhes para criar uma nova movimentação."
            isOpen={isOpen}
            onClose={onClose}
        >
            <DynamicForm
                schema={createMovimentacoesSchema}
                onSubmit={handleSubmit}
                defaultValues={{ quantidade: 0 }}
                fields={formFields}
                submitButtonText="Criar Categoria"
                isSubmitting={createMovimentMutation.isPending}
            />
        </BaseModal>
    );
}
