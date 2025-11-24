'use client';

import { useState } from 'react';
import Link from 'next/link';
import ResultDisplay from './ResultDisplay';
import DeleteButton from './DeleteButton';

export default function ScorecardsListClient ({ fights }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);

    const filtered = fights.filter(fight =>
        fight.fighterA.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fight.fighterB.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="search-container">
                <button className="search-btn" onClick={() => setShowSearchBar(!showSearchBar)}>
                    <img src="/icons/search-icon.svg" alt="Search" />
                </button>
            </div>

            {showSearchBar && (
                <input
                    type="text"
                    placeholder="Search fighters..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            )}

            <div className="scorecards-list">
                {filtered.length === 0 && <p style={{ textAlign: "center"}}>No matches found.</p>}

                {filtered.map(fight=> (
                    <div key={fight.id} className="scorecard-item">
                        <Link href={`/scorecard/${fight.id}`}>
                            <div className="card-names-container">
                                <h2>{fight.fighterA} vs {fight.fighterB}</h2>
                                {fight.isChampionship && (
                                    <div>
                                        <img src="/icons/championship-icon.png" alt="championship-icon" className="championship-icon" />
                                    </div>
                                )}
                            </div>
                            <div className="card-rds-container">
                                <p>{fight.numRounds} Rounds</p>
                            </div>
                        
                            <div className="card-date-container">
                                <p>{new Intl.DateTimeFormat("en-US", { timeZone: "UTC"}).format(fight.fightDate)}</p>
                            </div>
                        
                            <div className="card-result-container">
                                <ResultDisplay  fight={fight} />
                            </div>
                        
                            <div className="delete-btn-container">
                                <DeleteButton fight={fight} />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}