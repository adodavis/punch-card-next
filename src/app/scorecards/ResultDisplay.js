import { calculateTotalSScore } from '@/app/scorecard/[id]/TotalScore';

export default function ResultDisplay({ fight }) {
    const rounds = fight.rounds || [];
    const allRoundScored = rounds.every(
        round => round.fighterA > 0 && round.fighterB > 0
    );
    
    let resultText  = "";

    if (["KO", "TKO", "RTD", "DQ"].includes(fight.outcome)) {
        let winnerName = fight.winner.split(" ")[1];
        resultText = `${winnerName} ${fight.outcome} ${fight.rounds.filter(round => round.fighterA > 0 && round.fighterB > 0).length + 1}`;
    } else if (allRoundScored) {
        const { fighterATotal, fighterBTotal } = calculateTotalSScore(rounds);
        resultText = `Your score: ${fighterATotal}-${fighterBTotal}`;
    } else if (fight.outcome === "NC") {
        resultText = "No Contest";
    }

    return (
        <div>
            <p>{resultText}</p>
        </div>
    );
}