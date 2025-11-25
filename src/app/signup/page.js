'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './page.css';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailAvailable, setEmailAvailable] = useState(true);
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const validatePassword = (password) => {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);
        const strengthCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

        return password.length >= 8 && strengthCount >= 3;
    }

    const getPasswordStrength = (password) => {
        let score = 0;

        if (password.length >= 8)
            score++;

        if (/[A-Z]/.test(password))
            score++;

        if (/[a-z]/.test(password))
            score++;

        if (/[a-z]/.test(password))
            score++;

        if (score <= 1)
            return { label: "Weak", color: "red" };
        if (score === 2 || score === 3)
            return { label: "Medium", color: "orange" };
        if (score >= 4)
            return { label: "Strong", color: "green" };
    }

    const strength = getPasswordStrength(password);

    const checkEmailAvailability = async (email) => {
        const res = await fetch(`/api/auth/check-email?email=${email}`);
        const data = await res.json();
        setEmailAvailable(data.available);

        if (!data.available) {
            setError("Email already registered.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Invalid email format.");
            return;
        }

        if (!emailAvailable) {
            setError("Email already registered");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long and contain an uppercase, lowercase, number and special character.");
            return;
        }

        setError("");

        const res = await fetch ("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            // redirect user to login page
            router.push("/signin");
        } else {
            const data = await res.json();
            setError(data.error || "Signup failed.");
        }
    }

    return (
        <div className="sign-up-page" style={{ padding: "2rem", maxWidth: "320px"}}>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                <h1>Create Account</h1>
                <input
                    type="text"
                    inputMode="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(""); // Clears error as user types
                    }}
                    onBlur={() => {
                        if (email && !isValidEmail(email)) {
                            setError("Invalid email format.");
                        } else if (email) {
                            checkEmailAvailability(email);  // Check duplicates
                        }
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {password && (
                    <p style={{ color: strength.color }}>
                        Strength: {strength.label}
                    </p>
                )}

                {error && <p style={{ color: "red",}}>{error}</p>}

                <button type="submit">Sign Up</button>
                <p style={{ marginTop: "1rem"}}>
                    Have an account? <Link href="/signin">Sign in</Link>
                </p>
            </form>
        </div>
    )
}