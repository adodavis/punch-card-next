'use client';

export default function DeleteButton({ fight }) {

    const handleDelete = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const confirmed = confirm("Delete this scorecard?");

        if (!confirmed) return;

        const res = await fetch(`/api/fights/${fight.id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete fight.");
            return;
        }

        window.location.reload();       // After deletion, refresh the scorecards
    }

    return (
        <div>
            <button onClick={handleDelete}>
                🗑️
            </button>
        </div>
    )
}