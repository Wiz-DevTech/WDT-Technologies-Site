// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getServerSession(auth);
  
  // Check if session exists and user has ADMIN role
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';

  const skip = (page - 1) * limit;

  const where = search ? {
    OR: [
      { email: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } },
    ]
  } : {};

  try {
    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        include: {
          profile: true,
          _count: {
            select: { sessions: true }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.user.count({ where })
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(auth);
  
  // Check if session exists and user has ADMIN role
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { email, name, role, company, jobTitle } = body;

  // Validate required fields
  if (!email || !name) {
    return NextResponse.json(
      { error: 'Email and name are required' },
      { status: 400 }
    );
  }

  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        role: role || 'USER',
        profile: {
          create: {
            company: company || '',
            jobTitle: jobTitle || ''
          }
        }
      },
      include: {
        profile: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('User creation failed:', error);
    return NextResponse.json(
      { error: 'User creation failed' },
      { status: 400 }
    );
  }
}