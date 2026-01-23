import { useQuery } from "@tanstack/react-query";

// Types
export type Estoque = {
    id: string, // id em string como padrão
    produto_id: string, // id em string como padrão
    quantidade: number,
    atualizado_em: string,
}
// API Functions
const fetchEstoque = async (): Promise<Estoque[]> => {
  const response = await fetch("/api/estoque");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
// React Query Hooks
export const useEstoque = () => {
  return useQuery<Estoque[], Error>({
    queryKey: ["estoque"],
    queryFn: fetchEstoque,
  });
};