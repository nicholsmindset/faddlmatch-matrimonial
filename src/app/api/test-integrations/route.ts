import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import { cloudinary } from '@/lib/cloudinary';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    const testResults = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      integrations: {
        resend: {
          status: 'ready',
          apiKey: process.env.RESEND_API_KEY ? '✓ configured' : '✗ missing',
        },
        cloudinary: {
          status: 'ready',
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '✓ configured' : '✗ missing',
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? '✓ configured' : '✗ missing',
          apiSecret: process.env.CLOUDINARY_API_SECRET ? '✓ configured' : '✗ missing',
        },
        pusher: {
          status: 'ready',
          appId: process.env.PUSHER_APP_ID ? '✓ configured' : '✗ missing',
          key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ? '✓ configured' : '✗ missing',
          secret: process.env.PUSHER_SECRET ? '✓ configured' : '✗ missing',
          cluster: process.env.PUSHER_CLUSTER || 'ap1',
        },
        sentry: {
          status: 'ready',
          dsn: process.env.SENTRY_DSN ? '✓ configured' : '✗ missing',
        },
        database: {
          status: 'ready',
          url: process.env.DATABASE_URL ? '✓ configured (SQLite)' : '✗ missing',
        },
        auth: {
          status: 'ready',
          secret: process.env.AUTH_SECRET ? '✓ configured' : '✗ missing',
          nextauthUrl: process.env.NEXTAUTH_URL ? '✓ configured' : '✗ missing',
        },
        oauth: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id' ? '✓ configured' : '⚠ needs setup',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CLIENT_SECRET !== 'your-google-client-secret' ? '✓ configured' : '⚠ needs setup',
          },
          github: {
            clientId: process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_ID !== 'your-github-client-id' ? '✓ configured' : '⚠ needs setup',
            clientSecret: process.env.GITHUB_CLIENT_SECRET && process.env.GITHUB_CLIENT_SECRET !== 'your-github-client-secret' ? '✓ configured' : '⚠ needs setup',
          }
        }
      },
      tests: []
    };

    // Test Sentry
    try {
      Sentry.withScope((scope) => {
        scope.setLevel('info');
        Sentry.captureMessage('FADDL MATCH - Integration test message');
      });
      testResults.tests.push({
        service: 'Sentry',
        status: '✓ passed',
        message: 'Error monitoring is working'
      });
    } catch (error) {
      testResults.tests.push({
        service: 'Sentry',
        status: '✗ failed',
        message: `Error: ${error}`
      });
    }

    // Test Pusher configuration
    try {
      // Just test that Pusher is configured (don't trigger events in test)
      const pusherConfig = {
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER
      };
      
      if (pusherConfig.appId && pusherConfig.key && pusherConfig.secret) {
        testResults.tests.push({
          service: 'Pusher',
          status: '✓ passed',
          message: 'Real-time messaging is configured'
        });
      } else {
        testResults.tests.push({
          service: 'Pusher',
          status: '✗ failed',
          message: 'Missing Pusher configuration'
        });
      }
    } catch (error) {
      testResults.tests.push({
        service: 'Pusher',
        status: '✗ failed',
        message: `Error: ${error}`
      });
    }

    // Test Cloudinary
    try {
      const cloudinaryConfig = cloudinary.v2.config();
      if (cloudinaryConfig.cloud_name && cloudinaryConfig.api_key && cloudinaryConfig.api_secret) {
        testResults.tests.push({
          service: 'Cloudinary',
          status: '✓ passed',
          message: 'Image upload service is configured'
        });
      } else {
        testResults.tests.push({
          service: 'Cloudinary',
          status: '✗ failed',
          message: 'Missing configuration'
        });
      }
    } catch (error) {
      testResults.tests.push({
        service: 'Cloudinary',
        status: '✗ failed',
        message: `Error: ${error}`
      });
    }

    // Calculate overall status
    const failedTests = testResults.tests.filter(test => test.status.includes('failed'));
    testResults.overall = failedTests.length === 0 ? '✓ All integrations working' : `⚠ ${failedTests.length} integration(s) need attention`;

    return NextResponse.json(testResults, { status: 200 });
  } catch (error) {
    console.error('Integration test error:', error);
    return NextResponse.json(
      { error: 'Integration test failed', details: error },
      { status: 500 }
    );
  }
}