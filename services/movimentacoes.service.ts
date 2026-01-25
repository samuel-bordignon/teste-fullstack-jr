import * as repository from "@/repositories/movimentacoes.repository"
import { estoque_movimentacoes } from "@/generated/prisma/client"
import prisma from "@/lib/db";
import { FilterMovimentacoesPayload } from "@/hooks/use-movimentacoes";

export const getAllMovimentacoes = async (filters?: FilterMovimentacoesPayload): Promise<estoque_movimentacoes[]> => {
    return repository.findAll(filters);
};

export const createMovimentacoes = async (data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>): Promise<estoque_movimentacoes> => {
    const { quantidade, tipo, produto_id } = data;
    return prisma.$transaction(async (tx) => {
        const estoque = await tx.estoque.findUnique({
            where: { produto_id },
        });

        if (!estoque) {
            throw new Error("Estoque não encontrado");
        };

        const novaQuantidade =
            tipo === "entrada"
                ? estoque.quantidade + quantidade
                : estoque.quantidade - quantidade;

        if (novaQuantidade < 0) {
            throw new Error("Quantidade insuficiente em estoque");
        };

        await tx.estoque.update({
            where: { produto_id },
            data: { quantidade: novaQuantidade },
        });
        return tx.estoque_movimentacoes.create({
            data: {
                produto_id,
                quantidade,
                tipo,
            },
        });
    });
};