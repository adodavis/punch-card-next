import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email)
        return NextResponse.json({ available: false });

    const existing = await prisma.user.findUnique({
        where: { email },
    });

    return NextResponse.json({ available: !existing });
}