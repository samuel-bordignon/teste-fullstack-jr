import { FilterEstoquePayload } from "@/hooks/use-estoque";
import { Button } from "../ui/button";
import { Funnel, X } from "lucide-react";

export default function FilterTrigger({
    filters,
    onClear,
    onOpen
}: {
    filters: FilterEstoquePayload | undefined,
    onClear: () => void,
    onOpen: () => void
}) {
    return (
        <>
            <Button variant={"outline"} onClick={onOpen}>
                Filtros Avançados <Funnel />
            </Button>
            {
                filters && (
                    <Button variant={"outline"} onClick={onClear}>
                        Limpar <X />
                    </Button>
                )
            }
        </>
    )
}
