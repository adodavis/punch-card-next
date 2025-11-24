'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInClient() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            setError("Invalid email or password");
        } else {
            router.push("/scorecards");
        }
    }

    return (
        <div style={{ padding: "2rem", maxWidth: 320 }}>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Sign In</button>
            </form>

            <p style={{ marginTop: "1rem" }}>
                No account? <Link href="/signup">Create one</Link>
            </p>
        </div>
    );
}
