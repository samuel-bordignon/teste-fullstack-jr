import { FilterEstoquePayload } from "@/hooks/use-estoque";
import { FilterMovimentacoesPayload } from "@/hooks/use-movimentacoes";
import { FilterProdutoPayload } from "@/hooks/use-produtos";
import { FilterCategoriaPayload } from "@/hooks/use-categorias";

const appendParam = (
  params: URLSearchParams,
  key: string,
  value?: unknown
) => {
  if (value !== undefined && value !== null && value !== "") {
    params.set(key, String(value));
  }
};
export const appendProductsParams = (filters: FilterProdutoPayload) => {
  const params = new URLSearchParams()
  appendParam(params, "categoria", filters.categoria);
  appendParam(params, "marca", filters.marca);
  appendParam(params, "min", filters.quantidade?.min);
  appendParam(params, "max", filters.quantidade?.max);
  appendParam(params, "inicio", filters.periodo?.inicio);
  appendParam(params, "fim", filters.periodo?.fim);
  return params
}
export const appendEstoqueParams = (filters: FilterEstoquePayload) => {
  const params = new URLSearchParams()
  appendParam(params, "min", filters.quantidade?.min);
  appendParam(params, "max", filters.quantidade?.max);
  appendParam(params, "inicio", filters.periodo?.inicio);
  appendParam(params, "fim", filters.periodo?.fim);
  appendParam(params, "categoria", filters?.categoria);
  return params
}
export const appendMovimentacoesParams = (filters: FilterMovimentacoesPayload) => {
  const params = new URLSearchParams()
  appendParam(params, "min", filters.quantidade?.min);
  appendParam(params, "max", filters.quantidade?.max);
  appendParam(params, "inicio", filters.periodo?.inicio);
  appendParam(params, "fim", filters.periodo?.fim);
  appendParam(params, "tipo", filters?.tipo);
  appendParam(params, "produto", filters?.produto);

  return params
}
export const appendCategoriasParams = (filters: FilterCategoriaPayload) => {
  const params = new URLSearchParams()
  appendParam(params, "inicio", filters.periodo?.inicio);
  appendParam(params, "fim", filters.periodo?.fim);

  return params
}