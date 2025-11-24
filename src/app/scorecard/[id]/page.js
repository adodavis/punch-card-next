import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ScorecardClient from './ScorecardClient';

export default async function ScorecardPage({ params }) {
    const session = await getServerSession(authOptions);

    if (!session) return <p>You must be logged in.</p>

    const { id: fightId } = await params;

    // Load fight
    const fight = await prisma.fight.findUnique({
        where: { id: fightId },
    });
    
    if (!fight) return <p>Fight not found.</p>;
    if (fight.userId !== session.user.id) return <p>Not authorized.</p>;

    // Load rounds
    const rounds = await prisma.round.findMany({
        where: { fightId },
        orderBy: {index: "asc"},
    });

    return (
       <ScorecardClient fight={fight} initialRounds={rounds} />
    );
}