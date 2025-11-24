'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './page.css';

export default function NewFightPage() {
    const router = useRouter();

    const [fighterA, setFighterA] = useState('');
    const [fighterB, setFighterB] = useState('');
    const [numRounds, setNumRounds] = useState('');
    const [fightDate, setFightDate] = useState(new Date().toISOString().split('T')[0]);
    const [isChampionship, setIsChampionship] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        await fetch('/api/fights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fighterA,
                fighterB,
                numRounds: Number(numRounds),
                fightDate,
                isChampionship,
            }),
        });

        router.push('/scorecards');
    }

    return (
        <div className="add-new-fight-page">
            <div className="form-wrapper">
                <h1>Add New Fight</h1>

                <div>
                    <Link 
                        href="/scorecards"
                        className="back-btn">
                        &lt; Back
                    </Link>
                </div>

            <form className="add-fight-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={fighterA}
                    onChange={(e) => setFighterA(e.target.value)}
                    placeholder="Fighter A"
                    required
                />

                <input
                    type="text"
                    value={fighterB}
                    onChange={(e) => setFighterB(e.target.value)}
                    placeholder="Fighter B"
                    required
                />

                <select
                    value={numRounds}
                    onChange={(e) => setNumRounds(e.target.value)}
                >
                    <option value="">Number of Rounds</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>

                <input
                    type="date"
                    value={fightDate}
                    onChange={(e) => setFightDate(e.target.value)}
                />

                <label className="champ-check">
                    <input
                        type="checkbox"
                        checked={isChampionship}
                        onChange={(e) => setIsChampionship(e.target.checked)}
                    />
                    Championship Fight
                </label>

                <button disabled={loading}>
                    {loading ? '...Saving' : 'Save Fight'}
                </button>
            </form>
            </div>
        </div>
    )
}