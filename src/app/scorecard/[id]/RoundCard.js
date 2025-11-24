'use client';

import { useState } from 'react';
import './RoundCard.css';

export default function RoundCard({ round, onUpdate }) {
    const [aScore, setAScore] = useState(round.fighterA);
    const [bScore, setBScore] = useState(round.fighterB);
    const [isClose, setIsClose] = useState(round.isClose);
    const [showNotePopup, setShowNotePopup] = useState(false);
    const [noteInput, setNoteInput] = useState(round.notes || "");

    const isUnSet = (value) => !value || value <= 0;        // 0 or undefined = unset
    function applyBaseline(winner) {
        let a = aScore;
        let b = bScore;

        if (winner === "A") {
            a = 10;
            b = 9;
        } else {
            a = 9;
            b = 10;
        }

        setAScore(a);
        setBScore(b);

        onUpdate({ fighterA: a, fighterB: b });
    }

    const incrementScore = (fighter) => {
        if (fighter === "A") {
            let next = aScore + 1;
            if (next > 10)
                next = 10;

            setAScore(next);
            onUpdate( {fighterA: next });
        } else {
            let next = bScore + 1;
            if (next > 10)
                next = 10;

            setBScore(next);
            onUpdate({ fighterB: next });
        }
    }

    const decrementScore = (fighter) => {
        if (fighter === "A") {
            let next = aScore - 1;
            if (next < 6)
                next = 6;

            setAScore(next);
            onUpdate( {fighterA: next });
        } else {
            let next = bScore - 1;
            if (next < 6)
                next = 6;

            setBScore(next);
            onUpdate({ fighterB: next });
        }
    }

    const handlePlus = (fighter) => {
        const aUnset = isUnSet(aScore);
        const bUnset = isUnSet(bScore);
        
        if (aUnset && bUnset) {
            // First interaction sets baseline
            if (fighter === "A")
                applyBaseline("A");
             else
                applyBaseline("B");
             return;
        }

        // Baseline already set, just increment that fighter's score
        incrementScore(fighter);
    }

    const handleMinus = (fighter) => {
        const aUnset = isUnSet(aScore);
        const bUnset = isUnSet(bScore);
        
        if (aUnset && bUnset) {
            // First interaction sets baseline
            if (fighter === "A")
                applyBaseline("A");
             else
                applyBaseline("B");
             return;
        }

        // Baseline already set, just increment that fighter's score
        decrementScore(fighter);
    }

    const handleOpenNoteForm = () => {
        setShowNotePopup(true);
    }

    const handleNoteChange = (e) => {
        setNoteInput(e.target.value);
    }

    const handleSaveNote = () => {
        onUpdate({ notes: noteInput })
        setShowNotePopup(false);
    }

    const toggleCloseRound = () => {
        const next = !isClose;
        setIsClose(next);
        onUpdate({ isClose: next })
    }

    return (
        <div>
            <div className="roundcard-container">
                <div className="fighter-column">
                    <button onClick={() => handlePlus("A")} className="arrow-btn">▲</button>
                    <div className="score-display">{aScore <= 0 ? "-" : aScore}</div>
                    <button onClick={() => handleMinus("A")} className="arrow-btn">▼</button>
                </div>

                 <div className="round-label">
                   <label> Round {round.index + 1}</label>
                </div>

                <div className="fighter-column">
                    <button onClick={() => handlePlus("B")} className="arrow-btn">▲</button>
                    <div className="score-display">{bScore <= 0 ? "-" : bScore}</div>
                    <button onClick={() => handleMinus("B")} className="arrow-btn">▼</button>
                </div>
            </div>

            <div className="score-button-container">
                <button 
                    className="note-btn"
                    onClick={handleOpenNoteForm}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
                >
                    <img src="/icons/note-icon.svg" alt="Notes" />
                </button>

                <button className="close-rd-btn" onClick={toggleCloseRound} style={{ backgroundColor: isClose ? 'red' : 'grey',  color: 'white', opacity: isClose ? 0.8 : 0.1 }}>
                    {isClose ? "Close" : "-"}
                </button>
            </div>

            {showNotePopup && (
                <div className="notes-popup">
                    <button className="notes-popup-cls-btn" onClick={() => setShowNotePopup(false)}>X</button>

                    <h2>Round {round.index + 1} Notes</h2>

                    <textarea
                        value={noteInput}
                        onChange={handleNoteChange}
                        placeholder="Enter your notes here." 
                    />
                    <br />
                    <button className="save-btn" onClick={handleSaveNote}>Save</button>
                </div>
            )}
        </div>
    );
}