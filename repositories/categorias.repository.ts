import prisma from '@/lib/db';
import { categorias, Prisma } from '@/generated/prisma/client';
import { FilterCategoriaPayload } from '@/hooks/use-categorias';

export const findAll = async (filters?: FilterCategoriaPayload): Promise<categorias[]> => {
  const where: Prisma.categoriasWhereInput = {};
  
  if (filters?.periodo) {
    where.criado_em = {
      ...(filters.periodo.inicio && {
        gte: new Date(filters.periodo.inicio),
      }),
      ...(filters.periodo.fim && {
        lte: new Date(filters.periodo.fim),
      }),
    };
  }

  return prisma.categorias.findMany({ where });
};

export const findById = async (id: bigint): Promise<categorias | null> => {
  return prisma.categorias.findUnique({
    where: { id },
  });
};

export const create = async (data: Omit<categorias, 'id' | 'criado_em'>): Promise<categorias> => {
  return prisma.categorias.create({
    data,
  });
};

export const update = async (id: bigint, data: Partial<Omit<categorias, 'id' | 'criado_em'>>): Promise<categorias> => {
  return prisma.categorias.update({
    where: { id },
    data,
  });
};

export const remove = async (id: bigint): Promise<categorias> => {
  return prisma.categorias.delete({
    where: { id },
  });
};
