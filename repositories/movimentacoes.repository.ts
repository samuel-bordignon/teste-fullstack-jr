import prisma from '@/lib/db';
import { estoque_movimentacoes } from '@/generated/prisma/client';

export const findAll = async (): Promise<estoque_movimentacoes[]> => {
    return prisma.estoque_movimentacoes.findMany({
        include: { produtos: true }
    });
};

export const create = async (data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>): Promise<estoque_movimentacoes> => {
    const { quantidade, tipo, produto_id } = data;
    return prisma.estoque_movimentacoes.create({
        data: {
            quantidade,
            tipo,
            produto_id
        },
    });
};