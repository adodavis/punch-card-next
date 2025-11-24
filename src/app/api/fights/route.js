import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try{
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
        }

        const fights = await prisma.fight.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc'},
        });

        return NextResponse.json(fights);
    } catch (error) {
        console.error('GET /api/fights error:', error);
        return NextResponse.json({ error: 'Failed to load fights' }, { status: 500 });
    }
}

export async function POST(req) {
    try{
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

            const newFight = await prisma.fight.create({
                data: {
                    fighterA: data.fighterA,
                    fighterB: data.fighterB,
                    numRounds: data.numRounds,
                    fightDate: new Date(data.fightDate),
                    isChampionship: data.isChampionship,
                    userId: session.user.id,
                },
        });

        // Also create rounds tied to this fight
        await prisma.round.createMany({
            data: Array.from({ length: data.numRounds }).map((_, index) => ({
                fightId: newFight.id,
                index,
                fighterA: 0,
                fighterB: 0,
            })),
        });

        return NextResponse.json(newFight, { status: 201 });
    } catch (error) {
        console.error('POST /api/fights error:', error);
        return NextResponse.json({ error: 'Failed to create fight' }, {status: 500 });
    }
}