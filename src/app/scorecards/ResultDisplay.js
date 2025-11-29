import { calculateTotalSScore } from '@/app/scorecard/[id]/TotalScore';

export default function ResultDisplay({ fight }) {
    const rounds = fight.rounds || [];
    const allRoundScored = rounds.every(
        round => round.fighterA > 0 && round.fighterB > 0
    );
    
    let resultText  = "";
    let givenLastName = "";

    // Handles fighter names with more or less than first and last names
    if (fight.winner) {
        givenLastName = fight.winner.split(" ").length - 1;
    }

    if (["KO", "TKO", "RTD", "DQ"].includes(fight.outcome)) {
        let winnerName = fight.winner.split(" ")[givenLastName];
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