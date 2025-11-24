'use client';
import { useState } from 'react';
import './EndFight.css';

export default function EndFight({ fight, onUpdate }) {
    const [winner, setWinner] = useState(null);
    const [outcome, setOutcome] = useState('');
    const [showWinnerPopup, setShowWinnerPopup] = useState(false);
    const outcomeNeedsWinner = outcome !== "NC";
    
    const handleEndFight = () => {
        setShowWinnerPopup(true);
    };

    const handleWinnerSubmit = () => {
        if (!winner || !outcome) {
            console.error("Winner and outcome must be selected.");
            return;
        }

        if (outcome === "NC") {
            const display = "No Contest";

            onUpdate({
                winner: null,
                outcome: "NC",
                winnerDisplay: display,
            });
            setShowWinnerPopup(false);
            return;
        }

        let display = "";

        if (["KO", "TKO", "RTD"].includes(outcome)) {
            if (winner === fight.fighterA)
                display = `${fight.fighterA} ${outcome} ${fight.fighterB}`;
            else 
                display = `${fight.fighterB} ${outcome} ${fight.fighterA}`;
        } else if (outcome === "DQ") {
            display = `${winner} DQ`;
        } else if (outcome === "TD") {
            display = `${winner} - Technical Decision`;
        }

        onUpdate({
            winner,
            outcome,
            winnerDisplay: display,
        });

        setShowWinnerPopup(false);
    };

    return (
        <div className="end-fight-btn">
            <button onClick={handleEndFight}>End Fight</button>

            {showWinnerPopup && (
                <>
                    <div className="winner-popup-overlay" onClick={() => setShowWinnerPopup(false)} />

                    <div className="winner-form">

                        <button
                            className="winner-close-btn"
                            onClick={() => setShowWinnerPopup(false)}
                        >
                            x
                        </button>

                        {outcomeNeedsWinner && (
                            <div className="winner-section">
                                <h3>Winner</h3>

                                <label className={`radio-option ${winner === fight.fighterA ? "selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="winner"
                                        value={fight.fighterA}
                                        checked={winner === fight.fighterA}
                                        onChange={() => setWinner(fight.fighterA)}
                                    />
                                    {fight.fighterA}
                                </label>

                                <label className={`radio-option ${winner === fight.fighterB ? "selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="winner"
                                        value={fight.fighterB}
                                        checked={winner === fight.fighterB}
                                        onChange={() => setWinner(fight.fighterB)}
                                    />
                                    {fight.fighterB}
                                </label>
                            </div>
                        )}

                        <div className="winner-section">
                            <h3>Outcome</h3>

                            {["KO","TKO","RTD","DQ","TD","NC"].map((opt) => (
                                <label
                                    key={opt}
                                    className={`radio-option ${outcome === opt ? "selected" : ""}`}
                                >
                                    <input
                                        type="radio"
                                        name="outcome"
                                        value={opt}
                                        checked={outcome === opt}
                                        onChange={() => {
                                            if (opt === "NC") {
                                                setWinner(null);
                                            }
                                            setOutcome(opt);
                                        }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        <button className="winner-confirm-btn" onClick={handleWinnerSubmit}>
                            Confirm
                        </button>
                    </div>
                </>
            )}

        </div>
    )
}