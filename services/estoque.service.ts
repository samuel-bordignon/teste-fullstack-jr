import * as repository from "@/repositories/estoque.repository"
import { estoque } from "@/generated/prisma/client"
import { FilterEstoquePayload } from "@/hooks/use-estoque";

export const getAllEstoque = async (filters?: FilterEstoquePayload): Promise<estoque[]> => {
  return repository.findAll(filters);
};

export const updateEstoque = async (id: bigint, data: Pick<estoque, "quantidade">): Promise<estoque> => {
  return repository.update(id, data);
};