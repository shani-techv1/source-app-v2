import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/hooks/lib/prisma';
import { verifyToken } from '@/hooks/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        isSuccess: false,
        message: 'Unauthorized',
        data: null,
        error: 'Missing or invalid token',
      }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    const decodedUser = verifyToken(token);
    if (!decodedUser) {
      return NextResponse.json({
        isSuccess: false,
        message: 'Unauthorized',
        data: null,
        error: 'Invalid or expired token',
      }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' },
    });

    return NextResponse.json({
      isSuccess: true,
      message: 'success',
      data: users,
      error: null,
    });

  } catch (error) {
    console.error('Get Users Error:', error);
    return NextResponse.json({
      isSuccess: false,
      message: 'Server error',
      data: null,
      error: 'Something went wrong',
    }, { status: 500 });
  }
}
