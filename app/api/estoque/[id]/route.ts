import { NextResponse } from 'next/server';
import * as service from '@/services/estoque.service';

interface Params {
    params: Promise<{ id: string; }>;
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const id = BigInt((await params).id);
        const body = await request.json();
        const quantidade = Number(body.quantidade);

        const updatedEstoque = await service.updateEstoque(id, {
            quantidade
        });
        const updatedEstoqueSerialized = JSON.parse(
            JSON.stringify(updatedEstoque, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
        return NextResponse.json(updatedEstoqueSerialized);
    } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
            return NextResponse.json({ error: 'Produto não encontrado para atualização' }, { status: 404 });
        }
        console.error(error)
        return NextResponse.json({ error: 'Falha ao atualizar produto' }, { status: 500 });
    }
}