import { NextResponse } from 'next/server';
import * as service from '@/services/estoque.service';

export async function GET() {
    const estoque = await service.getAllEstoque();
    const estoqueSerialized = estoque.map(registro => {
        return JSON.parse(
            JSON.stringify(registro, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
    });
    return NextResponse.json(estoqueSerialized);
}