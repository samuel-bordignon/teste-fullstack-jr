import { NextResponse } from 'next/server';
import * as service from '@/services/estoque.service';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const payload = {
        categoria: searchParams.get('categoria') || undefined,
        periodo: {
            inicio: searchParams.get('inicio') || undefined,
            fim: searchParams.get('fim') || undefined,
        },
        quantidade: {
            min: Number(searchParams.get('min')) || undefined,
            max: Number(searchParams.get('max')) || undefined,
        }
    }
    const estoque = await service.getAllEstoque(payload);
    const estoqueSerialized = estoque.map(registro => {
        return JSON.parse(
            JSON.stringify(registro, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
    });
    return NextResponse.json(estoqueSerialized);
}