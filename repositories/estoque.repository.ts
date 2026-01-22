import prisma from '@/lib/db';
import { estoque } from '@/generated/prisma/client';

export const findAll = async (): Promise<estoque[]> => {
    return prisma.estoque.findMany({
        include: { produtos: true }
    });
};

export const update = async (id: bigint, data: Pick<estoque, "quantidade">): Promise<estoque> => {
    return prisma.estoque.update({
        where: { id },
        data,
    });
};