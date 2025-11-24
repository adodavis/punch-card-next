import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function PATCH(req, context) {
    const { roundId } = await context.params;

    const session = await getServerSession(authOptions);

    if(!session)
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });

    const body = await req.json();

    // Validate user owns the round
    const round = await prisma.round.findUnique({
        where: { id: roundId },
        include: { fight: true },
    });

    console.log("PATCH BODY:", body);
    console.log("ROUND ID:", roundId);

    if (!round)
        return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (round.fight.userId !== session.user.id)
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    try {
        const updated = await prisma.round.update({
            where: { id: roundId },
            data: body,
        });
        
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PATCH ERROR:", error);
        return NextResponse.json(
            { error: "Update failed", details: error.message },
            { status: 500 }
        );
    }
}