// app/api/v1/role-fields/role/[roleId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/hooks/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: { roleId: string } }
) {
    const roleId = parseInt(params.roleId, 10);

    if (isNaN(roleId)) {
        return NextResponse.json(
            {
                isSuccess: false,
                message: 'Invalid role ID',
                data: null,
                error: 'Invalid role ID',
            },
            { status: 400 }
        );
    }

    try {
        const roleFields = await prisma.roleField.findMany({
            where: {
                role_id: roleId,
                deletedAt: null,
            },
            orderBy: {
                order: 'asc',
            },
        });

        return NextResponse.json({
            isSuccess: true,
            message: 'success',
            data: roleFields,
            error: null,
        });
    } catch (error) {
        console.error('Error fetching role fields:', error);
        return NextResponse.json(
            {
                isSuccess: false,
                message: 'Server error',
                data: null,
                error: 'Server error',
            },
            { status: 500 }
        );
    }
}
