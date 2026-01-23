import { Input } from "@/components/ui/input";

interface ProdutoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoriaSearch({ value, onChange }: ProdutoSearchProps) {
  return (
    <Input
      placeholder="Buscar por nome ou ID"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-sm"
    />
  );
}
