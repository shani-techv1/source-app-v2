import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/hooks/lib/prisma'; // Adjust if your path is different

export async function GET(req: NextRequest) {
  try {
    const roles = await prisma.role.findMany();

    return NextResponse.json({
      isSuccess: true,
      message: 'success',
      data: roles,
      error: null,
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      {
        isSuccess: false,
        message: 'Failed to fetch roles',
        data: null,
        error: 'Server error',
      },
      { status: 500 }
    );
  }
}
