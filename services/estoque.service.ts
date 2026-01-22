import * as repository from "@/repositories/estoque.repository"
import { estoque } from "@/generated/prisma/client"

export const getAllEstoque = async (): Promise<estoque[]> => {
  return repository.findAll();
};

export const updateEstoque = async (id: bigint, data: Pick<estoque, "quantidade">): Promise<estoque> => {
  return repository.update(id, data);
};