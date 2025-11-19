// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getServerSession(auth);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Profile fetch failed:', error);
    return NextResponse.json(
      { error: 'Profile fetch failed' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(auth);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, company, jobTitle, phone, bio } = body;

    // Update user and profile
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        name,
        profile: {
          upsert: {
            create: {
              company,
              jobTitle,
              phone,
              bio
            },
            update: {
              company,
              jobTitle,
              phone,
              bio
            }
          }
        }
      },
      include: {
        profile: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Profile update failed:', error);
    return NextResponse.json(
      { error: 'Profile update failed' },
      { status: 400 }
    );
  }
}