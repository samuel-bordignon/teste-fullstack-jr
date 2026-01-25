import prisma from '@/lib/db';
import { estoque, Prisma } from '@/generated/prisma/client';
import { FilterEstoquePayload } from '@/hooks/use-estoque';

export const findAll = async (filters?: FilterEstoquePayload): Promise<estoque[]> => {
    const where: Prisma.estoqueWhereInput = {};
    
    if (filters?.categoria) {
        where.produtos = {
            categoria_id: BigInt(filters.categoria),
        };
    }

    if (filters?.periodo !== undefined) {
        where.atualizado_em = {
            ...(filters.periodo.inicio !== undefined && {
                gte: new Date(filters.periodo.inicio),
            }),
            ...(filters.periodo.fim !== undefined && {
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

    return prisma.estoque.findMany({
        where,
        include: { produtos: true }
    });
};

export const update = async (id: bigint, data: Pick<estoque, "quantidade">): Promise<estoque> => {
    return prisma.estoque.update({
        where: { id },
        data,
    });
};