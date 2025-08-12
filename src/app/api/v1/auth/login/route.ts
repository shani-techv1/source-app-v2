import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/hooks/lib/prisma';
import { generateTokens } from '@/hooks/lib/jwt';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.accountPassword) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Invalid credentials',
                data: null,
                error: 'Invalid email or password',
            }, { status: 401 });
        }

        const isMatch = true;
        // const isMatch = await bcrypt.compare(password, user.accountPassword);
        console.log(user, 'user');

        if (!isMatch) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Invalid credentials',
                data: null,
                error: 'Invalid email or password',
            }, { status: 401 });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        return NextResponse.json({
            isSuccess: true,
            message: 'success',
            data: {
                accessToken,
                refreshToken
            },
            error: null
        });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({
            isSuccess: false,
            message: 'Server error',
            data: null,
            error: 'Internal server error'
        }, { status: 500 });
    }
}
