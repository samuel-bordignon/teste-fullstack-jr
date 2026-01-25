import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { appendCategoriasParams } from "@/lib/query-params";

// Zod Schemas
export const createCategoriaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
});

export const filterCategoriaSchema = z.object({
  periodo: z.object({
    inicio: z.string().optional(),
    fim: z.string().optional(),
  }).optional(),
});

export const updateCategoriaSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  descricao: z.string().optional(),
});

// Types
export type Categoria = {
  id: string; // Prisma BigInt is serialized as string
  nome: string;
  descricao: string | null;
  criado_em: string;
};

export type CreateCategoriaPayload = z.infer<typeof createCategoriaSchema>;

export type UpdateCategoriaPayload = z.infer<typeof updateCategoriaSchema>;

export type FilterCategoriaPayload = z.infer<typeof filterCategoriaSchema>;

// API Functions
const fetchCategories = async (filters?: FilterCategoriaPayload): Promise<Categoria[]> => {
  const params = filters ? appendCategoriasParams(filters) : undefined;
  const response = await fetch(`/api/categorias?${(params && params.toString()) || ""}`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

const fetchCategoryById = async (id: string): Promise<Categoria> => {
  const response = await fetch(`/api/categorias/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category with ID ${id}`);
  }
  return response.json();
};

const createCategory = async (
  payload: CreateCategoriaPayload
): Promise<Categoria> => {
  const response = await fetch("/api/categorias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create category");
  }
  return response.json();
};

const updateCategory = async (
  payload: UpdateCategoriaPayload
): Promise<Categoria> => {
  const response = await fetch(`/api/categorias/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update category");
  }
  return response.json();
};

const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetch(`/api/categorias/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete category");
  }
};

// React Query Hooks
export const useCategories = (filters?: FilterCategoriaPayload) => {
  return useQuery<Categoria[], Error>({
    queryKey: ["categorias", filters],
    queryFn: () => fetchCategories(filters),
  });
};

export const useCategory = (id: string) => {
  return useQuery<Categoria, Error>({
    queryKey: ["categorias", id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id, // Only run the query if id is truthy
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<Categoria, Error, CreateCategoriaPayload>({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<Categoria, Error, UpdateCategoriaPayload>({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      queryClient.invalidateQueries({ queryKey: ["categorias", data.id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};
