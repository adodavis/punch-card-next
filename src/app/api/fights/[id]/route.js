import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req, context) {
    const { id } = await context.params;

    try {
        const fight = await prisma.fight.findUnique({
            where: { id },
            include: { rounds: true },
        });

        if (!fight) {
            return NextResponse.json({ error: 'Fight not found' }, {status: 404 });
        }

        return NextResponse.json(fight);
    } catch (error) {
        console.error('GET /api/fights/[id] error:', error);
        return NextResponse.json({ error: 'Failed to load fight' }, {status: 500 });
    }
}

export async function PATCH(req, context) {
    const { id } = await context.params;

    try{
        const updates = await req.json();

        const updated = await prisma.fight.update({
            where: { id },
            data: updates,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('PATCH /api/fights/[id] error:', error);
        return NextResponse.json({ error: 'Failed to update fight' }, {status: 500 });
    }
}

export async function DELETE(req, context) {
    const { id } = await context.params;

    try {
        // Delete all rounds associated with the fight
        await prisma.round.deleteMany({ where: {fightId: id} });
        // Delete the fight
        await prisma.fight.delete({ where: { id } });

        return NextResponse.json({ message: 'Fight deleted ' });
    } catch (error) {
        console.error('DELETE /api/fights/[id] error:', error);
        return NextResponse.json({ error: 'Failed to delete fight' }, {status: 500 });
    }
}