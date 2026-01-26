export function normalizeString(value: string | null) {
  if (!value) return ""
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
