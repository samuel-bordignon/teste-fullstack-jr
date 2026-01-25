import prisma from '@/lib/db';
import { estoque_movimentacoes, Prisma } from '@/generated/prisma/client';
import { FilterMovimentacoesPayload } from '@/hooks/use-movimentacoes';

export const findAll = async (filters?: FilterMovimentacoesPayload): Promise<estoque_movimentacoes[]> => {
    console.log(filters, "no payload")
    const where: Prisma.estoque_movimentacoesWhereInput = {};
    if (filters?.periodo !== undefined) {
        where.criado_em = {
            ...(filters.periodo.inicio && {
                gte: new Date(filters.periodo.inicio),
            }),
            ...(filters.periodo.fim && {
                lte: new Date(filters.periodo.fim),
            }),
        };
    }
    if (filters?.quantidade !== undefined) {
        where.quantidade = {
            ...(filters.quantidade.min !== undefined && {
                gte: filters.quantidade.min,
            }),
            ...(filters.quantidade.max !== undefined && {
                lte: filters.quantidade.max,
            }),
        };
    }
    if (filters?.tipo) {
        where.tipo = filters.tipo as any;
    }
    if (filters?.produto !== undefined) {
        where.produtos = { nome: filters?.produto }
    }
    return prisma.estoque_movimentacoes.findMany({
        where,
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