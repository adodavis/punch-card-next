'use client';

export function calculateTotalSScore(rounds) {
    let fighterATotal = 0;
    let fighterBTotal = 0;

    rounds.forEach(round => {
        fighterATotal += round.fighterA || 0;
        fighterBTotal += round.fighterB || 0;
    });

    return { fighterATotal,  fighterBTotal };
}

export default function TotalScore({ rounds }) {
    const totalA = rounds.reduce((sum, r) => sum + (r.fighterA || 0), 0);
    const totalB = rounds.reduce((sum, r) => sum + (r.fighterB || 0), 0);

    return (
        <div>
            {(totalA > 0 && totalB > 0) && (
                <div>
                    {totalA}-{totalB}
                </div>
            )}
        </div>
    );
}