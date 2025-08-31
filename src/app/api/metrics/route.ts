import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserId } from '@/app/actions/authActions';

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const userId = await getAuthUserId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Gather system metrics
    const [
      totalUsers,
      totalMembers,
      totalMessages,
      activeUsers,
      totalPhotos,
      recentSignups
    ] = await Promise.all([
      prisma.user.count(),
      prisma.member.count(),
      prisma.message.count(),
      prisma.member.count({
        where: {
          updated: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        }
      }),
      prisma.photo.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ]);

    const metrics = {
      timestamp: new Date().toISOString(),
      users: {
        total: totalUsers,
        active24h: activeUsers,
        recentSignups7d: recentSignups
      },
      members: {
        total: totalMembers,
        withPhotos: totalPhotos
      },
      messages: {
        total: totalMessages
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV
      }
    };

    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error('Metrics endpoint error:', error);
    
    return NextResponse.json({
      error: 'Failed to gather metrics',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}