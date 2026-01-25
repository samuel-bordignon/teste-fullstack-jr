import { appendMovimentacoesParams } from "@/lib/query-params";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";


// Zod Schemas
export const createMovimentacoesSchema = z.object({
    produto_id: z.string().min(1, "Selecione um produto"),
    quantidade: z.coerce.number().min(1, "Movimentação mínima deve ser maior que zero"),
    tipo: z.enum(["entrada", "saida"])
});

export const filterMovimentacoesSchema = z.object({
    periodo: z.object({
        inicio: z.string().optional(),
        fim: z.string().optional(),
    }).optional(),
    quantidade: z.object({
        min: z.number().int().min(0).optional(),
        max: z.number().int().min(0).optional(),
    }).optional(),
    tipo: z.string().optional(),
    produto: z.string().optional(),
});

// Types
export type Movimentacoes = {
    id: string,
    produto_id: string,
    quantidade: number,
    tipo: Tipo_movimentacao,
    criado_em: string,
    produtos: {
        nome: string
    }
};

enum Tipo_movimentacao {
    entrada = "entrada",
    saida = "saida"
};

export type CreateMovimentacoesPayload = z.infer<typeof createMovimentacoesSchema>;
export type FilterMovimentacoesPayload = z.infer<typeof filterMovimentacoesSchema>;

// API Functions
const fetchMovimentacoes = async (filters?: FilterMovimentacoesPayload): Promise<Movimentacoes[]> => {
    const params = filters ? appendMovimentacoesParams(filters) : undefined
    const response = await fetch(`/api/movimentacoes?${(params && params.toString()) && params.toString()}`);
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
        console.log(errorData)
        throw new Error(errorData.error || "Failed to create movement");
    }
    return response.json();
};

// React Query Hooks
export const useMovimentacoes = (filters?: FilterMovimentacoesPayload) => {
    return useQuery<Movimentacoes[], Error>({
        queryKey: ["movimentacoes", filters],
        queryFn: () => fetchMovimentacoes(filters),
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