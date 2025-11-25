import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ScorecardsListClient from './ScorecardsListClient';
import './page.css';

export default async function ScorecardsPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>You must be logged in.</h1>
                <Link href="/signin">Sign In</Link>
            </div>
        );
    }

    const fights = await prisma.fight.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        include: { rounds: true },
    });

    const fightsWithDate = fights.map(fight => ({
        ...fight,
        dateOnly: fight.fightDate.toISOString().split("T")[0]
    }));
    
    return(
        <div className="scorecards-list-page">
            <div className="scorecards-header">
                <div className="title-wrapper">
                    <span className="title-emoji">🥊</span>
                    <h1 className="app-title-container">Punch Card</h1>
                    <span className="title-emoji">🥊</span>
                </div>
                
                <form action="/api/auth/signout">
                    <button type="submit" className="logout-btn">
                        <img src="/icons/logout-icon.svg" alt="Logout" />
                    </button>
                </form>
            </div>

            <Link
                href="/scorecards/new"
                className="add-fight-btn"
            >
                <span>+</span>
            </Link>

            <div className="scorecards-list">
                <ScorecardsListClient fights={fightsWithDate} />
                {fights.length === 0 && <p style={{ textAlign: "center", width: "100%" }}>No scorecards yet.</p>}
            </div>
        </div>
    );
}