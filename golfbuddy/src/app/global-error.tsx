"use client";

/**
 * Global error boundary
 * This file must be a client component to avoid static generation issues
 * in Next.js 16 with Turbopack
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error for debugging (production error tracking would go here)
  console.error("Global error:", error);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Something went wrong
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              We apologize for the inconvenience. Please try again.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
