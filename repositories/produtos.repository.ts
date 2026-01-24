import prisma from '@/lib/db';
import { Prisma, produtos } from '@/generated/prisma/client';
import { FilterProdutoPayload } from '@/hooks/use-produtos';

export const findAll = async (filters?: FilterProdutoPayload): Promise<produtos[]> => {
  const where: Prisma.produtosWhereInput = {};

  if (filters?.categoria) {
    where.categorias = { nome: filters.categoria };
  }

  if (filters?.marca !== undefined) {
    where.marca = filters.marca;
  }

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

  if (filters?.quantidade) {
    where.estoque = {
      quantidade: {
        ...(filters.quantidade.min !== undefined && {
          gte: filters.quantidade.min,
        }),
        ...(filters.quantidade.max !== undefined && {
          lte: filters.quantidade.max,
        }),
      },
    };
  }

  return prisma.produtos.findMany({
    where,
    include: {
      categorias: true,
      estoque: true,
      estoque_movimentacoes: true,
    },
  });
};

  export const findById = async (id: bigint): Promise<produtos | null> => {
    return prisma.produtos.findUnique({
      where: { id },
      include: { categorias: true },
    });
  };

  export const create = async (data: Omit<produtos, 'id' | 'criado_em'>): Promise<produtos> => {
    const { sku, nome, categoria_id, estoque_minimo, marca } = data;

    return prisma.produtos.create({
      data: {
        sku,
        nome,
        categoria_id,
        estoque_minimo,
        marca,
      },
    });
  };

  export const update = async (id: bigint, data: Partial<Omit<produtos, 'id' | 'criado_em'>>): Promise<produtos> => {
    return prisma.produtos.update({
      where: { id },
      data,
    });
  };

  export const remove = async (id: bigint): Promise<produtos> => {
    return prisma.produtos.delete({
      where: { id },
    });
  };
