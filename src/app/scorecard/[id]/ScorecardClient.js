'use client';

import { useState } from 'react';
import Link from 'next/link';
import RoundCard from './RoundCard';
import TotalScore from './TotalScore';
import EndFight from './EndFight';
import WinnerDisplay from './WinnerDisplay';
import './ScorecardClient.css';


export default function ScorecardClient({ fight: initialFight, initialRounds }) {
    const [fight, setFight] = useState(initialFight);
    const [rounds, setRounds] = useState(initialRounds);
    const allRoundsScored = rounds.every(r => r.fighterA > 0 && r.fighterB > 0);

    const isPreviousRoundScored = (roundIndex) => {
        if (roundIndex === 0)
            return true;
        else
            return rounds[roundIndex - 1].fighterA > 0 && rounds[roundIndex - 1].fighterB > 0;
    }

    // PATCH request to update a round
    async function updateRound(roundId, data) {
        const res = await fetch(`/api/rounds/${roundId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            console.error("Failed to update round. Status:", res.status);
            return;
        }

        const updated = await res.json();
        
        // Update state
       setRounds(prev => 
        prev.map((r) => (r.id === updated.id ? updated : r))
       );
    }

     // PATCH request to update the winner, outcome, and winnerDisplay
    const updateWinner = async (data) => {
        
        const res = await fetch(`/api/fights/${fight.id}` , {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            console.error("Failed to update winner's display. Status:", res.status);
            return;
        }

        const updated = await res.json();

      setFight(prev => ({
        ...prev,
        ...updated
      }))
    };

    return (
        <div>
            <Link
                href="/scorecards/"
                className="back-btn"
            >
                &lt; Back
            </Link>

            <div className="fighter-title-container">
                <h1>
                    {fight.fighterA} vs. {fight.fighterB}
                </h1>
            </div>
            
            {rounds.map((round, i) => (
                <div key={round.id}>
                    {isPreviousRoundScored(i) && (
                        <div className="round-container">
                            <RoundCard round={round} onUpdate={(data) => updateRound(round.id, data)} />
                        </div>
                    )}
                </div>
            ))}

            <div className="winner-display-container">
                <WinnerDisplay fight={fight} />
            </div>

            <div className="total-score-container">
                <TotalScore rounds={rounds} />
            </div>

            {!allRoundsScored && (
                <div className="winner-display-container">
                    <EndFight fight={fight} onUpdate={(data) => updateWinner(data)} />
                </div>
            )}
        </div>
    );
}