import * as repository from "@/repositories/movimentacoes.repository"
import { estoque_movimentacoes } from "@/generated/prisma/client"

export const getAllMovimentacoes = async (): Promise<estoque_movimentacoes[]> => {
    return repository.findAll();
};

export const createMovimentacoes = async (data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>): Promise<estoque_movimentacoes> => {
    const { quantidade, tipo, produto_id } = data;
    return repository.create({ quantidade, tipo, produto_id });
};