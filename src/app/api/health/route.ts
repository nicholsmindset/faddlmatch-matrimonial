import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const start = Date.now();
    
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - start;

    // Basic system health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: {
        status: 'connected',
        latency: `${dbLatency}ms`
      },
      services: {
        auth: 'operational',
        pusher: 'operational', // TODO: Add actual Pusher health check
        cloudinary: 'operational' // TODO: Add actual Cloudinary health check
      }
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' 
        ? (error as Error).message 
        : 'Internal server error'
    }, { status: 503 });
  }
}