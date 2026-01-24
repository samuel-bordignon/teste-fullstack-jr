import { FilterProdutoPayload } from "@/hooks/use-produtos";

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