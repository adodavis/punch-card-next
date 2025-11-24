import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req, { params }) {
    const { id } = params;
    const body = req.json();

    try{
        const { roundIndex, fighterA, fighterB, notes, isClose } = body;

        const updatedRound = await prisma.round.updateMany({
            where: {
                fightId: id,
                index: roundIndex,
            },
            data: {
                fighterA,
                fighterB,
                notes,
                isClose,
            }
        });

        return NextResponse.json(updatedRound);
    } catch (error) {
        console.error('PATCH /api/fights/[id]/rounds error:', error);
        NextResponse.json({ error: 'Failed to update round' }, { status: 500 });
    }
}