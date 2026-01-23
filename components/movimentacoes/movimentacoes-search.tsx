import { Input } from "@/components/ui/input";

interface ProdutoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MovimentacoesSearch({ value, onChange }: ProdutoSearchProps) {
  return (
    <Input
      placeholder="Buscar por nome do Produto"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-sm"
    />
  );
}
