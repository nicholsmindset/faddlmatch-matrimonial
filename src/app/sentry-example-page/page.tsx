'use client';

export default function SentryExamplePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          🕌 Sentry Test - FADDL MATCH
        </h1>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            Test error monitoring for our Islamic matrimonial platform
          </p>
          
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            onClick={() => {
              // This will trigger a Sentry error
              (window as any).myUndefinedFunction();
            }}
          >
            🚨 Trigger Test Error
          </button>
          
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            onClick={() => {
              // This will send a test message to Sentry
              if (typeof window !== 'undefined') {
                import('@/lib/error-monitoring').then(({ captureMessage }) => {
                  captureMessage('FADDL MATCH: Test message from Islamic matrimonial platform', 'info', {
                    feature: 'sentry-test',
                    user_type: 'muslim-matrimonial',
                    platform: 'faddl-match'
                  });
                });
              }
              alert('✅ Test message sent to Sentry!');
            }}
          >
            ✅ Send Test Message
          </button>
          
          <a
            href="/"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            🏠 Back to FADDL MATCH Home
          </a>
        </div>
        
        <p className="mt-6 text-xs text-gray-500 text-center">
          Check your Sentry dashboard to see if errors are being captured
        </p>
      </div>
    </div>
  );
}