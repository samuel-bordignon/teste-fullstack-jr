import { appendEstoqueParams } from "@/lib/query-params";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

// Zod Schemas
export const filterEstoqueSchema = z.object({
  periodo: z.object({
    inicio: z.string().optional(),
    fim: z.string().optional(),
  }).optional(),
  quantidade: z.object({
    min: z.number().int().min(0).optional(),
    max: z.number().int().min(0).optional(),
  }).optional(),
  categoria:z.string().optional()
});

// Types
export type Estoque = {
  id: string, // id em string como padrão
  produto_id: string, // id em string como padrão
  quantidade: number,
  atualizado_em: string,
  produtos: {
    nome: string
    estoque_minimo: number
  }
}
export type FilterEstoquePayload = z.infer<typeof filterEstoqueSchema>
// API Functions
const fetchEstoque = async (filters?: FilterEstoquePayload): Promise<Estoque[]> => {
  const params = filters ? appendEstoqueParams(filters) : undefined;

  const response = await fetch(`/api/estoque?${(params && params.toString()) && params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
// React Query Hooks
export const useEstoque = (filters?: FilterEstoquePayload) => {
  return useQuery<Estoque[], Error>({
    queryKey: ["estoque", filters],
    queryFn: () => fetchEstoque(filters),
  });
};