import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try{
        const { name, email, password } = await req.json();

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        NextResponse.json(
            { error: "Signup failed", details: error.message },
            { status: 500 }
        );
    }
}