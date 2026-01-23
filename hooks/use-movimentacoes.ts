import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";


// Zod Schemas
export const createMovimentSchema = z.object({
  produto_id: z.string().min(1, "Selecione um produto"),
  quantidade: z.coerce.number().min(1, "Movimentação mínima deve ser maior que zero"),
  tipo: z.enum(["entrada", "saida"])
});

// Types
export type Movimentacoes = {
    id: string,
    produto_id: string,
    quantidade: number,
    tipo: Tipo_movimentacao,
    criado_em: string,
};

enum Tipo_movimentacao {
    entrada = "entrada",
    saida = "saida"
};

export type CreateMovimentacoesPayload = z.infer<typeof createMovimentSchema>;

// API Functions
const fetchMovimentacoes = async (): Promise<Movimentacoes[]> => {
    const response = await fetch("/api/movimentacoes");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

const createMovimentacoes = async (
    payload: CreateMovimentacoesPayload
): Promise<Movimentacoes> => {
    const response = await fetch("/api/movimentacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create movement");
    }
    return response.json();
};

// React Query Hooks
export const useMovimentacoes = () => {
    return useQuery<Movimentacoes[], Error>({
        queryKey: ["movimentacoes"],
        queryFn: fetchMovimentacoes,
    });
};

export const useCreateMovimentacoes = () => {
    const queryClient = useQueryClient();
    return useMutation<Movimentacoes, Error, CreateMovimentacoesPayload>({
        mutationFn: createMovimentacoes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movimentacoes"] });
        },
    });
};