import { NextResponse } from 'next/server';
import * as service from '@/services/movimentacoes.service';

export async function GET() {
    const movimentacoes = await service.getAllMovimentacoes();
    const movimentacoesSerialized = movimentacoes.map(movimentacao => {
        return JSON.parse(
            JSON.stringify(movimentacao, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
    });
    return NextResponse.json(movimentacoesSerialized);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { produto_id, quantidade, tipo } = body;

        if (!quantidade || !tipo) {
            return NextResponse.json({ error: 'Tipo e Quantidade são obrigatórios' }, { status: 400 });
        }

        const newMovimentacao = await service.createMovimentacoes({
            produto_id,
            quantidade,
            tipo
        });
        const newMovimentacaoSerialized = JSON.parse(
            JSON.stringify(newMovimentacao, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
        return NextResponse.json(newMovimentacaoSerialized, { status: 201 });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Quantidade insuficiente em estoque"
        ) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }

}